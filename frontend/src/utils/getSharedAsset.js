import bundle from "../../../shared/index.js";

export const getSharedAsset = (key, type) => {
  if (key === "language") return bundle.langs[type];
};
