import { helpHandler } from "../helpers/flashcards/handlers";

export default function FlashcardHelpBtn({ setters, cards, states, classes }) {
  const { help } = states;
  return (
    <button
      onClick={() => helpHandler(setters, cards, states)}
      className={help.type !== "stop" ? classes.helpBtn : classes.helpless}
    >
      <img src={`/${help.type}.svg`} />
    </button>
  );
}
