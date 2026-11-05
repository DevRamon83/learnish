import { useEffect, useState } from "react";

export const useChatInitialization = (user) => {
  const [chatList, setChatList] = useState([]);
  const [receiverID, setReceiverID] = useState(null);
  const [receiverUsername, setReceiverUsername] = useState(null);

  useEffect(() => {
    if (!user) return;

    if (user.type === "teacher") {
      setChatList(user.studentsList);
    } else {
      setChatList([
        {
          _id: user.teacherData.id,
          username: user.teacherData.username,
          profilePic: {
            bucketImg: "users",
            fileName: `avatar_${user.teacherData.id}.webp`,
            storage: "supabase",
          },
        },
      ]);
    }
  }, [user]);

  return {
    chatList,
    receiverID,
    setReceiverID,
    receiverUsername,
    setReceiverUsername,
  };
};
