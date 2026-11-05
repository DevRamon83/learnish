import { useDispatch, useSelector } from "react-redux";
import { resetCache, updateCache } from "../helpers/chatHelpers";
import { resetDataMessages } from "../redux/slices/messagesSlice";
import { useEffect, useRef } from "react";

const useMessageSync = () => {
  const reduxStoreMessages = useSelector((state) => state.messages.data);
  const messagesCachet = useRef(null);
  if (!messagesCachet.current) {
    messagesCachet.current = new Map();
  }
  const dispatch = useDispatch();

  useEffect(() => {
    if (reduxStoreMessages.newSenders.length === 0) return;
    // avoid any risk of race condition
    if (reduxStoreMessages.newSenders.length > 1) {
      const allSenders = reduxStoreMessages.newSenders;
      resetCache(allSenders, messagesCachet);
    } else {
      const sender = reduxStoreMessages.newSenders[0];
      const allSenderMessages = reduxStoreMessages.allMessages[sender];
      const myCache = messagesCachet.current.get(sender);
      myCache && updateCache(allSenderMessages, myCache);
    }

    dispatch(resetDataMessages());
  }, [reduxStoreMessages.newSenders]);

  return messagesCachet;
};

export default useMessageSync;
