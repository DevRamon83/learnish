import handleErrorResponse from "../../helpers/handleErrorResponse.js";

const bannedCheck = (req, res, next) => {
  const usersBanned = req.context.usersBanned;
  const username = req.context.authContext.username;
  const log = true;
  const userBann = false;

  if (usersBanned.has(username)) {
    const errorType = "userBanned";
    return handleErrorResponse(res, req, errorType, 403, log, userBann);
  }

  next();
};

export default bannedCheck;
