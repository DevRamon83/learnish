import multer from "multer";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
}).single("profilePic");

const parseProfilePic = (req, res, next) => {
  try {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: `Pic error: ${err.message}` });
      }

      return next();
    });
  } catch (globalErr) {
    return res.status(500).json({ error: globalErr.message });
  }
};

export default parseProfilePic;
