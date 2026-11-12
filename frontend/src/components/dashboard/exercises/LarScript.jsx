import { useEffect, useState } from "react";
import LarRow from "../../../ui/exercises/LarRow";
import { classes } from "../../../constants/components/exercises";
import getDurations from "../../../helpers/getLarDurations";
import useAutoScroll from "../../../hooks/useAutoScroll";

export default function LarScript({
  card,
  dialogues,
  setCard,
  strings,
  setRepeat,
}) {
  const [rows, setRows] = useState([]);
  const [index, setIndex] = useState(0);
  const [durations, setDurations] = useState([]);
  const containerRef = useAutoScroll(rows);

  const close = () => {
    setCard({
      dialogues: null,
      level: null,
    });
    setDurations([]);
    setIndex(0);
    setRows([]);
  };
  const currentDialogue = dialogues[card.dialogue][card.level];
  const audioFiles = currentDialogue.map((obj) => `/tts/${obj.englishAudio}`);

  useEffect(() => {
    if (currentDialogue.length === index) return;
    let timer;
    const time = index === 0 ? 0 : durations[index - 1];
    if (durations.length === 0) {
      getDurations(audioFiles, setDurations);
    } else {
      timer = setTimeout(() => {
        const file = currentDialogue[index].englishAudio;
        setRows((prev) => [...prev, file]);
        setIndex((prev) => prev + 1);
      }, time);
    }
    return () => clearTimeout(timer);
  }, [durations, index]);

  return (
    <div className={classes.scriptContainer} ref={containerRef}>
      <button className={classes.section}>
        {strings[card.dialogue]}
        <img title="close" alt="close" src="/close.svg" onClick={close} />
      </button>
      <div className={classes.dialogueContainer}>
        {rows.length !== 0 &&
          rows.map((row, rowIndex) => (
            <LarRow
              key={row}
              dialogue={currentDialogue[rowIndex].englishText}
              volume={false}
              audioSrc={`/tts/${currentDialogue[rowIndex].englishAudio}`}
              character={currentDialogue[rowIndex].character}
            />
          ))}
      </div>
      {Object.keys(currentDialogue).length === index && (
        <button
          className={classes.repeatBtn}
          onClick={() => setRepeat(Date.now())}
        >
          {strings.repeatDialogue}
        </button>
      )}
    </div>
  );
}
