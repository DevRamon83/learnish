import { validateYoutubeUrl } from "ramon-vanilla";
import { langsArray } from "../constants/atomicConstants.js";

const summaryValidator = (obj) => {
  let validYoutube = true;
  let hasHTML = false;
  const { title, youtube, summary, lang, caller } = obj;
  if (!title) return { error: true, errorMsg: "missing title" };
  if (!youtube) return { error: true, errorMsg: "missing youtube url" };

  if (caller === "frontend") {
    validYoutube = validateYoutubeUrl(youtube);
    const doc = new DOMParser().parseFromString(summary, "text/html");
    hasHTML = doc.body.children.length > 0;
  } else if (typeof youtube !== "string" || youtube.length !== 11) {
    validYoutube = false;
  }

  if (title.length > 250) return { error: true, errorMsg: "title is too long" };

  if (hasHTML) return { error: true, errorMsg: "invalid summary" };

  if (validYoutube.error) return { error: true, errorMsg: "invalid url" };

  if (!summary) return { error: true, errorMsg: "missing summary" };

  if (!lang) return { error: true, errorMsg: "missing lang" };

  if (!langsArray.includes(lang))
    return { error: true, errorMsg: "invalid lang" };

  if (typeof summary !== "string" || summary.trim() === "") {
    return { error: true, errorMsg: "invalid summary" };
  }

  if (summary.split(" ").length > 500 || summary.length > 5000) {
    return { error: true, errorMsg: "oversize summary" };
  }

  const idVideo = validYoutube.videoID || null;

  return { error: false, idVideo };
};

export default summaryValidator;
