const dataStandard = (req, res, next) => {
  const cache = req.app.get("securityCache");

  req.context = {
    tokens: {
      rotate: false,
      payload: null,
    },
    tokensRevoked: cache.tokensRevoked,
    usersBanned: cache.usersBanned,
    auth: {
      username: null,
      id: null,
      type: null,
      plan: null,
    },
  };

  next();
};

export default dataStandard;
