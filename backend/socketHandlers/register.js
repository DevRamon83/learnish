const register = (socket, connectedUsers, data) => {
  const { userId, username } = data;
  if (!userId || !username) return;

  connectedUsers.set(userId, {
    socketId: socket.id,
    username,
  });
  socket.customUserId = userId;
};

export default register;
