export const onChangeHandler = (e, setInput, solution) => {
  if (solution) {
    return;
  }
  setInput((prev) => e.target.value);
};

// We have thousands of cards, so we limited a single game session
// to around a hundred cards in order to prevent any risk of an infinite loop

const newCard = (currentCard) => {
  if (currentCard === 100) {
    return { finish: true };
  }

  return { finish: false, currentCard };
};

const defineScore = (guess, setScore, points) => {
  if (guess) {
    setScore((prev) => prev + points);
  } else {
    setScore((prev) => prev - 1);
  }
};

const updateAndReset = (setters, states) => {
  const {
    setCurrentCard,
    setInputClass,
    setInput,
    setScore,
    setMatchStatus,
    setHelp,
    setPoints,
    setStart,
  } = setters;
  const { currentCard, matchStatus, points } = states;
  const newIndexCard = newCard(currentCard);

  if (newIndexCard.finish) {
    setStart(false);
    return;
  }

  setInputClass("flashcard__input");
  setInput("");
  defineScore(matchStatus.guessed, setScore, points);
  setMatchStatus({ guessed: false, solution: false });
  setHelp({ type: "definition", text: null });
};

export const nextHandler = (setters, states) => {
  const { setPoints, setCurrentCard } = setters;
  const { currentCard } = states;
  setPoints(1);

  setCurrentCard((prev) => prev + 1);
  updateAndReset(setters, states);
};

export const helpHandler = (setters, cards, states) => {
  const { setHelp, setMatchStatus, setPoints } = setters;
  const { cardsKeys, currentCard, help, lang } = states;
  const currentWord = cards[cardsKeys[currentCard]];
  const definition = currentWord.definition;
  const clearDefinition = definition
    .toLowerCase()
    .replace(currentWord.word, "...");
  const helpText = currentWord.translations[lang].word;

  if (help.type === "definition") {
    setHelp({ type: "translate", text: clearDefinition });
    setPoints((prev) => prev / 2);
  } else if (help.type === "translate") {
    setHelp({ type: "solution", text: helpText });
    setPoints((prev) => prev / 2);
  } else {
    setMatchStatus({ guessed: false, solution: true });
    setPoints(-1);
    setHelp({ type: "stop", text: helpText });
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

export const wordHandler = (cards, states, currentCard) => {
  const keys = states.cardsKeys;
  return cards[keys[currentCard]].word;
};
