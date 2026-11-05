import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import bundle from "shared";
const { typeChecker } = bundle;

const validateRetrieveMessages = (req, res, next) => {
  const log = true;
  const ban = true;
  const { peerID, start, end } = req.query;

  if (!peerID)
    return handleErrorResponse(res, req, "chatIDmissing", 500, log, ban);

  const startNum = parseInt(start, 10);
  const endNum = parseInt(end, 10);

  const isValidSTart = typeChecker(startNum, "number");
  const isValidSEnd = typeChecker(endNum, "number");

  if (!isValidSTart || !isValidSEnd || startNum < 0 || endNum < startNum)
    return handleErrorResponse(res, req, "invalidSkipLimit", 500, log, ban);

  const limit = end - start + 1;
  if (limit !== 10)
    return handleErrorResponse(res, req, "tooManyMessages", 500, log, ban);

  next();
};

export default validateRetrieveMessages;
