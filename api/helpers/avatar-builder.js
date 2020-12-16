const Avatar = require("avatar-builder");
const fs = require("fs");

const avatar = Avatar.builder(
  Avatar.Image.margin(Avatar.Image.circleMask(Avatar.Image.identicon())),
  128,
  128,
  { cache: Avatar.Cache.lru() }
);
avatar
  .create("gabriel")
  .then((buffer) => fs.writeFileSync(`tmp/${Date.now()}.png`, buffer));

module.exports = avatar;
