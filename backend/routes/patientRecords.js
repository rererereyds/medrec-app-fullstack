const express = require("express");
const router = express.Router();

const PatientRecord = require("../models/patientRecords");

router.get("/", (request, response) => {
  PatientRecord.find().then((data) => {
    response.send(data);
  });
});


router.post("/:id", async (request, response) => {
  try {
    const date = new Date().toLocaleString();

    const newPatientRecord = new PatientRecord(request.body);
    newPatientRecord.createdAt = date;

    await newPatientRecord.save().then((record) => {
      if (record._id) {
        response.status(201).send({record: record, message: "Record created."});
      } else {
        response.status(400).send({error: "Record failed."});
      }
    });
  } catch (exception) {
    response.status(400).send({error: exception.message});
  }
});

module.exports = router;