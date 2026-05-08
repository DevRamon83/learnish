const getAiUrl = (caller, prompt, lang, voice) => {
  switch (caller) {
    case "img":
      return `https://gen.pollinations.ai/image/${prompt}?model=flux&width=300&height=250`;
    case "audio":
      return `https://gen.pollinations.ai/audio/${prompt}?voice=${voice}&response_format=opus&style=${lang}%20accent`;
    default:
      break;
  }
};

const pollinationsFetch = async (prompt, myWord, index, dataCaller, voice) => {
  // caller > "img" || "audio"
  // extension > ".jpeg" || ".opus"
  const { caller, lang, extension } = dataCaller;
  const url = getAiUrl(caller, prompt, lang, voice);

  const apiKey = process.env.POLLINATIONS_API_KEY;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      return { error: true, errorMsg: response };
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileName = `word${index}${extension}`;

    return { error: false, buffer, fileName };
  } catch (err) {
    console.error("Errore fetch:", err.message);
    return { error: true, errorMsg: err };
  }
};

export default pollinationsFetch;
