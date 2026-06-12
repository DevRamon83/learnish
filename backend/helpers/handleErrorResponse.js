import banUser from "../services/banUser.js";
import logWriter from "../services/logWriter.js";

const logData = (req, message, userBan) => {
  const user = req.context?.auth?.id || null;
  return {
    userID: userBan ? user : null,
    method: req.method,
    ip: req.ip,
    url: req.originalUrl,
    errorType: message,
    userAgent: req.headers["user-agent"],
  };
};

const handleErrorResponse = (res, req, message, status, log, userBan) => {
  const ensureMessage = log ? "error_fakeMsg" : message;
  res.status(status).json({ error: true, message: ensureMessage });
  const data = logData(req, message, userBan);
  if (log) {
    logWriter(data);
  }

  if (userBan) {
    banUser(req, data);
  }
};

export default handleErrorResponse;
