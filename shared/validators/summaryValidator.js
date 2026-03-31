import { validateYoutubeUrl } from "ramon-vanilla";

const summaryValidator = (url) => {
  const idVideo = validateYoutubeUrl(url);
  if (idVideo.error) return { error: true, errorMsg: "invalid url" };

  return { error: false, idVideo: idVideo.videoID };
};

export default summaryValidator;
