import { getDate } from "../helpers/dateHelpers";
import getPicUrl from "../helpers/getPicUrl";

export default function MessageRow({ user, message, receiverID, classes }) {
  const receiverPic = {
    pic: {
      bucketImg: "users",
      fileName: `avatar_${receiverID}.webp`,
      storage: "supabase",
    },
  };
  const picData = user.id === message.senderID ? user : receiverPic;

  const { base } = classes;

  return (
    <div
      className={`${base}${user.id === message.senderID ? "myRow" : "yourRow"}`}
    >
      <div className={classes.container}>
        <img className={classes.avatar} src={getPicUrl(picData)} />
        <div className={classes.text}>{message.content}</div>
      </div>
      <div className={classes.date}>
        {getDate(message.createdAt).replace(",", "")}
      </div>
    </div>
  );
}
