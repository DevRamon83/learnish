import bundle from "shared";
const { contracts } = bundle.constants;
import handleErrorResponse from "../../helpers/handleErrorResponse.js";

const deactivateValidator = (req, res, next) => {
  const userContract = req.body.contract;
  const log = true;
  if (userContract === "subscription") {
    const errorMessage = "Cannot deactivate subscription";
    handleErrorResponse(res, req, errorMessage, 400, log);
    return;
  }

  if (!contracts.includes(userContract)) {
    const errorMessage = "Invalid contract";
    const banUser = true;
    handleErrorResponse(res, req, errorMessage, 400, log, banUser);
    return;
  }

  next();
};

export default deactivateValidator;
