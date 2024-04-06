export const host = "http://139.59.8.244:5000";
export const apiRoutes = {
  upload: `${host}/api/files/upload`,
  getAnalysis: `${host}/api/data/getAnalysis`,
  mask: `${host}/api/data/mask`,
};
const APIkey =
  "dict.1.1.20240405T173622Z.56e88fde1c34475c.1f9cd19ec0c4611f5af227da1cff50d1b448438f";
export const dictionaryApi = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${APIkey}&lang=en-en&text=`;
