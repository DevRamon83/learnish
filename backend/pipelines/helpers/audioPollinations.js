import pollinationsFetch from "../../ai/fetch/pollinationsFetch.js";
import {
  pollinationsImgPrompt,
  pollinationsReadPrompt,
} from "../../ai/prompt/prompt.js";
import { audioDefiner, defineCaller, getFolder } from "./commons.js";
import uploadFile from "./uploadFile.js";

const apiCaller = async (wordObj, lang, dataCaller, process) => {
  const voice = lang === "Us" ? "brian" : "nova";
  const audioText = audioDefiner(process, wordObj);

  const { index, word } = wordObj;
  // const prompt = pollinationsReadPrompt(audioText, lang);

  return await pollinationsFetch(word, audioText, index, dataCaller, voice);
};

const generateAudio = async (wordObj, lang, process) => {
  const callerName = "audio" + lang;
  const dataCaller = defineCaller(callerName);
  const audio = await apiCaller(wordObj, lang, dataCaller, process);

  if (audio.error) return { error: true };

  return { error: false, res: audio };
};

const getAudio = async (data, process) => {
  const wordObj = data.wordObj;
  const myWord = wordObj.word;
  const audioArray = ["Us", "Uk"];

  for (let i = 0; i < audioArray.length; i++) {
    const lang = audioArray[i];

    const audio = await generateAudio(wordObj, lang, process);
    const audioFailed = "audio generation failed";
    if (audio.error) {
      return {
        error: true,
        type: "failed",
        service: "pollinations",
        errorMsg: audioFailed,
      };
    }

    const { buffer, fileName } = audio.res;
    const metaData = { bucket: "audio", type: "audio/opus" };
    const folder = getFolder(process, lang);
    const uploadData = { buffer, fileName, metaData, folder };

    const upload = await uploadFile(uploadData);

    if (upload.error) {
      return {
        error: true,
        type: "upload",
        service: "supabase",
        errorMsg: upload.errorMsg,
      };
    }

    return { error: false };
  }
};

export default getAudio;
