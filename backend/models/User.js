const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  vaccinated: Boolean,
  age: Number,
  dose: String,
  date: String
});

module.exports = mongoose.model("User", userSchema);