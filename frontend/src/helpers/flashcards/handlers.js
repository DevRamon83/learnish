export const onChangeHandler = (e, setInput, solution) => {
  if (solution) {
    return;
  }
  setInput((prev) => e.target.value);
};

// We have thousands of cards, so we limited a single game session
// to around a hundred cards in order to prevent any risk of an infinite loop

const newCard = (indexes) => {
  const nullCount = indexes.filter((val) => val === null).length;
  if ((nullCount / indexes.length) * 100 > 5) {
    return { finish: true };
  }

  let cardIndex = Math.floor(Math.random() * indexes.length);

  while (indexes[cardIndex] === null) {
    cardIndex = Math.floor(Math.random() * indexes.length);
  }

  return { finish: false, cardIndex };
};

const defineScore = (guess, setPoints, currentPoints) => {
  if (guess) {
    setPoints((prev) => prev + currentPoints);
  } else {
    setPoints((prev) => prev - 1);
  }
};

const updateAndReset = (setters, states) => {
  const {
    setCurrentCard,
    setInputClass,
    setInput,
    setResponse,
    setPoints,
    setGuess,
    setHelp,
    setHelpText,
    setSolution,
    setCurrentPoints,
    setIndexes,
    setStart,
  } = setters;
  const { indexes, guess, currentPoints } = states;
  const newIndexCard = newCard(indexes);

  if (newIndexCard.finish) {
    setStart(false);
    return;
  }

  setCurrentCard(newIndexCard.cardIndex);

  setInputClass("flashcard__input");
  setInput("");
  setResponse(null);
  defineScore(guess, setPoints, currentPoints);
  setGuess(false);
  setHelp("definition");
  setHelpText(null);
  setSolution(false);
};

export const nextHandler = (setters, states) => {
  const { setCurrentPoints, setIndexes } = setters;
  const { indexes, currentCard } = states;
  setCurrentPoints(1);
  const newIndexes = [...indexes];

  // Change index value to null to keep indexes' length aligned to cards' length
  newIndexes[currentCard] = null;
  setIndexes(newIndexes);
  updateAndReset(setters, states);
};

export const helpHandler = (setters, cards, states) => {
  const { setHelp, setHelpText, setSolution, setCurrentPoints } = setters;
  const { currentCard, help, lang } = states;
  const word = cards[currentCard].word;
  const definition = cards[currentCard].definition;
  const clearDefinition = definition.toLowerCase().replace(word, "...");

  if (help === "definition") {
    setHelp("translate");
    setHelpText(clearDefinition);
    setCurrentPoints((prev) => prev / 2);
  } else if (help === "translate") {
    setHelpText(cards[currentCard].translations[lang].word);
    setCurrentPoints((prev) => prev / 2);
    setHelp("solution");
  } else {
    setSolution(true);
    setCurrentPoints(-1);
    setHelp("stop");
  }
};

export const commandHandler = (e, states, setters, cards) => {
  const { setStart } = setters;

  switch (e.key) {
    case "ArrowRight":
      nextHandler(setters, states);
      return;
    case "Enter":
      helpHandler(setters, cards, states);
      return;
    case "Escape":
      setStart(false);
      return;
    default:
      return;
  }
};
