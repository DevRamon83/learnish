import bundle from "shared/index.js";
import handleErrorResponse from "../../helpers/handleErrorResponse.js";
const { summaryValidator } = bundle.validators;

const validateSummary = (req, res, next) => {
  const { title, idVideo, summary, lang } = req.body;

  const objValidator = {
    title,
    youtube: idVideo,
    summary,
    lang,
    caller: "backend",
  };

  const validData = summaryValidator(objValidator);
  if (validData.error) {
    const log = true;
    const userBan = true;
    const errorType = validData.errorMsg;
    return handleErrorResponse(res, req, errorType, 403, log, userBan);
  }

  next();
};

export default validateSummary;
