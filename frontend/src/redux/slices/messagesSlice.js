import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    allMessages: {},
    newSenders: [],
    newMessage: false,
    isChatting: false,
  },
};

const addMessage = (data, payload) => {
  const { senderID, receiverID, whoAmI } = payload;
  delete payload.error;

  const peerID = whoAmI === "receiver" ? senderID : receiverID;

  data.newMessage = whoAmI === "receiver" ? true : data.newMessage;

  if (whoAmI === "receiver" && !data.newSenders.includes(senderID)) {
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
      state.data.dashboardPath = action.payload;
    },
  },
});

export const { setChatData, addLiveMessage, setIsChatting } =
  messagesSlice.actions;

export default messagesSlice.reducer;
