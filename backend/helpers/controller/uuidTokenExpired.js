const uuidTokenExpired = (user, date) => {
  const tokenDate = user[date];
  const tokenCreatedAt = new Date(tokenDate).getTime();
  const fifteenMinutes = 15 * 60 * 1000;
  const stillValid = tokenCreatedAt + fifteenMinutes;
  const now = Date.now();

  if (now > stillValid) return true;

  return false;
};

export default uuidTokenExpired;
