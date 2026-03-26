const createTokenConfigs = (configData) => {
  const { username, id } = configData;
  const accessConfig = {
    id,
    username,
    expiresIn: "5m",
    maxAge: null,
    tokenName: process.env.ACCESS_TOKEN,
  };

  const refreshConfig = {
    id,
    username,
    expiresIn: "35m",
    maxAge: null,
    tokenName: process.env.REFRESH_TOKEN,
  };

  return { accessConfig, refreshConfig };
};

export default createTokenConfigs;
