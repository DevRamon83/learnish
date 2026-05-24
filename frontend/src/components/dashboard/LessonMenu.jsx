import { NavLink } from "react-router-dom";
import BackToDashboard from "../../ui/BackToDashboard";

export default function LessonMenu({ strings, lessonID }) {
  const lessonKeys = Array.from(strings.keys());
  const index = lessonKeys.indexOf(lessonID);
  const nextLessonUrl = lessonKeys[index + 1];
  const nextLesson = strings.get(nextLessonUrl);
  const link = nextLessonUrl.replace("_", "-");

  return (
    <div className="lesson__menu">
      <BackToDashboard />

      <NavLink className="lesson__next" to={`/user/lesson/${link}`}>
        {nextLesson.title}
        <img className="lesson__next-img" src="/next.svg" />
      </NavLink>
    </div>
  );
}
