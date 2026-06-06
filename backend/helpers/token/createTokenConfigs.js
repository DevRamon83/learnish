const createTokenConfigs = (configData) => {
  const { username, id, type, plan } = configData;
  const accessConfig = {
    id,
    username,
    type,
    plan,
    expiresIn: "5m",
    maxAge: null,
    tokenName: process.env.ACCESS_TOKEN,
  };

  const refreshConfig = {
    id,
    username,
    type,
    plan,
    expiresIn: "255m",
    maxAge: null,
    tokenName: process.env.REFRESH_TOKEN,
  };

  return { accessConfig, refreshConfig };
};

export default createTokenConfigs;
