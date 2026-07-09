import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import { Teacher } from "../../models/user.js";

const teachersList = async (req, res) => {
  const log = true;
  try {
    const teachers = await Teacher.find({ "contract.isComplete": true })
      .select("username taughtLang contract profilePic currency")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json(teachers);
  } catch (err) {
    console.error("Error in teachersList:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default teachersList;
