/* eslint-disable node/no-missing-require */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
const dotenv = require("dotenv").config();

console.log(process.env.TWILIO_AUTH_TOKEN);

const sendSms = async (options) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;

  // eslint-disable-next-line global-require
  // eslint-disable-next-line import/no-unresolved
  const client = require("twilio")(accountSid, authToken);

  client.messages
    .create({
      body: options.body,
      from: "+19593011579",
      to: options.to,
    })
    .then((message) => console.log(message.sid));
};
module.exports = sendSms;
