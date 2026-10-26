import { useEffect, useRef, useState } from "react";
import LarRow from "../../../ui/exercises/LarRow";
import { classes } from "../../../constants/components/exercises";
import getDurations from "../../../helpers/getLarDurations";

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
  const dialogueContainerRef = useRef(null);
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

  useEffect(() => {
    if (dialogueContainerRef.current) {
      dialogueContainerRef.current.scrollTo({
        top: dialogueContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [rows]);

  console.log("dia ", currentDialogue.length);
  console.log("index ", index);
  return (
    <div className={classes.scriptContainer} ref={dialogueContainerRef}>
      <div className={classes.section}>
        {strings[card.dialogue]}
        <img title="close" alt="close" src="/close.svg" onClick={close} />
      </div>
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
        <div
          className={classes.repeatBtn}
          onClick={() => setRepeat(Date.now())}
        >
          {strings.repeatDialogue}
        </div>
      )}
    </div>
  );
}
