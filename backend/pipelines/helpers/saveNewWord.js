import vocabularyModel from "../../models/vocabulary.js";
import { vocabularySchema } from "./commons.js";

const saveNewWord = async (wordObj) => {
  const schema = vocabularySchema(wordObj);

  try {
    const newWord = await vocabularyModel.create(schema);
    return { error: false, newWord };
  } catch (err) {
    console.error(err);
    return { error: true, errorMsg: err };
  }
};

export default saveNewWord;
