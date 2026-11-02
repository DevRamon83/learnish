import { useDispatch } from "react-redux";
import { setIsChatting } from "../redux/slices/messagesSlice";
import { useEffect } from "react";

const useChatSignal = (tab) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (tab === "messages") {
      dispatch(setIsChatting(true));
    } else {
      dispatch(setIsChatting(false));
    }
  }, [tab]);
};

export default useChatSignal;
