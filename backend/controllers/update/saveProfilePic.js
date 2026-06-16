import handleErrorResponse from "../../helpers/handleErrorResponse.js";
import uploadFile from "../../helpers/uploadFile.js";
import { userModel } from "../../models/user.js";

const saveProfilePic = async (req, res) => {
  const log = false;

  try {
    const fileData = req.file;

    const data = {
      buffer: fileData.buffer,
      fileName: fileData.name,
      folder: "/profilePics",
      metaData: {
        bucket: "users",
        type: fileData.mimetype,
      },
    };

    const upload = await uploadFile(data);

    if (upload.error) {
      return handleErrorResponse(res, req, upload.error, 500, log);
    }

    const user = await userModel.findOneAndUpdate(
      { _id: req.context.auth.id },
      {
        $set: {
          "profilePic.storage": "supabase",
          "profilePic.bucketImg": "users",
          "profilePic.fileName": fileData.name,
        },
      },
    );

    const pic = {
      storage: "supabase",
      bucketImg: "users",
      fileName: fileData.name,
    };

    return res.status(200).json({ error: false, pic });
  } catch (err) {
    console.error("Error in saveProfilePic:", err);
    return handleErrorResponse(res, req, err.message, 500, log);
  }
};

export default saveProfilePic;
