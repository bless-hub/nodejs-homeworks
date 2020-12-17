const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

const path = require("path");
const fs = require("fs-extra");

const MIN_DIR = "tmp";
const IMG_DIR = "api/public/images";

//no using

async function minifyImages(req, res, next) {
  console.log(MIN_DIR);
  console.log(req.file);
  await imagemin([req.file.path], {
    destination: IMG_DIR,
    plugins: [
      imageminJpegtran(),
      imageminPngquant({
        quality: [0.6, 0.8],
      }),
    ],
  });

  next();
}

module.exports = minifyImages;
