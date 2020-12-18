const dotenv = require("dotenv");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const { v4: uuidv4 } = require("uuid");
const UsersModel = require("../users/users.model");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendVerificationEmail(user) {
  const verificationToken = uuidv4();
  await UsersModel.findByVerificationToken(user._id, verificationToken);

  const msg = {
    to: user.email,
    from: process.env.EMAIL_USER, // Use the email address or domain you verified above
    subject: "Sending with Twilio SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `<a href = "http://localhost:3000/users/verify/${verificationToken}"> Click here </a>`,
  };

  //ES8
  const sendEmail = async () => {
    try {
      await sgMail.send(msg);
      console.log("Send mail");
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  };
  await sendEmail();
  console.log(msg.html);
}

module.exports = sendVerificationEmail;
