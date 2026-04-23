import banUser from "../services/banUser.js";
import logWriter from "../services/logWriter.js";

const logData = (req, message, userBan) => {
  return {
    username: userBan ? userBan : null,
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
  if (log) {
    const data = logData(req, message, userBan);
    logWriter(data);
  }

  if (userBan) {
    banUser(userBan, req);
  }
};

export default handleErrorResponse;
