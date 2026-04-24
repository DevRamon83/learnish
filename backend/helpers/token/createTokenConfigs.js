const createTokenConfigs = (configData) => {
  const { username, id, shared } = configData;
  const accessConfig = {
    id,
    username,
    shared,
    expiresIn: "5m",
    maxAge: null,
    tokenName: process.env.ACCESS_TOKEN,
  };

  const refreshConfig = {
    id,
    username,
    shared,
    expiresIn: "255m",
    maxAge: null,
    tokenName: process.env.REFRESH_TOKEN,
  };

  return { accessConfig, refreshConfig };
};

export default createTokenConfigs;
