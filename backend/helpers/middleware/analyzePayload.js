import authContextPopulator from "./authContextPopulator.js";

const analyzePayload = (req, token, tokenType, tokensRevoked) => {
  const payload = token.payload;

  if (!payload && tokenType === "at") {
    return { exit: false };
  }

  const { username, id, type, plan } = payload;

  const validPayload = authContextPopulator(req, username, id, type, plan);

  if (validPayload.error) {
    return { exit: true, errorType: validPayload.errorType, status: 404 };
  }

  if (tokensRevoked.has(username)) {
    const errorType = "mustLogged";
    return { exit: true, errorType, status: 401 };
  }

  return { exit: false };
};

export default analyzePayload;
