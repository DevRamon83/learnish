import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import exerciseModel from "../../models/exercises.js";

const newExercise = async (req, res) => {
  const log = true;
  try {
    const { body, context } = req;

    const data = {
      type: body.type,
      question: body.question,
      clozeQuestion: body.clozeQuestion,
      answerText: body.answer[0],
      answerPosition: body.answer[1],
      multipleWrongs: body.multipleWrongs || undefined,
      targetLang: context.exerciseData.exerciseLang,
      lessonKey: body.lessonData.lessonKey,
      createdBy: context.auth.id,
    };

    await exerciseModel.create(data);
    res.status(200).json({ error: false });
  } catch (err) {
    console.error("Error in newExercise:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default newExercise;
