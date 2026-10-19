import handleErrorResponse from "../../helpers/handleErrorResponse.js";

const actionEnum = ["deactivate", "choose"];

const teacherActionValidator = (req, res, next) => {
  const action = req.body.action;
  const invalidAction = "invalid action on teacher update";

  if (!actionEnum.includes(action))
    return handleErrorResponse(res, req, invalidAction, 400, true, true);

  next();
};

export default teacherActionValidator;
