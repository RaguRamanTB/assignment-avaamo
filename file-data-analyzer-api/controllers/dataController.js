const textract = require("textract");
const mammoth = require("mammoth");
const path = require("path");
const fs = require("fs");

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
      const wordCounts = await anaylyseFile(filename);
      response[filename] = wordCounts;
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
