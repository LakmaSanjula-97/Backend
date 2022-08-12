const mongoose = require("mongoose");

const UserModel = new mongoose.Schema({
  firstName: { type: String, required: false, trim: true },
  lastName: { type: String, required: false, trim: true },
  email: { type: String, required: false, trim: true },
  dateOfBirth: { type: String, required: false, trim: true },
  mobile: { type: Number, required: false },
  status: { type: Boolean, required: false },
  password: { type: String, required: false, trim: true },
  accountType: { type: String, trim: true },
});

module.exports = mongoose.model("users", UserModel);
