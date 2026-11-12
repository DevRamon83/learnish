import { useRef } from "react";
import { classes } from "../constants/components/messages";
import getPicUrl from "../helpers/getPicUrl";
import useHorizontalScroll from "../hooks/useHorizontalScroll";

export default function StudentsList({ list, current, studentHandler }) {
  const refContainer = useRef(null);

  const scrollToRight = useHorizontalScroll(refContainer, "left");
  const scrollToLeft = useHorizontalScroll(refContainer, "right");

  return (
    <div className={classes.scrollWrapper}>
      <button className={classes.leftScroll} onClick={scrollToLeft} />
      <div ref={refContainer} className={classes.studentsList}>
        {list.map((student) => {
          const currentUser = student._id === current;
          return (
            <button
              onClick={() => studentHandler(student)}
              className={classes.student}
              key={student._id}
            >
              <div className={currentUser ? classes.activeImg : classes.img}>
                <img src={getPicUrl(student)} />
              </div>
              <div className={currentUser ? classes.activeUser : classes.user}>
                {student.username.slice(0, 8)}
              </div>
            </button>
          );
        })}
      </div>
      <button className={classes.rightScroll} onClick={scrollToRight} />
    </div>
  );
}
