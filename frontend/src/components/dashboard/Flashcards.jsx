import { useEffect, useState } from "react";
import fetchFlashcards from "../../api/handlers/fetchFlashcards";
import FlashcardGame from "./FlashcardGame";
import { useLang } from "../../hooks/useLang";
import { i18nAddresses } from "../../constants/i18nAddresses";

export default function Flashcards() {
  const [cards, setCards] = useState(null);
  const [start, setStart] = useState(false);
  const { strings, lang } = useLang(i18nAddresses.flashcards);

  useEffect(() => {
    const controller = new AbortController();

    const loadFlashcards = async () => {
      const res = await fetchFlashcards(controller.signal);
      if (res.error) {
        // error handler
      } else {
        setCards(res.words);
      }
    };

    loadFlashcards();

    return () => controller.abort();
  }, []);

  return (
    <div className="flashcard__main">
      {!start && (
        <div className="flashcard__intro">
          <p>{strings.intro}</p>
          <h2>{strings.commands}</h2>
          <ol className="flashcard__command">
            <li>{strings.enter}</li>
            <li>{strings.arrow}</li>
            <li>{strings.esc}</li>
          </ol>

          <div
            className="flashcard__start"
            onClick={() => (cards ? setStart(true) : null)}
          >
            {cards ? strings.start : strings.wait}
          </div>
        </div>
      )}
      {start && cards && <FlashcardGame setStart={setStart} cards={cards} />}
    </div>
  );
}
