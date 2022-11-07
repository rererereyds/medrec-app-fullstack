const express = require("express");
const router = express.Router();

const Patient = require("../models/patients");

router.get("/", (request, response) => {
  Patient.find().then((data) => {
    response.send(data);
  });
});

router.get("/show-patient/:id", (request, response) => {
  Patient.findOne({ _id: request.params.id }).then((data) => {
    response.send(data);
  });
});

router.post("/", async (request, response) => {
  try {
    await _validateNewPatient(request);

    const date = new Date().toLocaleString();

    const newPatient = new Patient(request.body);
    newPatient.createdAt = date;

    await newPatient.save().then((patient) => {
      if (patient._id) {
        response.status(201).send({patient: patient, message: "Account Registered"});
      } else {
        response.status(400).send({error: "Request failed."});
      }
    });
  } catch (exception) {
    response.status(400).send({error: exception.message});
  }
});

router.put("/edit-record/:id", (request, response) => {
  let error = new Error('RecordUpdateException');
  error.message = 'Error in updating record';

  try {
    const date = new Date().toLocaleString();
    request.body.updatedAt = date;

    Patient.updateOne({ _id: request.params.id }, [{ $set: request.body}]).then((data) => {
      console.log(data);
      if (data.modifiedCount > 0) {
        response.status(201).send({message: "Account Updated"});
      } else {
        throw error;
      }
    });
  } catch (exception) {
    response.status(400).send({error: exception.message});
  }
});

/**
 * This function validates user if already existing
 * @param {Object} request 
 * @throws {Error} User already exist
 */
 const _validateNewPatient = async (request) => {
  await Patient.findOne({
    lastName: request.body.lastName,
    firstName: request.body.firstName,
    middleName: request.body.middleName,
    suffix: request.body.suffix,
    birthDate: request.body.birthDate,
  }).then((data) => {
    if (data !== null) {
      const error = new Error('UserRegistrationException');
      error.message = 'User already exist';
      throw error;
    }
  });
};

module.exports = router;