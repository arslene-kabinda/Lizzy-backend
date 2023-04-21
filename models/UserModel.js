const crypto = require("crypto");

const mongoose = require("mongoose");

const validator = require("validator");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  lastName: {
    type: String,
    // required: [true, "an account must have a lastName"],
  },
  firstName: {
    type: String,
    // required: [true, "an account must have a firstName"],
  },
  email: {
    type: String,
    // required: [true, "please provide your email "],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "please provide a valid mail"],
  },
  phone: {
    type: String,
    unique: true,
    // required: [true, "An account has to have a phone number"],
    validate: [validator.isMobilePhone, "please provide a good phone number"],
  },
  role: {
    type: String,
    enum: ["user", "admin", "hair_salon_owner", "beauty_salon_owner"],
    default: "user",
  },
  password: {
    type: String,
    // required: [true, "an account must have a password"],
    minlength: [8, "a minimum of 10 characters"],
    select: false,
  },

  passwordConfirm: {
    type: String,
    // required: [true, "please confirm "],
    select: false,
    validate: {
      //this only work on create and  save
      validator: function (el) {
        return el === this.password;
      },
      message: "password are not the same",
    },
  },
  avatar: {
    type: String,
    // required: [false, "optional"],
  },
  cloudinary_id: {
    type: String,
  },

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  beautySalon: { type: mongoose.Schema.Types.ObjectId, ref: "BeautySalon" },
  hairSalon: { type: mongoose.Schema.Types.ObjectId, ref: "HairSalon" },
});
userSchema.pre("save", async function (next) {
  // will be runned if password was actually modified
  if (!this.isModified("password")) return next();
  // //   password hash function
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimestamp);
    return JWTTimestamp < changedTimestamp;
  }
  //false means not changed
  return false;
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

//declaration du model
const User = mongoose.model("User", userSchema);
module.exports = User;
