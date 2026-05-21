export const mistralVocabularyPrompt = (myWord, type) => {
  return `Starting from the ${type} "${myWord}" provide: 
  1) flashcard as boolean: if the word is suitable for generate a flashcard (meaning it must be possible to guess the word from the image), 
  2) a string whit an example phrase (max 20 words)
  3) for each one of this languages (italian, french, spanish, portuguese) a translation for both, word and example phrase
  4) the definition of the initial word
  `;
};

export const pollinationsImgPrompt = (myWord) => {
  return encodeURIComponent(
    `A cinematic still from a Studio Ghibli animation. The scene features ${myWord} as the main visual element. Hand-painted background, lush details, bright natural lighting. The image is a pure illustration with no typography.`,
  );
};

export const pollinationsReadPrompt = (myWord, accent) => {
  return encodeURIComponent(`${myWord}"`);
};
