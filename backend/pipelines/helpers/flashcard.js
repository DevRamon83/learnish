import pollinationsFetch from "../../ai/fetch/pollinationsFetch.js";
import { pollinationsImgPrompt } from "../../ai/prompt/prompt.js";
import { defineCaller } from "./commons.js";
import uploadFile from "./uploadFile.js";

const updateSchema = async (newWord, fileName) => {
  newWord.flashcard = true;
  newWord.metadata.storage = "supabase";
  newWord.metadata.bucketImg = "flashcard";
  newWord.metadata.flashcardFile = fileName;
  try {
    newWord.save();
    return { error: false };
  } catch (err) {
    console.error("flashcard update schema failed");
    return { error: true };
  }
};

const getFlashcard = async (newWord, wordObj) => {
  const word = newWord.word;
  const index = wordObj.id;
  const dataCaller = defineCaller("flashcards");
  const prompt = pollinationsImgPrompt(word);
  const creation = await pollinationsFetch(prompt, word, index, dataCaller);

  if (creation.error) {
    return {
      error: true,
      service: "pollinations",
      type: "failed",
      errorMsg: "flashcard generation",
    };
  }

  const { buffer, fileName } = creation;
  const folder = "";
  const metaData = { bucket: "flashcards", type: "image/jpeg" };
  const uploadData = { buffer, fileName, metaData, folder };
  const upload = await uploadFile(uploadData);

  if (upload.error) {
    return {
      error: true,
      service: "supabase",
      type: "upload",
      errorMsg: upload.errorMsg,
    };
  }

  const update = await updateSchema(newWord, fileName);
  if (update.error) {
    return {
      error: true,
      service: "internal",
      type: "failed",
      errorMsg: "Schema update for flashcard failed",
    };
  }

  return { error: false };
};

export default getFlashcard;
