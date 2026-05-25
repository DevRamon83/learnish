import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import statsModel from "../../models/stats.js";
import summaryModel from "../../models/summaries.js";
import { userModel } from "../../models/user.js";

const todaySummaries = async (userId) => {
  const todayDate = new Date();
  const year = todayDate.getFullYear();
  const month = todayDate.getMonth() + 1;
  const today = todayDate.getDate();

  const monthDoc = await statsModel.findOne({ userId, year, month }).lean();

  if (!monthDoc || !monthDoc.dayStat) return 0;

  const todayObj = monthDoc.dayStat.filter((stat) => stat.day === today);

  return todayObj.length;
};

const availableSummary = (plan, summaries) => {
  if (plan === "free") return false;
  if (plan === "basic" && summaries >= 1) return false;
  if (plan === "pro" && summaries >= 3) return false;

  return true;
};

const newSummary = async (req, res) => {
  const log = false;

  try {
    const { id, shared } = req.context.auth;

    const user = await userModel.findById(id).lean();

    if (!user) {
      const errorMsg = "user not found";
      return handleErrorResponse(res, req, errorMsg, 404, true);
    }

    const createdToday = await todaySummaries(id);

    const haveAvailableSummaries = availableSummary(user.plan, createdToday);

    if (!haveAvailableSummaries) {
      return res.status(400).json({ error: true, message: "unavailable" });
    }

    const { summary, idVideo, lang, title } = req.body;
    const userLang = lang;

    const data = {
      title: title,
      videoID: idVideo,
      summary,
      shared,
      owner: id,
    };

    const mySummary = await summaryModel.create(data);

    res.status(200).json({ error: false, summary: mySummary });
  } catch (err) {
    console.error("Error in newSummary:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default newSummary;
