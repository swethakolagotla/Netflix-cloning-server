const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordChangedAt: {
      type: Date,
      default: Date.now(),
    },
    profilepic: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//pre middleware for hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

//instance for verify Password
UserSchema.methods.verifyPassword = async function (
  userPassword,
  encryptedPassword
) {
  return await bcrypt.compare(userPassword, encryptedPassword);
};

//instance for invalidateTokens:
UserSchema.methods.invalidateTokens = function (tokeniat) {
  if (this.passwordChangedAt) {
    const tokenTimeStamp = new Date(tokeniat * 1000);
    return this.passwordChangedAt > tokenTimeStamp;
  }
  return false;
};

const User = mongoose.model("user", UserSchema, "users");

module.exports = User;
