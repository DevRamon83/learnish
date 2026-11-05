import { useEffect } from "react";
import fetchUpdateMessages from "../../../api/handlers/fetchUpdateMessages";
import { useDispatch } from "react-redux";
import { updateUnreadMessages } from "../../../redux/slices/authSlice";
import useAutoScroll from "../../../hooks/useAutoScroll";
import MessageRow from "../../../ui/MessageRow";

export default function ChatRender({
  user,
  receiverID,
  messages,
  receiverName,
  classes,
}) {
  const dispatch = useDispatch();
  const containerRef = useAutoScroll(messages.length);

  useEffect(() => {
    const controller = new AbortController();

    const update = async () => {
      if (!user.unreadMessages.includes(receiverName)) return;
      const data = { userID: user.id, receiverName, action: "cleanUp" };

      const res = await fetchUpdateMessages(data, controller.signal);

      if (res.error) {
        // error handler
      } else {
        dispatch(updateUnreadMessages(res.data));
      }
    };

    update();

    return () => controller.abort();
  }, [receiverID]);

  return (
    <div className={classes.chat} ref={containerRef}>
      {messages.length > 0 &&
        messages.map((message) => (
          <MessageRow
            key={message._id}
            receiverID={receiverID}
            user={user}
            message={message}
            classes={classes}
          />
        ))}
    </div>
  );
}
