import auth from "./auth.json" with { type: "json" };
import summary from "./summary.json" with { type: "json" };
import dashboard from "./dashboard.json" with { type: "json" };
import layout from "./layout.json" with { type: "json" };
import errors from "./errors.json" with { type: "json" };
import metadata from "./metadata.json" with { type: "json" };
import flashcards from "./flashcards.json" with { type: "json" };

const components = {
  auth,
  summary,
  dashboard,
  layout,
  errors,
  metadata,
  flashcards,
};

export default components;
