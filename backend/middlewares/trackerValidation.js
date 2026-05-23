import handleErrorResponse from "../helpers/handleErrorResponse.js";

const unlockValidation = (index, level) => {
  const splitIndex = index.split(".");
  const firstSub = parseInt(splitIndex[0]);
  const log = true;
  const validLevel = ["a1", "a2", "b1", "b2", "c1", "c2"];

  if (!validLevel.includes(level)) {
    return { invalid: true };
  }

  if (
    splitIndex[0].length > 2 ||
    splitIndex[1].length !== 2 ||
    splitIndex.length !== 2 ||
    firstSub > 52
  ) {
    return { invalid: true };
  }

  return { invalid: false };
};

const validationSwitch = (req, tracker) => {
  const { lessonIndex, level } = req.body;

  switch (tracker) {
    case "unlockLesson":
      return unlockValidation(lessonIndex, level);

    default:
      return { invalid: true };
  }
};

const trackerValidation = async (req, res, next) => {
  const tracker = req.path.replace("/", "");
  const isValid = validationSwitch(req, tracker);
  const log = true;
  if (isValid.invalid) {
    return handleErrorResponse(res, req, `error in ${tracker}`, 400, log);
  }

  next();
};

export default trackerValidation;
