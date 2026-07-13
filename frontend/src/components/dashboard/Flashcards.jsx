import { useEffect, useState } from "react";
import fetchFlashcards from "../../api/handlers/fetchFlashcards";
import FlashcardGame from "./FlashcardGame";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";
import { classes } from "../../constants/components/dashboard";
import ErrorOnSubmit from "../ErrorOnSubmit";

export default function Flashcards() {
  const [cards, setCards] = useState(null);
  const [start, setStart] = useState(false);
  const [error, setError] = useState(null);
  const { strings, lang } = useLang(i18nAddresses.flashcards);
  const errorStrings = useLang(i18nAddresses.errors);

  useEffect(() => {
    const controller = new AbortController();
    setError(null);

    const loadFlashcards = async () => {
      const res = await fetchFlashcards(controller.signal);
      if (res.aborted) return;

      if (res.error) {
        setError(errorStrings.strings.generic);
      } else {
        setCards(res.words);
      }
    };

    loadFlashcards();

    return () => controller.abort();
  }, []);

  return (
    <div className={classes.flashcards.main}>
      {!start && (
        <div className={classes.flashcards.intro}>
          <p>{strings.intro}</p>
          <h2>{strings.commands}</h2>
          <ol className={classes.flashcards.commands}>
            <li>{strings.enter}</li>
            <li>{strings.arrow}</li>
            <li>{strings.esc}</li>
          </ol>

          <div
            className={classes.flashcards.start}
            onClick={() => (cards ? setStart(true) : null)}
          >
            {cards ? strings.start : strings.wait}
          </div>
        </div>
      )}
      {start && cards && <FlashcardGame setStart={setStart} cards={cards} />}
      {error && (
        <div className={classes.error}>
          <ErrorOnSubmit error={error} />
        </div>
      )}
    </div>
  );
}
