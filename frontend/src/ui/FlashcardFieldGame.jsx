import { cardBaseURL, ids } from "../constants/components/dashboard";
import {
  onChangeHandler,
  commandHandler,
} from "../helpers/flashcards/handlers";

export default function FlashcardFieldGame({
  cards,
  setters,
  states,
  inputRef,
  classes,
  strings,
}) {
  const { setInput } = setters;

  const { currentCard, cardsKeys, matchStatus, inputClass, help, input } =
    states;

  const currentWord = cards[cardsKeys[currentCard]];

  return (
    <div className={classes.container}>
      <img src={`${cardBaseURL}word${currentWord._id}.jpeg`} />
      <div className={classes.inputContainer}>
        <label htmlFor={ids.flashcardGuess}>{strings.word}</label>
        <input
          ref={inputRef}
          id={ids.flashcardGuess}
          className={inputClass}
          onKeyDown={(e) => commandHandler(e, states, setters, cards)}
          onChange={(e) => onChangeHandler(e, setInput, matchStatus.solution)}
          value={input}
          type="text"
        />

        <div>{help.text}</div>
      </div>
    </div>
  );
}
