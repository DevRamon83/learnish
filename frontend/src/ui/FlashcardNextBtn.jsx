import { nextHandler } from "../helpers/flashcards/handlers";

export default function FlashcardNextBtn({ setters, states, classes }) {
  return (
    <div onClick={() => nextHandler(setters, states)} className={classes.next}>
      <img src="/arrow.svg" />
    </div>
  );
}
