const handleErrorResponse = (res, message, status, log) => {
  const ensureMessage = log ? "error_fakeMsg" : message;
  res.status(status).json({ error: true, message: ensureMessage });
  if (log) {
    // write log logic
  }
  return true;
};

export default handleErrorResponse;
