import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { Student, Teacher, userModel } from "../../models/user.js";

const studentsList = async (req, res) => {
  const log = true;
  try {
    const userID = req.context.auth.id;
    const data = await userModel.findById(userID).select("students").lean();

    const students = await Student.find({ _id: { $in: data.students } })
      .select("username _id profilePic -userType")
      .lean();

    return res.status(200).json(students);
  } catch (err) {
    console.error("Error in studentsList:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default studentsList;
