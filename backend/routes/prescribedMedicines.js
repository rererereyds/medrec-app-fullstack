const express = require("express");
const router = express.Router();

const PrescribedMedicine = require("../models/prescribedMedicines");

router.get("/", (request, response) => {
    PrescribedMedicine.find().then((data) => {
    response.send(data);
  });
});


router.post("/:id", async (request, response) => {
  try {
    const date = new Date().toLocaleString();

    const newPrescribedMedicine = new PrescribedMedicine(request.body);
    newPrescribedMedicine.createdAt = date;

    await newPrescribedMedicine.save().then((medicine) => {
      if (medicine._id) {
        response.status(201).send({medicine: medicine, message: "Prescribed medicine record created."});
      } else {
        response.status(400).send({error: "Prescribed medicine record failed."});
      }
    });
  } catch (exception) {
    response.status(400).send({error: exception.message});
  }
});

module.exports = router;