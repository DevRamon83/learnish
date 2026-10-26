import { useEffect, useState } from "react";
import ListenAndRepeat from "./ListenAndRepeat";
import { useLang } from "../../../hooks/useLang";
import { i18nAddresses } from "../../../constants/i18nAddresses";
import { classes } from "../../../constants/components/exercises";
import ExerciseCards from "../../../ui/exercises/ExerciseCards";

export default function Exercises() {
  const [currentExercise, setCurrentExercise] = useState(null);
  const [cardsClass, setCardsClass] = useState("exercises__cardsContainer");
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

  useEffect(() => {
    if (panel === "-close") {
      setCurrentExercise(null);
      setCardsClass("exercises__cardsContainer");
    }

    if (panel === "-open") {
      setCardsClass("exercises__cardsContainer-hide");
    }
  }, [panel]);

  return (
    <div className={classes.tabContainer}>
      <div className={cardsClass}>
        <ExerciseCards
          exercises={exercises}
          classes={classes}
          handler={handler}
          strings={strings}
        />
      </div>

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
