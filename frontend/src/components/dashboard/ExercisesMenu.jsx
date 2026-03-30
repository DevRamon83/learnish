import { exercisesTab } from "../../constants/dashboard";
import { classes } from "../../constants/layout/dashboard";

export default function ExercisesMenu({ exercise, setExercise }) {
  return (
    <div>
      {exercisesTab.map((tab) => (
        <div
          key={tab}
          className={exercise === tab ? classes.dashActiveBtn : classes.dashBtn}
          onClick={() => {
            setExercise(tab);
          }}
        >
          {tab}
        </div>
      ))}
    </div>
  );
}
