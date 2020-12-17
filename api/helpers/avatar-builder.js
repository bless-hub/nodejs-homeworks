const Avatar = require("avatar-builder");
const path = require("path");
const fs = require("fs-extra");

const IMG_DIR = path.join(process.cwd(), "api", "public", "images", "/");

const avatar = Avatar.male8bitBuilder(128);

const randomAvatar = async (user) => {
  try {
    await avatar.create(user._id).then((tmp) => {
      const avatarFileName = `${user._id}.png`;
      fs.writeFileSync(`tmp/${avatarFileName}`, tmp);
      fs.move(`tmp/${user._id}.png`, path.join(IMG_DIR, avatarFileName));
      console.log("moove img");
    });
  } catch (error) {
    console.log("netusera");
    return;
  }
};

module.exports = randomAvatar;
