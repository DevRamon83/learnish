const authContextPopulator = (req, username, id, type, plan) => {
  const msg = "invalidPayload";
  if (!username) return { error: true, errorType: msg + "Username" };

  if (!id) return { error: true, errorType: msg + "id" };

  req.context.auth.username = username;
  req.context.auth.id = id;
  req.context.auth.type = type;
  req.context.auth.plan = plan;

  return { error: false };
};

export default authContextPopulator;
