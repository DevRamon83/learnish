import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import lessonModel from "../../models/trackers/lessonsTracker.js";

const unlocked = async (req, res) => {
  const log = false;

  try {
    const userID = req.context.auth.id;
    const lessons = await lessonModel.findOne({ userId: userID });
    res.status(200).json({ error: false, unlocked: lessons.unlocked });
  } catch (err) {
    console.error("Error in unlock lesson:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default unlocked;
