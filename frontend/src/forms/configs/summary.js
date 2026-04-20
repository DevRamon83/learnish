const youtube = {
  id: "youtube",
  type: "url",
  placeholder: null,
  label: null,
  required: true,
};

const summary = {
  id: "summary",
  type: "textarea",
  placeholder: null,
  rows: 10,
  cols: 100,
  label: null,
  required: true,
  maxWords: 500,
  onChange: true,
  counterLabel: null,
};

const summaryConfigBuilder = (strings) => {
  youtube.placeholder = strings.newSummaryForm.youtube.placeholder;
  youtube.label = strings.newSummaryForm.youtube.label;
  summary.label = strings.newSummaryForm.summary.label;
  summary.counterLabel = strings.newSummaryForm.summary.counterLabel;
  const array = [youtube, summary];
  return {
    configArray: array,
    isAsync: false,
    i18n: true,
  };
};

export default summaryConfigBuilder;
