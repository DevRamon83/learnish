import { useEffect, useState } from "react";
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
  handleKeyDown,
  sendHandler,
  myMessageRef,
  invertScroll,
  strings,
  getOlderMessages,
  olderBtn,
  setInvertScroll,
}) {
  const length = messages.length;
  const dispatch = useDispatch();
  const [straightDown, setStraightDown] = useState(length === 10);
  const containerRef = useAutoScroll(length, invertScroll, straightDown);

  useEffect(() => {
    setStraightDown(true);
    setInvertScroll(false);
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
    <div className={classes.chat}>
      {length > 9 && (
        <div className={classes.older} onClick={getOlderMessages}>
          {olderBtn}
        </div>
      )}

      <div className={classes.allMessages} ref={containerRef}>
        {messages.map((message) => (
          <MessageRow
            key={message._id}
            receiverID={receiverID}
            user={user}
            message={message}
            classes={classes}
          />
        ))}
      </div>
      <div className={classes.textareaContainer}>
        <textarea
          onKeyDown={handleKeyDown}
          ref={myMessageRef}
          className={classes.textarea}
          placeholder={strings.textareaPlaceholder}
        />
        <img src="/send.svg" onClick={sendHandler} />
      </div>
    </div>
  );
}
