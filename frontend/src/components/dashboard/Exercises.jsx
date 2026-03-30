import { useState } from "react";
import { classes } from "../../constants/layout/dashboard";
import ExercisesMenu from "./ExercisesMenu";
import { exercisesTab } from "../../constants/dashboard";

export default function Exercises() {
  const [exercise, setExercise] = useState(exercisesTab[0]);
  return (
    <div className={classes.dashPanel}>
      <ExercisesMenu exercise={exercise} setExercise={setExercise} />
    </div>
  );
}
