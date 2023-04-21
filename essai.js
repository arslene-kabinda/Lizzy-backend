const sendMail = require("./utils/Email");

sendMail({
  to: "mardoxheeLuviki@gmail.com",
  subject: "blablablbablla",
  html: "<p>bmablabioevperq</p>",
});

// console.log("try:", process.env.SENDGRID_API_KEY);
