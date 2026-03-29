export const setPopulator = (array, tokensRevoked, usersBanned) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].isRevoked) tokensRevoked.add(array[i].username);
    if (array[i].isBanned) usersBanned.add(array[i].username);
  }
};
