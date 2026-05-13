import pipelinesLogModel from "../../models/logs/pipelinesLog.js";

export const defineCaller = (caller) => {
  switch (caller) {
    case "flashcards":
      return { caller: "img", lang: null, extension: ".jpeg" };
    case "audioUs":
      return { caller: "audio", lang: "Us", extension: ".wav" };
    case "audioUk":
      return { caller: "audio", lang: "Uk", extension: ".wav" };
    default:
      break;
  }
};

export const getFolder = (process, lang) => {
  let path = null;
  switch (process) {
    case "vocabulary":
      path = `/${process}/${lang}`;
      break;
    case "examplePhrase":
      path = `/phrases/${lang}`;
      break;
    default:
      path = "invalid";
      break;
  }

  return path;
};

export const vocabularySchema = (wordObj) => {
  return {
    word: wordObj.word,
    index: wordObj.id,
    type: wordObj.type,
    level: wordObj.level,
    phonetics: { us: wordObj.phonetics.us, uk: wordObj.phonetics.uk },
  };
};

export const audioDefiner = (process, newWord) => {
  if (process === "vocabulary") return newWord.word;
  if (process === "examplePhrase") return newWord.phrase;
};

const writeLog = async (data) => {
  try {
    await pipelinesLogModel.create(data);
  } catch (err) {
    console.error("Vocabulary pipeline log failed: ", err);
  }
};

export const attempt = async (func, data, dataError) => {
  if (dataError?.skip) return { error: true };
  const res = await func(...data);
  if (dataError && res.error) {
    dataError.errorMsg = res.errorMsg;
    dataError.type = res.type;
    dataError.service = res.service;
    dataError.skip = true;
    await writeLog(dataError);
    return { error: true };
  }

  return { error: false, res };
};
