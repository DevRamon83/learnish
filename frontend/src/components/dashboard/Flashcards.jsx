import { useEffect, useState } from "react";
import fetchFlashcards from "../../api/handlers/fetchFlashcards";
import FlashcardGame from "./FlashcardGame";

export default function Flashcards() {
  const [cards, setCards] = useState(null);
  const [start, setStart] = useState(false);

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
    <div>
      <p>flashcards</p>
      {cards && !start && <div onClick={() => setStart(true)}>start</div>}
      {start && <FlashcardGame setStart={setStart} cards={cards} />}
    </div>
  );
}
