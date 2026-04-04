import { useState } from "react";
import { classes } from "../../constants/layout/dashboard";
import ExercisesMenu from "./ExercisesMenu";
import Summaries from "./summaries/Summaries";

export default function Exercises({ exercisesTab }) {
  const [exercise, setExercise] = useState(exercisesTab[0]);
  return (
    <>
      <div className={classes.dashPanel}>
        <ExercisesMenu
          exercisesTab={exercisesTab}
          exercise={exercise}
          setExercise={setExercise}
        />
      </div>
      {exercise === "sommario" && <Summaries />}
    </>
  );
}
