import { useEffect } from "react";

const useInitializeChatMap = (receiverID, messagesCachet, setMessages) => {
  useEffect(() => {
    if (!receiverID) return;
    const map = messagesCachet.current;
    const receiverMap = map.get(receiverID);
    if (receiverMap) {
      const messagesMap = receiverMap.get("messages");
      setMessages([...messagesMap]);
    } else {
      const receiverCachet = new Map();
      receiverCachet.set("messages", []);
      receiverCachet.set("indexes", [0, 9]);
      map.set(receiverID, receiverCachet);
    }
  }, [receiverID]);
};

export default useInitializeChatMap;
