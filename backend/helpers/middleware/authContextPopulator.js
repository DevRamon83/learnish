const authContextPopulator = (req, username, id) => {
  const msg = "invalidPayload";
  if (!username) return { error: true, errorType: msg + "Username" };

  if (!id) return { error: true, errorType: msg + "id" };

  req.context.auth.username = username;
  req.context.auth.id = id;

  return { error: false };
};

export default authContextPopulator;
