export const mistralVocabularyPrompt = (myWord, type) => {
  return `Starting from the ${type} "${myWord}" provide: 
  1) flashcard as boolean: if the word is suitable for generate a flashcard (meaning it must be possible to guess the word from the image), 
  2) a string whit an example phrase (max 20 words)
  3) for each one of this languages (italian, french, spanish, portuguese) a translation for both, word and example phrase
  4) the definition of the initial word
  `;
};

export const mistralWordAnalysis = (myWord, definition) => {
  return `Starting from the "${myWord}" (whose definition is ${definition}) provide a JSON object with the following numbered properties:
  1) flashcard: boolean (true/false). Imagine explaining to a completely illiterate person what to draw in a single picture to communicate this word. If you think illustrating the drawing to a completely illiterate person is too complicated, set it to false; otherwise, set it to true.
  2) phrase: Define the scene that needs to be drawn to be understood.
  `;
};

export const pollinationsImgPrompt = (scene) => {
  return encodeURIComponent(`${scene}`);
};

export const pollinationsReadPrompt = (myWord, accent) => {
  return encodeURIComponent(`${myWord}"`);
};
