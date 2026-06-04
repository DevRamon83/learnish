const syncSelect = (element, strings) => {
  const dataStrings = strings[element.id];
  element.label = dataStrings.labelText;
  for (let i = 0; i < element.options.length; i++) {
    element.labels[i] = dataStrings.options[element.options[i]];
  }
};

const syncRadio = (element, strings) => {
  const ids = element.options.ids;

  for (let i = 0; i < ids.length; i++) {
    const labels = strings[`${element.name}Label`];
    element.options.labels[i] = labels[i];
  }
};

const syncCommons = (element, strings) => {
  const id = element.id;
  element.label = strings.labels[id];
  element.placeholder = strings.placeholders[id];
};

const dispatch = (element, strings) => {
  switch (element.type) {
    case "select":
      syncSelect(element, strings);
      break;
    case "radio":
      syncRadio(element, strings);
      break;
    default:
      syncCommons(element, strings);
      break;
  }
};

export const syncLang = (array, strings) => {
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    dispatch(element, strings);
  }
};
