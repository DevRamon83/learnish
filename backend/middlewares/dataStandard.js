const dataStandard = (req, res, next) => {
  const cache = req.app.get("securityCache");

  req.context = {
    tokens: {},
    user: {},
    tokensRevoked: cache.tokensRevoked,
    usersBanned: cache.usersBanned,
  };

  next();
};

export default dataStandard;
