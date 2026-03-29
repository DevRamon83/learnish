import bannUser from "../services/bannUser.js";
import logWriter from "../services/logWriter.js";

const logData = (req, message, userBann) => {
  return {
    username: userBann ? userBann : null,
    method: req.method,
    ip: req.ip,
    url: req.originalUrl,
    errorType: message,
    userAgent: req.headers["user-agent"],
  };
};

const handleErrorResponse = (res, req, message, status, log, userBann) => {
  const ensureMessage = log ? "error_fakeMsg" : message;
  res.status(status).json({ error: true, message: ensureMessage });
  if (log) {
    const data = logData(req, message, userBann);
    logWriter(data);
  }

  if (userBann) {
    bannUser(userBann, req);
  }
};

export default handleErrorResponse;
