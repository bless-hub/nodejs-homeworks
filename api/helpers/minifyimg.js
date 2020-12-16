const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const path = require("path");

const MIN_DIR = "tmp";

async function minifyImages(req, res, next) {
  await imagemin([req.file.path], {
    destination: MIN_DIR,
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });

  const { filename } = req.file;

  req.file = {
    ...req.file,
    path: path.join(MIN_DIR, filename),
    destination: MIN_DIR,
  };
  console.log(filename);
  next();
}

module.exports = minifyImages;
