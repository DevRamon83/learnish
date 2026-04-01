const getVideoMetadata = async (videoId) => {
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;

  try {
    const resp = await fetch(oEmbedUrl);
    if (!resp.ok) return { error: resp.status, errorMsg: resp.statusText };

    const data = await resp.json();
    const { title, author_name, thumbnail_url } = data;

    if (!title) return { error: true, errorMsg: "missing title" };
    if (!author_name) return { error: true, errorMsg: "missing author" };
    if (!thumbnail_url) return { error: true, errorMsg: "missing thumbnail" };

    return {
      error: false,
      title,
      channel: author_name,
      thumbnail: thumbnail_url,
    };
  } catch (err) {
    return { error: true, errorMsg: err.message };
  }
};

export default getVideoMetadata;
