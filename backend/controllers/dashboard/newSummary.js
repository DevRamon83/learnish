import handleErrorResponse from "../../helpers/handleErrorResponse.js";

const newSummary = async (req, res) => {
  const log = false;
  try {
  } catch (err) {
    console.error("Error in login:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default newSummary;
