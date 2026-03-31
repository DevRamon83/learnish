const youtube = {
  id: "youtube",
  type: "url",
  placeholder: "youtube link",
  label: "il link a youtube",
  required: true,
};

const summary = {
  id: "summary",
  type: "textarea",
  placeholder: null,
  rows: 10,
  cols: 50,
  label: "scrivi il tuo sommario",
  required: true,
  maxWords: 500,
  onChange: true,
  counterLabel: "massimo parole",
};

const summaryConfigBuilder = () => {
  const array = [youtube, summary];
  return {
    configArray: array,
    isAsync: false,
    i18n: true,
  };
};

export default summaryConfigBuilder;
