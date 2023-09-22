const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    password: String,
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
