import { useDispatch, useSelector } from "react-redux";
import { resetCache, updateCache } from "../helpers/chatHelpers";
import { resetDataMessages } from "../redux/slices/messagesSlice";
import { useEffect, useRef } from "react";

const useMessageSync = () => {
  const reduxStoreMessages = useSelector((state) => state.messages.data);
  const messagesCache = useRef(null);
  if (!messagesCache.current) {
    messagesCache.current = new Map();
  }
  const dispatch = useDispatch();

  useEffect(() => {
    if (reduxStoreMessages.newSenders.length === 0) return;
    // avoid any risk of race condition
    if (reduxStoreMessages.newSenders.length > 1) {
      const allSenders = reduxStoreMessages.newSenders;
      resetCache(allSenders, messagesCache);
    } else {
      const sender = reduxStoreMessages.newSenders[0];
      const allSenderMessages = reduxStoreMessages.allMessages[sender];
      const myCache = messagesCache.current.get(sender);
      myCache && updateCache(allSenderMessages, myCache);
    }

    dispatch(resetDataMessages());
  }, [reduxStoreMessages.newSenders]);

  return messagesCache;
};

export default useMessageSync;
