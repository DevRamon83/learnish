import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { userModel } from "../../models/user.js";

const createClassroom = async (req, res) => {
  const { animal, color } = req.body;
  const teacherID = req.context.tokens.payload.id;

  try {
    const teacher = await userModel.findById(teacherID);

    const myClassroom = teacher.classrooms[animal];

    if (!myClassroom) {
      teacher.classrooms[animal] = [];
    }

    if (myClassroom && myClassroom.includes(color)) {
      const errorMsg = "choseAnotherColor";
      return handleErrorResponse(res, req, errorMsg, 400, false);
    } else {
      teacher.classrooms[animal].push(color);
    }

    teacher.markModified("classrooms");
    await teacher.save();

    res.status(200).json({ error: false, message: "success" });
  } catch (err) {
    console.error("Error in flashcards:", err);
    return handleErrorResponse(res, req, err.message, 500, false);
  }
};

export default createClassroom;
