import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import summaryModel from "../../models/summaries.js";
import { userModel } from "../../models/user.js";
import mongoose from "mongoose";

const studentData = async (req, res) => {
  const log = true;
  const { studentID } = req.query;
  const userID = req.context.auth.id;

  try {
    const user = await userModel.findById(userID);

    if (!user.students.includes(studentID))
      return handleErrorResponse(res, req, "notYourStudent", 500, log);

    const studentObjectId = new mongoose.Types.ObjectId(studentID);

    const [result] = await summaryModel.aggregate([
      {
        $match: { owner: studentObjectId },
      },
      {
        $lookup: {
          from: "stats",
          localField: "owner",
          foreignField: "userId",
          as: "stats",
        },
      },
      {
        $group: {
          _id: null,
          summaries: { $push: "$$ROOT" },
          stats: { $first: "$stats" },
        },
      },
      {
        $project: {
          _id: 0,
          summaries: 1,
          stats: 1,
        },
      },
    ]);

    const resp = result || { summaries: [], stats: [] };

    return res.status(200).json({ error: false, data: resp });
  } catch (err) {
    console.error("Error in studentData:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default studentData;
