import handleErrorResponse from "../../helpers/handleErrorResponse.js";

const createUser = async (req, res) => {
  try {
    const data = req.body;
    console.log("createUser ", data);
    console.log("createUser ", req.context);

    return res.status(200).json(data);
  } catch (err) {
    console.error("Error in createUser:", err);
    const log = false;
    return handleErrorResponse(res, err.message, 500, log);
  }
};

export default createUser;
