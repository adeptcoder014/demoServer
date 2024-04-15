const mongoose = require("mongoose");
//===================================
const userSignUpSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  password: {
    type: String,
  },

});

const User = mongoose.model("userSignUp", userSignUpSchema);

module.exports = User;


