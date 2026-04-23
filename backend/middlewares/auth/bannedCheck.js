import handleErrorResponse from "../../helpers/handleErrorResponse.js";

const bannedCheck = (req, res, next) => {
  const usersBanned = req.context.usersBanned;
  const username = req.context.auth.username;
  const log = true;
  const userBan = false;

  if (usersBanned.has(username)) {
    const errorType = "userBanned";
    return handleErrorResponse(res, req, errorType, 403, log, userBan);
  }

  next();
};

export default bannedCheck;
