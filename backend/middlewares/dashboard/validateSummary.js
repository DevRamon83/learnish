import bundle from "shared/index.js";
import handleErrorResponse from "../../helpers/handleErrorResponse.js";
const { summaryValidator } = bundle.validators;

const validateSummary = (req, res, next) => {
  const { idVideo, summary, lang } = req.body;
  const objValidator = { youtube: idVideo, summary, lang, caller: "backend" };

  const validData = summaryValidator(objValidator);
  if (validData.error) {
    const log = true;
    const userBann = true;
    const errorType = validData.errorMsg;
    return handleErrorResponse(res, req, errorType, 403, log, userBann);
  }

  next();
};

export default validateSummary;
