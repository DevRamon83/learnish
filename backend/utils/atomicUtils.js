export const setPopulator = (array, set, key) => {
  for (let i = 0; i < array.length; i++) {
    set.add(array[i][key]);
  }
};
