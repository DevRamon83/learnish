import { useRef, useState } from "react";
import { cardBaseURL, classes } from "../../constants/components/dashboard";
import { useEffect } from "react";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import { fetchData } from "../../api/fetchData";
import {
  helpHandler,
  nextHandler,
  onChangeHandler,
} from "../../helpers/flashcards/handlers";
import FlashcardFieldGame from "../../ui/FlashcardFieldGame";
import FlashcardMenu from "../../ui/FlashcardMenu";

export default function FlashcardGame({ cards, setStart }) {
  const { flashcards } = classes;
  const [indexes, setIndexes] = useState(Array.from(cards.keys()));
  const [currentCard, setCurrentCard] = useState(
    Math.floor(Math.random() * indexes.length),
  );
  const [inputClass, setInputClass] = useState(flashcards.input);
  const [points, setPoints] = useState(0);
  const [currentPoints, setCurrentPoints] = useState(1);
  const [input, setInput] = useState("");
  const [guess, setGuess] = useState(false);
  const [help, setHelp] = useState("definition");
  const [helpText, setHelpText] = useState(null);
  const [solution, setSolution] = useState(false);
  const [response, setResponse] = useState(null);
  const { strings, lang } = useLang(i18nAddresses.flashcards);
  const inputRef = useRef(null);
  const setters = {
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
  };

  const states = {
    indexes,
    guess,
    currentPoints,
    points,
    currentCard,
    solution,
    help,
    lang,
    inputClass,
    helpText,
    input,
  };

  // The input gets unmounted and remounted with every new card.
  // Leaving 'inputRef' as a dependency catches the DOM mounting phase perfectly,
  // ensuring the element always regains focus without using any delay.
  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  useEffect(() => {
    if (input === "") {
      return;
    } else if (input === cards[currentCard].word) {
      setGuess(true);
      setInputClass(flashcards.inputTrue);
    } else {
      setGuess(false);
      setInputClass(flashcards.inputFalse);
    }
  }, [input]);

  useEffect(() => {
    if (solution) {
      setInput(cards[currentCard].word);
    }
  }, [solution]);

  return (
    <div>
      {typeof currentCard === "number" && (
        <FlashcardFieldGame
          inputRef={inputRef}
          states={states}
          cards={cards}
          setters={setters}
          classes={flashcards}
          strings={strings}
        />
      )}
      <FlashcardMenu
        states={states}
        cards={cards}
        setters={setters}
        strings={strings}
        inputRef={inputRef}
        classes={flashcards}
      />
    </div>
  );
}
