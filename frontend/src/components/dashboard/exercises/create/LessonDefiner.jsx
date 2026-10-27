import { useEffect, useMemo, useState } from "react";

export default function LessonDefiner({
  lessons,
  setExercise,
  strings,
  classes,
}) {
  const [level, setLevel] = useState(null);
  const [selectedKey, setSelectedKey] = useState(null);
  const lessonMap = lessons.strings;
  const levels = [
    ...new Set(Array.from(lessonMap.values()).flatMap((obj) => obj.level)),
  ];

  const levelsMap = useMemo(() => {
    const map = { a1: {}, a2: {}, b1: {}, b2: {}, c1: {}, c2: {} };
    for (const key of lessonMap.keys()) {
      const obj = lessonMap.get(key);
      map[obj.level][key] = { index: obj.index, title: obj.title };
    }
    return map;
  }, [lessonMap]);

  useEffect(() => {
    setExercise((prev) => ({
      ...prev,
      lessonData: {
        lessonIndex: null,
        lessonKey: null,
        lessonTitle: null,
        lessonLevel: null,
      },
    }));
  }, [level]);

  useEffect(() => {
    if (!selectedKey) return;
    setExercise((prev) => ({
      ...prev,
      lessonData: {
        lessonIndex: lessonMap.get(selectedKey).index,
        lessonKey: selectedKey,
        lessonTitle: lessonMap.get(selectedKey).title,
        lessonLevel: level,
      },
    }));
  }, [selectedKey]);

  const btnBase = classes.btnBase;

  return (
    <>
      <h2>{strings.questionLevel}</h2>
      <div className={classes.levelContainer}>
        {[...levels].map((levelKey) => (
          <div
            className={`${btnBase}${level === levelKey ? "-selected" : ""}`}
            onClick={() => setLevel(levelKey)}
            key={`level_${levelKey}`}
          >
            {levelKey}
          </div>
        ))}
      </div>

      {level && levelsMap && (
        <>
          <h3>{strings.defineLesson}</h3>
          <select
            name="selectLesson"
            onChange={(e) => setSelectedKey(e.target.value)}
            defaultValue={""}
          >
            <option value="">{strings.labelSelect}</option>
            {Object.keys(levelsMap[level]).map((key) => (
              <option key={`lessonIndex_${key}`} value={key}>
                {lessonMap.get(key).title}
              </option>
            ))}
          </select>
        </>
      )}
    </>
  );
}
