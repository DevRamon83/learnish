const handleErrorResponse = (res, req, message, status, log, ipBann) => {
  const ensureMessage = log ? "error_fakeMsg" : message;
  res.status(status).json({ error: true, message: ensureMessage });
  if (log) {
    // write log logic
  }
  return true;
};

export default handleErrorResponse;
