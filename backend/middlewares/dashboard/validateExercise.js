import bundle from "shared/index.js";
import handleErrorResponse from "../../helpers/handleErrorResponse.js";
const { invalidExercise } = bundle.validators;
const { langs } = bundle;

const validateExercise = (req, res, next) => {
  const log = true;
  const userBan = true;
  const body = req.body;
  if (!body.lang)
    return handleErrorResponse(res, req, "invalidExercise", 400, log, userBan);

  const lang = body.lang;

  // Fallback to "english" if exerciseLang is not provided.
  // This prepares the application for future multi-language scalability.
  const exerciseLang = body.exerciseLang ?? "english";
  const lessonKey = `${exerciseLang}Lessons`;

  const lessons = langs[lang].lessons[lessonKey];

  if (!lessons)
    return handleErrorResponse(res, req, "invalidExercise", 400, log, userBan);

  const isInvalid = invalidExercise(body, lessons, "backend");

  if (isInvalid)
    return handleErrorResponse(res, req, "invalidExercise", 400, log, userBan);

  req.context.exerciseData = {
    exerciseLang,
  };

  next();
};

export default validateExercise;
