import mistralFetch from "../../ai/fetch/mistralFetch.js";
import pollinationsFetch from "../../ai/fetch/pollinationsFetch.js";
import {
  mistralWordAnalysis,
  pollinationsImgPrompt,
} from "../../ai/prompt/prompt.js";
import { defineCaller } from "./commons.js";
import uploadFile from "../../helpers/uploadFile.js";

const flashcardContent = `Context: Act as a gatekeeper agent for a secondary text-to-image AI that struggles to convert words into guessable images. Select only words that are easy, concrete, and immediate to convert.`;

const updateSchema = async (newWord, fileName) => {
  if (!fileName) {
    newWord.discard = true;
  } else {
    newWord.discard = false;
    newWord.flashcard = true;
    newWord.metadata.storage = "supabase";
    newWord.metadata.bucketImg = "flashcard";
    newWord.metadata.flashcardFile = fileName;
  }

  try {
    newWord.save();
    return { error: false };
  } catch (err) {
    console.error("flashcard update schema failed");
    return { error: true };
  }
};

const getFlashcard = async (data) => {
  if (data.finish) return;
  const wordObj = data.wordObj;
  const word = wordObj.word;
  const phrase = wordObj.phrase;
  const definition = wordObj.definition;

  const index = wordObj.id;

  const promptAnalysis = mistralWordAnalysis(word, definition);

  const analysis = await mistralFetch(promptAnalysis, flashcardContent);

  if (analysis.error) {
    return { discard: "error" };
  }

  const content = analysis.response.content;
  const parse = JSON.parse(content);

  if (!parse.flashcard) {
    await updateSchema(wordObj, null);
    return { discard: "true" };
  }

  const dataCaller = defineCaller("flashcards");
  const prompt = pollinationsImgPrompt(parse.phrase);
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

  const update = await updateSchema(wordObj, fileName);
  if (update.error) {
    return {
      error: true,
      service: "internal",
      type: "failed",
      errorMsg: "Schema update for flashcard failed",
    };
  }

  return { discard: "false" };
};

export default getFlashcard;
