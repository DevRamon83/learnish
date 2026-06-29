import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { userModel, Teacher } from "../../models/user.js";

const chooseTeacher = async (req, res) => {
  const log = true;
  try {
    const userID = req.context.auth.id;
    const user = await userModel.findById(userID);
    const teacherID = req.body.id;
    const teacher = await Teacher.findByIdAndUpdate(
      teacherID,
      {
        $push: { students: userID },
      },
      { new: true },
    );

    const response = {
      id: teacherID,
      username: teacher.username,
    };
    user.teacher = response;
    await user.save();
    return res.status(200).json({ error: false, teacher: response });
  } catch (err) {
    console.error("Error in saveDataContract:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default chooseTeacher;
