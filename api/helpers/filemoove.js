const path = require("path");
const fs = require("fs-extra");
require("dotenv").config();

const IMG_DIR = "api/public/images";

const movedFile = async (req, res, next) => {
  try {
    if (req.file) {
      await fs.move(req.file.path, path.join(IMG_DIR, req.file.filename));
      console.log(req.file, "IMAGE MOOVED");
    }
  } catch (error) {
    console.log(error);
  }
  next();
};

module.exports = movedFile;
