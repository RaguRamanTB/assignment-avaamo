const mammoth = require("mammoth");
const path = require("path");
const fs = require("fs");
const stream = require("stream");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const Analysis = require("../models/analysisModel");
const File = require("../models/fileModel");

const anaylyseFile = async (filename) => {
  const ext = path.extname(filename);
  const filePath = path.join(__dirname, "..", "uploads", filename);
  let text;
  if (ext === ".txt") {
    text = await new Promise((resolve, reject) => {
      textract.fromFileWithPath(filePath, (error, text) => {
        if (error) reject(error);
        else resolve(text);
      });
    });
  } else if (ext === ".docx") {
    const response = await mammoth.extractRawText({ path: filePath });
    text = response.value;
  } else {
    throw new Error("One of the files has an unsupported file type");
  }
  const words = text.split(/[\s,]+/);
  const wordCounts = words.reduce((counts, word) => {
    const cleanedWord = word
      .replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, "")
      .toLowerCase();
    if (cleanedWord !== "" && cleanedWord.length > 1) {
      if (!counts[cleanedWord]) {
        counts[cleanedWord] = 1;
      } else {
        counts[cleanedWord]++;
      }
    }
    return counts;
  }, {});

  const sortedWordCounts = Object.entries(wordCounts)
    .sort((a, b) => b[0].length - a[0].length || b[1] - a[1])
    .reduce((obj, [word, count]) => {
      obj[word] = count;
      return obj;
    }, {});

  return sortedWordCounts;
};

module.exports.getAnalysis = async (req, res, next) => {
  try {
    const filenames = req.body.filenames;
    const response = {};
    for (const filename of filenames) {
      const currentFile = await File.findOne({ filename });
      const existingAnalysis = await Analysis.findOne({
        originalname: currentFile.originalname,
        lastModified: currentFile.lastModified,
      });
      if (existingAnalysis) {
        response[filename] = JSON.parse(existingAnalysis.analysisData);
        continue;
      }
      const wordCounts = await anaylyseFile(filename);
      response[filename] = wordCounts;
      await Analysis.create({
        originalname: currentFile.originalname,
        lastModified: currentFile.lastModified,
        analysisData: JSON.stringify(wordCounts),
      });
    }
    return res.status(200).json({
      message: "Analysis completed successfully",
      analysisData: response,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to analyze files",
      error: error.message,
      errorCode: error.code,
    });
    next(error);
  }
};

module.exports.maskData = async (req, res, next) => {
  try {
    const { filename, wordsToMask } = req.body;
    const filePath = path.join(__dirname, "..", "uploads", filename);
    const fileExtension = path.extname(filename);
    fs.mkdirSync(path.join(__dirname, "../downloads"), { recursive: true });
    const outFilePath = path.join(
      __dirname,
      "..",
      "downloads",
      `masked-${filename}`
    );

    if (fileExtension === ".txt") {
      const text = fs.readFileSync(filePath, "utf8");
      let maskedText = text;

      wordsToMask.forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        maskedText = maskedText.replace(regex, "****");
      });

      fs.writeFileSync(outFilePath, maskedText);
      res.download(outFilePath);
    } else if (fileExtension === ".docx") {
      const text = await mammoth.extractRawText({ path: filePath });
      let maskedText = text.value;

      wordsToMask.forEach((word) => {
        const regex = new RegExp(`\\b${word}\\b`, "gi");
        maskedText = maskedText.replace(regex, "****");
      });

      const templateFilePath = path.resolve(
        __dirname,
        "..",
        "templates",
        "mask.docx"
      );
      const content = fs.readFileSync(templateFilePath, "binary");
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip);
      doc.render({
        text: maskedText,
      });

      const buf = doc.getZip().generate({ type: "nodebuffer" });

      fs.writeFileSync(outFilePath, buf);
      res.download(outFilePath);
    } else {
      throw new Error("The selected file has an unsupported file type");
    }
  } catch (err) {
    next(err);
  }
};
