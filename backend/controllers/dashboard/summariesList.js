import handleErrorResponse from "../../helpers/handleErrorResponse.js";

const summariesList = async (req, res) => {
  const log = false;
  try {
  } catch (err) {
    console.error("Error in login:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default summariesList;
