const getMessageSenderPic = (user) => {
  if (!user) return;
  if (user.type === "teacher") {
    const studentData = user.studentsList.filter(
      (student) => student.username === user.unreadMessages[0],
    );
    return studentData[0].profilePic;
  }

  return {
    bucketImg: "users",
    fileName: `avatar_${user.teacherData.id}.webp`,
    storage: "supabase",
  };
};

export default getMessageSenderPic;
