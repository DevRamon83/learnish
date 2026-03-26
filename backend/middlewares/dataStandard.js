const dataStandard = (req, res, next) => {
  const cache = req.app.get("securityCache");

  req.context = {
    tokens: {},
    user: {},
    tokensRevoked: cache.tokensRevoked,
    ipsBanned: cache.ipsBanned,
  };

  next();
};

export default dataStandard;
