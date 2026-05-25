import { NavLink } from "react-router-dom";
import BackToDashboard from "../../ui/BackToDashboard";
import { classes } from "../../constants/pages/lessons";

export default function LessonMenu({ strings, lessonID }) {
  const lessonKeys = Array.from(strings.keys());
  const index = lessonKeys.indexOf(lessonID);
  const nextLessonUrl = lessonKeys[index + 1];
  const nextLesson = strings.get(nextLessonUrl);
  const link = nextLessonUrl.replace("_", "-");

  return (
    <div className={classes.menu}>
      <BackToDashboard />

      <NavLink className={classes.next} to={`/user/lesson/${link}`}>
        {nextLesson.title}
        <img className={classes.nextImg} src="/next.svg" />
      </NavLink>
    </div>
  );
}
