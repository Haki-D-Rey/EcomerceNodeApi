const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requiered: true,
      unique: true,
    },
    email: {
      type: String,
      requiered: true,
      unique: true,
    },
    password: {
      type: String,
      requiered: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    firstname: {
      type: String,
      requiered: true,
    },
    lastname: {
      type: String,
      requiered: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
