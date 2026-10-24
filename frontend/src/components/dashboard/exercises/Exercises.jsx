import { useState } from "react";
import ListenAndRepeat from "./ListenAndRepeat";
import { useLang } from "../../../hooks/useLang";
import { i18nAddresses } from "../../../constants/i18nAddresses";
import { classes } from "../../../constants/components/exercises";
import ExerciseCards from "../../../ui/exercises/ExerciseCards";

export default function Exercises() {
  const [currentExercise, setCurrentExercise] = useState(null);
  const [panel, setPanel] = useState("");
  const exercises = ["lar"];
  const { strings } = useLang(i18nAddresses.exercises);
  // A unique timestamp is used as a key to force React to completely unmount and destroy
  // the component tree when switching panels. This safely flushes out all internal states
  // (like current dialogue index and rows) and clears any pending asynchronous audio timeouts,
  // preventing stale state reuse during rapid tab navigation.
  const timestamps = Date.now();

  const handler = (choice) => {
    setCurrentExercise(choice);
    setPanel("-open");
  };
  return (
    <div className={classes.tabContainer}>
      <ExerciseCards
        exercises={exercises}
        classes={classes}
        handler={handler}
        strings={strings}
      />

      <div className={`${classes.panelBase}${panel}`}>
        {currentExercise === "lar" && (
          <ListenAndRepeat
            key={timestamps}
            strings={strings}
            setPanel={setPanel}
          />
        )}
      </div>
    </div>
  );
}
