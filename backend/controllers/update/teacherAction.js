import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { userModel, Teacher } from "../../models/user.js";

const teacherAction = async (req, res) => {
  const log = true;
  try {
    const userID = req.context.auth.id;
    const user = await userModel.findById(userID);
    const teacherID = req.body.id;
    const oldTeacherID = user.teacher?.id;

    if (oldTeacherID) {
      await Teacher.findByIdAndUpdate(oldTeacherID, {
        $pull: { students: userID },
      });
    }

    if (req.body.action === "deactivate") {
      user.teacher = undefined;
      await user.save();
      return res.status(200).json({ error: false, teacher: "choose" });
    }

    const teacher = await Teacher.findByIdAndUpdate(
      teacherID,
      {
        $push: { students: userID },
      },
      { returnDocument: "after" },
    );

    const response = {
      id: teacherID,
      username: teacher.username,
    };
    user.teacher = response;
    await user.save();
    return res.status(200).json({ error: false, teacher: response });
  } catch (err) {
    console.error("Error in chooseTeacher:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default teacherAction;
