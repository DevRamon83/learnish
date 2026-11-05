import { classes } from "../constants/components/messages";
import getPicUrl from "../helpers/getPicUrl";

export default function ChatList({ chatList, receiverID, currentChatHandler }) {
  return (
    <div className={classes.studentsList}>
      {chatList.map((student) => {
        const currentUser = student._id === receiverID;
        return (
          <div
            onClick={() => currentChatHandler(student)}
            className={classes.student}
            key={student._id}
          >
            <div className={currentUser ? classes.activeImg : classes.img}>
              <img src={getPicUrl(student)} />
            </div>
            <div className={currentUser ? classes.activeUser : classes.user}>
              {student.username.slice(0, 8)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
