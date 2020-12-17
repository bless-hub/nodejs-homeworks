const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const path = require("path");
const fs = require("fs-extra");
const { deepStrictEqual } = require("assert");

const MIN_DIR = "tmp";
const IMG_DIR = "api/public/images";

async function minifyImages(req, res, next) {
  console.log(req.file.path);
  console.log(req.file);
  await imagemin([req.file.filename], {
    destination: MIN_DIR,
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });

  console.log(req.file);
  if (req.file) {
    await fs.move(req.file.path, path.join(IMG_DIR, req.file.filename));
  }

  next();
}

module.exports = minifyImages;
