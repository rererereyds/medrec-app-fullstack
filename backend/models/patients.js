const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientsSchema = new Schema ({
    image: String,
    lastName: String,
    firstName: String,
    middleName: String,
    suffix: String,
    gender: String,
    birthDate: String,
    emailAddress: String,
    contactNumber: String,
    province: String,
    city: String,
    baranggay: String,
    subdivision: String,
    purok: String,
    phase: String,
    block: String,
    lot: String,
    emergencyContactLastName: String,
    emergencyContactFirstName: String,
    emergencyContactMiddleName: String,
    emergencyContactSuffix: String,
    emergencyContactRelation: String,
    emergencyContactNumber: String,
    createdAt: String,
    updatedAt: String
});

module.exports = mongoose.model("Patient", patientsSchema);