const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescribedMedicinesSchema = new Schema ({
  patient_id: String,
  medicalRecord_id: String,
  medicineName: String,
  form: String,
  dosage: String,
  frequency: String,
  interval: String,
  createdAt: String
});

module.exports = mongoose.model("PrescribedMedicine", prescribedMedicinesSchema);