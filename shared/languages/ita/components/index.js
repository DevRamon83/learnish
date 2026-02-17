import auth from "./auth.json" with { type: "json" };

const components = {
  auth: {
    labels: auth.labels,
    placeholders: auth.placeholders,
    privacyLabel: auth.privacyLabel,
    tosLabel: auth.tosLabel,
  },
};

export default components;
