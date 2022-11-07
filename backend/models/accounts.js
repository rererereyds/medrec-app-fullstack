const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountsSchema = new Schema ({
  image: String,
  lastName: String,
  firstName: String,
  middleName: String,
  suffix: String,
  gender: String,
  birthDate: String,
  emailAddress: String,
  contactNumber: String,
  department: String,
  position: String,
  startedWorkDate: String,
  accountUserName: { type: String, unique: true},
  accountPassword: String,
  status: String,
  createdAt: String,
  updatedAt: String,
});

module.exports = mongoose.model("Account", accountsSchema);