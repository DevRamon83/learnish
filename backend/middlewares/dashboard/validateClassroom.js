import bundle from "shared";
import handleErrorResponse from "../../helpers/handleErrorResponse.js";
const badge = bundle.constants;
const { animals, colors } = badge;

const validateClassroom = async (req, res, next) => {
  const log = true;
  const userBan = true;
  const { animal, color } = req.body;
  const userType = req.context.tokens.payload.type;
  if (userType !== "teacher") {
    return handleErrorResponse(res, req, "notATeacher", 400, log, userBan);
  }

  if (!animals.includes(animal) || !colors.includes(color)) {
    return handleErrorResponse(res, req, "invalidData", 400, log, userBan);
  }

  next();
};

export default validateClassroom;
