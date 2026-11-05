import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    allMessages: {},
    newSenders: [],
    isChatting: false,
  },
};

const addMessage = (data, payload) => {
  const { senderID, receiverID, whoAmI } = payload;
  delete payload.error;
  const isChatting = data.isChatting;

  const peerID = whoAmI === "receiver" ? senderID : receiverID;

  if (
    whoAmI === "receiver" &&
    !data.newSenders.includes(senderID) &&
    !isChatting
  ) {
    data.newSenders.push(senderID);
  }

  if (data.allMessages[peerID]) {
    data.allMessages[peerID].push(payload);
  } else {
    data.allMessages[peerID] = [payload];
  }
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setChatData: (state, action) => {
      state.data = action.payload;
    },
    addLiveMessage: (state, action) => {
      addMessage(state.data, action.payload);
    },
    setIsChatting: (state, action) => {
      state.data.isChatting = action.payload;
    },
    resetDataMessages: () => {
      return initialState;
    },
  },
});

export const { setChatData, addLiveMessage, setIsChatting, resetDataMessages } =
  messagesSlice.actions;

export default messagesSlice.reducer;
