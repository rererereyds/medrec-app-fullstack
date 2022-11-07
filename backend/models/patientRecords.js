const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientRecordsSchema = new Schema ({
  patient_id: String,
  labTest: String,
  result: String,
  findings: String,
  advice: String,
  createdAt: String
});

module.exports = mongoose.model("PatientRecord", patientRecordsSchema);