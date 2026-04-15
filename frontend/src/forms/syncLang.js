export const syncLang = (array, strings) => {
  array.forEach((element) => {
    const id = element.id;
    element.label = strings.labels[id];
    element.placeholder = strings.placeholders[id];
  });
};
