const dataStandard = (req, res, next) => {
  req.context = {
    tokens: {},
    user: {},
  };
  next();
};

export default dataStandard;
