import auth from "./auth.json" with { type: "json" };

const components = {
  auth: {
    labels: auth.labels,
    placeholders: auth.placeholders,
  },
};

export default components;
