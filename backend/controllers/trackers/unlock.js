import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import lessonModel from "../../models/trackers/lessonsTracker.js";

const defineSlotValue = (plan) => {
  switch (plan) {
    case "free":
      return 1;
    case "basic":
      return 2;
    case "pro":
      return 3;
    default:
      return 0;
  }
};

const defineNextUnlock = (currentMs) => {
  const date = new Date(currentMs);

  date.setHours(23, 59, 59, 999);

  return date.getTime() + 1;
};

const checkRequest = (level, plan) => {
  const planMap = {
    free: ["a1", "a2"],
    basic: ["a1", "a2", "b1", "b2"],
    pro: ["a1", "a2", "b1", "b2", "c1", "c2"],
  };

  const userPlan = planMap[plan];

  return userPlan.includes(level);
};

const unlock = async (req, res) => {
  let log = false;
  try {
    const userID = req.context.auth.id;
    const userPlan = req.context.auth.plan;
    const { lessonIndex, level } = req.body;
    const userLessons = await lessonModel.findOne({ userId: userID });

    if (!userLessons) {
      // is an attack
      log = true;
      const errorMsg = "missing userLEsson in unlock";
      return handleErrorResponse(res, req, errorMsg, 403, log);
    }

    const validLevel = checkRequest(level, userPlan);

    if (!validLevel) {
      const errorMsg = "invalidPlan";
      return handleErrorResponse(res, req, errorMsg, 403, log);
    }

    let canUnlock = false;
    let availableSlot;

    if (userLessons.unlocked.includes(lessonIndex)) {
      const errorMsg = "lesson is already unlock";
      return handleErrorResponse(res, req, errorMsg, 400, log);
    }

    const now = Date.now();

    const nextUnlock = defineNextUnlock(now);
    const planSlot = defineSlotValue(userPlan);

    // if true is a new day
    if (userLessons.nextUnlock < now) {
      canUnlock = true;
    }

    // If canUnlock is true, it's the user's first unlock of the day,
    // so available slots match the plan's total slots.
    // Otherwise, we calculate remaining slots by subtracting today's usage.
    if (canUnlock) {
      availableSlot = planSlot;
    } else {
      availableSlot = planSlot - userLessons.unlockedToday;
    }

    if (availableSlot === 0) {
      const errorMsg = "slotUnavailable";
      return handleErrorResponse(res, req, errorMsg, 400, log);
    }

    // Calculate today's total unlocks: total plan slots minus available slots,
    // plus the current unlock.
    // Case 1: First unlock of the day (availableSlot === planSlot) -> evaluates to 1.
    // Case 2: Subsequent unlocks -> subtraction returns a valid integer
    // representing prior usage,
    // then adding 1 tracks the new state.
    // This inline math removes the need for a separate,
    // explicit cleanup/reset logic for unlockedToday.
    userLessons.unlockedToday = planSlot - availableSlot + 1;
    userLessons.unlocked.push(lessonIndex);
    userLessons.nextUnlock = nextUnlock;
    await userLessons.save();

    res.status(200).json({ error: false, unlocked: lessonIndex });
  } catch (err) {
    console.error("Error in unlock lesson:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default unlock;
