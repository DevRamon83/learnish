import auth from "./auth.json" with { type: "json" };

const components = {
  auth: {
    labels: auth.labels,
    placeholders: auth.placeholders,
    privacyLabel: auth.privacyLabel,
    tosLabel: auth.tosLabel,
    accountType: auth.accountType,
    textareaLabels: auth.textareaLabels,
    charLabels: auth.charLabels,
  },
};

export default components;
