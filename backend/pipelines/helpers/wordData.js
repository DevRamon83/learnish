import mistralFetch from "../../ai/fetch/mistralFetch.js";
import { mistralVocabularyPrompt } from "../../ai/prompt/prompt.js";

const mistralUpdater = async (newWord, data) => {
  newWord.phrase = data.example_phrase;
  newWord.definition = data.definition;
  const { italian, french, spanish, portuguese } = data.translations;
  newWord.translations = {
    italian: { word: italian.word, phrase: italian.example_phrase },
    spanish: { word: spanish.word, phrase: spanish.example_phrase },
    french: { word: french.word, phrase: french.example_phrase },
    portuguese: { word: portuguese.word, phrase: portuguese.example_phrase },
  };

  try {
    await newWord.save();
    return { error: false };
  } catch (err) {
    console.error(err);
    return { error: true, errorMsg: err };
  }
};

const getWordData = async (newWord) => {
  const mistralPrompt = mistralVocabularyPrompt(newWord.word, newWord.type);
  const output = await mistralFetch(newWord.word, mistralPrompt);
  const errorMsg = "getWordData failed";

  if (output.error) {
    return { error: true, service: "mistral", type: "failed", errorMsg };
  }

  const content = output.response.content;
  const parse = JSON.parse(content);

  const updated = await mistralUpdater(newWord, parse);

  if (updated.error) {
    return { error: true, service: "internal", type: "missing", errorMsg };
  }

  return { error: false, parse };
};

export default getWordData;
