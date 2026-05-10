import Groq from "groq-sdk";
import { audioDefiner, getFolder } from "./commons.js";
import uploadFile from "./uploadFile.js";

const updateSchema = async (dataUpdate) => {
  const { newWord, fileName, bucket, folder, naming, lang } = dataUpdate;

  newWord.metadata[naming].bucket = bucket;
  newWord.metadata[naming].path = folder;
  newWord.metadata[naming].fileName = fileName;
  newWord.metadata[naming][lang] = true;
  try {
    await newWord.save();
    return { error: false };
  } catch (err) {
    console.error("audio update schema failed");
    return { error: true };
  }
};

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const model = "canopylabs/orpheus-v1-english";
const voice = "daniel";
const responseFormat = "wav";
const audioFailed = "audio generation failed";

const audioGroq = async (newWord, process) => {
  const naming = process === "vocabulary" ? "word" : "phrase";

  const text = audioDefiner(process, newWord);
  let response = null;

  // groq sdk throws an error if api call fails,
  // so we cannot analyze the response manually as we do usually
  try {
    response = await groq.audio.speech.create({
      model: model,
      voice: voice,
      input: text,
      response_format: responseFormat,
    });
  } catch (err) {
    return {
      error: true,
      type: "failed",
      service: "groq",
      errorMsg: audioFailed,
    };
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  const fileName = `${naming}${newWord.index}.wav`;
  const bucket = "audio";
  const metaData = { bucket, type: "audio/wav" };
  // groq missing a voice for uk accent
  const folder = getFolder(process, "Us");
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

  const dataUpdate = { newWord, fileName, bucket, folder, naming, lang: "us" };
  const update = await updateSchema(dataUpdate);
  return { error: false };
};

export default audioGroq;
