import { useRef, useState } from "react";
import { getSocket } from "../../../socket/socketClient";
import ChatRender from "./ChatRender";
import bundle from "shared";
import useChatSocket from "../../../hooks/useChatSocket";
import useChatRetriever from "../../../hooks/useChatRetriever";
import useInitializeChatMap from "../../../hooks/useInitializeChatMap";
import { olderHandler } from "../../../helpers/chatHelpers";
import { classes } from "../../../constants/components/messages";
const { validateChatMessage } = bundle.validators;

export default function ChatPanel({
  receiverID,
  messagesCachet,
  receiverName,
  user,
  setNotification,
  strings,
}) {
  const [messages, setMessages] = useState([]);
  const [olderBtn, setOlderBtn] = useState(strings.olderText);
  const myMessageRef = useRef(null);

  // If the receiver already has a map, update the local messages state.
  // Otherwise, create the map and let the next hook handle its management
  // and local state population.
  useInitializeChatMap(receiverID, messagesCachet, setMessages);

  // Check if this is the first render for the selected receiver.
  // if so, populate the cache map with the last 10 messages fetched from the DB
  // and update the local messages state.
  useChatRetriever(messagesCachet, receiverID, user, setMessages);

  // Update the cache, local state, and trigger a notification if necessary.
  useChatSocket(setMessages, setNotification, messagesCachet, receiverID);

  const sendHandler = () => {
    const text = myMessageRef.current.value;
    const isValidMessage = validateChatMessage(text);

    if (!isValidMessage) {
      // error handler
      return;
    }

    const myMessage = {
      receiverID,
      receiverName,
      content: text,
    };

    const socket = getSocket();

    socket.emit("send_msg", myMessage);

    myMessageRef.current.value = "";
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendHandler();
    }
  };

  const getOlderMessages = async () => {
    const mapStates = { messages, setMessages, olderBtn, setOlderBtn };
    const data = { receiverID, messagesCachet, strings };

    await olderHandler(data, mapStates);
  };

  return (
    <>
      {messages && messages.length > 0 && (
        <>
          {messages.length === 10 && (
            <div onClick={getOlderMessages}>{olderBtn}</div>
          )}
          <ChatRender
            key={receiverID}
            messages={messages}
            user={user}
            receiverName={receiverName}
            receiverID={receiverID}
            classes={classes}
          />
        </>
      )}
      {receiverID ? (
        <>
          <textarea
            onKeyDown={handleKeyDown}
            ref={myMessageRef}
            maxLength={250}
            rows="5"
            className={classes.textarea}
          />
          <div onClick={sendHandler}>invia</div>
        </>
      ) : (
        <div>{strings.selectOne}</div>
      )}
    </>
  );
}
