import sharp from "sharp";
import handleErrorResponse from "../../helpers/handleErrorResponse.js";

const validateImgMimetype = (buffer) => {
  if (!buffer || buffer.length < 4) return false;

  const hex = buffer.toString("hex", 0, 4);

  if (hex === "89504e47") return true;

  if (hex.startsWith("ffd8ff")) return true;

  return false;
};

const prepareProfilePic = async (req, res, next) => {
  const log = true;
  const ban = true;

  if (!req.file) {
    const errorMessage = "missing file";
    console.error("Error in prepareProfilePic:", errorMessage);
    return handleErrorResponse(res, req, errorMessage, 500, log);
  }

  const userID = req.context.auth.id;
  const isValidMimetype = validateImgMimetype(req.file.buffer);

  if (!isValidMimetype) {
    const errorMessage = "invalid mimetype";

    console.error("Error in prepareProfilePic:", errorMessage);
    return handleErrorResponse(res, req, errorMessage, 500, log, ban);
  }

  try {
    const buffer = await sharp(req.file.buffer)
      .resize(300, 300, {
        fit: "cover",
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toBuffer();

    req.file.buffer = buffer;
    req.file.mimetype = "image/webp";

    req.file.name = `avatar_${userID}.webp`;

    next();
  } catch (err) {
    console.error("Error in prepareProfilePic:", err.message);
    return handleErrorResponse(res, req, err.message, 500, log, false);
  }
};

export default prepareProfilePic;
