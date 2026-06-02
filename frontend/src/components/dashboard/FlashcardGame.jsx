import { useRef, useState } from "react";
import { cardBaseURL, classes } from "../../constants/components/dashboard";
import { useEffect } from "react";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import { fetchData } from "../../api/fetchData";
import FlashcardFieldGame from "../../ui/FlashcardFieldGame";
import FlashcardMenu from "../../ui/FlashcardMenu";
import { wordHandler } from "../../helpers/flashcards/handlers";

export default function FlashcardGame({ cards, setStart }) {
  const { flashcards } = classes;
  // Tracks the index value of cardsKeys (min: 0, max: 99)
  const [currentCard, setCurrentCard] = useState(0);
  const [inputClass, setInputClass] = useState(flashcards.input);
  const [score, setScore] = useState(0);
  const [points, setPoints] = useState(1);
  const [input, setInput] = useState("");
  // Solution tracks if the user has run out of helps and the system has shown the answer
  const [matchStatus, setMatchStatus] = useState({
    guessed: false,
    solution: false,
  });
  const [help, setHelp] = useState({
    type: "definition",
    text: null,
  });
  const { strings, lang } = useLang(i18nAddresses.flashcards);
  const inputRef = useRef(null);
  const setters = {
    setCurrentCard,
    setInputClass,
    setInput,
    setScore,
    setHelp,
    setPoints,
    setMatchStatus,
    setStart,
  };

  const states = {
    points,
    score,
    currentCard,
    cardsKeys: Object.keys(cards),
    matchStatus,
    help,
    lang,
    inputClass,
    input,
  };

  // The input gets unmounted and remounted with every new card.
  // Leaving 'inputRef' as a dependency catches the DOM mounting phase perfectly,
  // ensuring the element always regains focus without using any delay.
  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  useEffect(() => {
    if (input === "") return;

    if (input === wordHandler(cards, states, currentCard)) {
      setMatchStatus({ guessed: true, solution: false });
      setInputClass(flashcards.inputTrue);
    } else {
      setMatchStatus({ guessed: false, solution: false });
      setInputClass(flashcards.inputFalse);
    }
  }, [input]);

  useEffect(() => {
    if (matchStatus.solution) {
      setInput(wordHandler(cards, states, currentCard));
    }
  }, [matchStatus]);

  return (
    <div>
      <FlashcardFieldGame
        inputRef={inputRef}
        states={states}
        cards={cards}
        setters={setters}
        classes={flashcards}
        strings={strings}
      />
      <FlashcardMenu
        states={states}
        cards={cards}
        setters={setters}
        strings={strings}
        classes={flashcards}
      />
    </div>
  );
}
