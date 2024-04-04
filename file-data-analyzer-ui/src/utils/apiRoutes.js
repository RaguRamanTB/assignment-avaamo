export const host = "http://localhost:5000";
export const apiRoutes = {
  upload: `${host}/api/files/upload`,
  getAnalysis: `${host}/api/data/getAnalysis`,
};
const APIkey =
  "dict.1.1.20170610T055246Z.0f11bdc42e7b693a.eefbde961e10106a4efa7d852287caa49ecc68cf";
export const dictionaryApi = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${APIkey}&lang=en-en&text=`;
