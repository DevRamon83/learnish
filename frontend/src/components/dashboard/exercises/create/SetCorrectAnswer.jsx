import { useState } from "react";
import { answerCleaner } from "../../../../helpers/exercises/exerciseHelpers";

export default function SetCorrectAnswer({ chooseAnswer, setExercise }) {
  const [selected, setSelected] = useState({ btn: null, index: null });

  const handler = (btn, index) => {
    setSelected({ btn, index });
    const { cleanAnswer, firstChar, lastChar } = answerCleaner(btn);
    const cloneArray = [...chooseAnswer];
    const prefix = firstChar ? firstChar : "";
    const suffix = lastChar ? lastChar : "";
    cloneArray[index] = `${prefix}...${suffix}`;
    const cloze = cloneArray.join(" ");

    setExercise((prev) => ({
      ...prev,
      answer: [cleanAnswer, index],
      clozeQuestion: cloze,
    }));
  };

  const btnBase = "exercise__btn";

  return (
    <>
      <div className="exercise__answer">
        {chooseAnswer.map((btn, index) => (
          <div
            className={`${btnBase}${btn === selected.btn && index === selected.index ? "-selected" : ""}`}
            key={`key${btn}${index}`}
            onClick={() => handler(btn, index)}
          >
            {btn}
          </div>
        ))}
      </div>
    </>
  );
}
