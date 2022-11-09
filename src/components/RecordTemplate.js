import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PrescribedMedicinesTemplate from "./PrescribedMedicinesTemplate";

const RecordTemplate = ({
  medicalRecord_id,
  patient_id,
  labTest,
  result,
  findings,
  advice,
  createdAt,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userToken") === null) {
      navigate(`/`);
    }
  }, []);

  const { id } = useParams();
  const [showAddMedicine, setShowAddMedicine] = useState(false);
  const [prescribedMedicine, setPrescribedMedicine] = useState({});

  ///THIS IS FOR GETTING THE LIST OF PRESCRIBED MEDICINES
  const [prescribedMedicineList, setPrescribedMedicineList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [existingPrescribedMedicines, setExistingPrecribedMedicines] = useState(
    []
  );

  const refreshPage = () => {
    window.location.reload();
  };

  const onChange = (e) => {
    const type = e.target.name;

    switch (type) {
      case "medicineName":
        setPrescribedMedicine({
          ...prescribedMedicine,
          medicineName: e.target.value,
        });
        break;
      case "form":
        setPrescribedMedicine({ ...prescribedMedicine, form: e.target.value });
        break;
      case "dosage":
        setPrescribedMedicine({
          ...prescribedMedicine,
          dosage: e.target.value,
        });
        break;
      case "frequency":
        setPrescribedMedicine({
          ...prescribedMedicine,
          frequency: e.target.value,
        });
        break;
      case "interval":
        setPrescribedMedicine({
          ...prescribedMedicine,
          interval: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  const submitPrescribedMedicine = () => {
    const prescribedMedicineReq = {
      patient_id: patient_id,
      medicalRecord_id: medicalRecord_id,
      medicineName: prescribedMedicine.medicineName,
      form: prescribedMedicine.form,
      dosage: prescribedMedicine.dosage,
      frequency: prescribedMedicine.frequency,
      interval: prescribedMedicine.interval,
    };
    axios
      .post(
        `https://reyda-medrec-project-api.herokuapp.com/api/v1/prescribed-medicine/${id}`,
        prescribedMedicineReq
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("eto" + error);
      });
  };

  ///THIS IS FOR GETTING THE LIST OF PRESCRIBED MEDICINES
  const getPrescribedMedicines = async () => {
    await axios
      .get(
        `https://reyda-medrec-project-api.herokuapp.com/api/v1/prescribed-medicine`
      )
      .then((response) => {
        if (response.data.length > 0) {
          setPrescribedMedicineList(response.data);
        }
      });
  };

  useEffect(() => {
    if (localStorage.getItem("userToken") === null) {
      navigate(`/`);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    getPrescribedMedicines();

    const prescribedMedicineListMap = prescribedMedicineList.map((predMed) => {
      if (
        predMed.patient_id === id &&
        predMed.medicalRecord_id === medicalRecord_id
      ) {
        return (
          <PrescribedMedicinesTemplate
            key={predMed._id}
            id={predMed._id}
            patient_id={predMed.patient_id}
            medicalRecord_id={predMed.medicalRecord_id}
            medicineName={predMed.medicineName}
            form={predMed.form}
            dosage={predMed.dosage}
            frequency={predMed.frequency}
            interval={predMed.interval}
            createdAt={predMed.createdAt}
          />
        );
      }
    });

    setExistingPrecribedMedicines(prescribedMedicineListMap);
  }, [isLoading]);

  return (
    <div className="container-fluid">
      <div className="row mt-4 mb-4">
        <div className="card">
          <div className="row mt-2">
            <h5 className="border-bottom pb-1 d-flex justify-content-start">
              Test Information
            </h5>
          </div>

          <div className="row">
            <div className="form-group col-12">
              <label className="d-flex justify-content-start mt-3 mb-1">
                Type of Test:
              </label>
              <select
                className="form-select"
                aria-label="Default select example"
                autoComplete="off"
                value={labTest}
                name="labTest"
                disabled
                readOnly
              >
                <option value={labTest} disabled>
                  {labTest}
                </option>
                <option value="Biopsy">Biopsy</option>
                <option value="Colonoscopy">Colonoscopy</option>
                <option value="Complete Blood Count (CBC)">
                  Complete Blood Count (CBC)
                </option>
                <option value="CT scan">CT scan</option>
                <option value="Electrocardiogram (ECG)">
                  Electrocardiogram (ECG)
                </option>
                <option value="Electroencephalogram (EEG)">
                  Electroencephalogram (EEG)
                </option>
                <option value="Eye Test">Eye Test</option>
                <option value="Gastroscopy">Gastroscopy</option>
                <option value="Hearing Test">Hearing Test</option>
                <option value="PET scan">PET scan</option>
                <option value="Ultrasound">Ultrasound</option>
                <option value="Urinalysis">Urinalysis</option>
                <option value="X-rays">X-rays</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="form-group col-12">
              <label className="d-flex justify-content-start mt-3 mb-1">
                Result:
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Input test result"
                autoComplete="off"
                name="result"
                value={result}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-12">
              <label className="d-flex justify-content-start mt-3 mb-1">
                Findings:
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Input findings"
                autoComplete="off"
                name="findings"
                value={findings}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="row">
            <div className="form-group col-12">
              <label className="d-flex justify-content-start mt-3 mb-1">
                Advice:
              </label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Input advice"
                autoComplete="off"
                name="advice"
                value={advice}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="row mb-3 mt-3">
            <div className="form-group col-8 d-flex justify-content-start">
              <p className="text-muted account-info-text fw-lighter">
                Record created at: {createdAt}
              </p>
            </div>
            <div
              className="col-4 card border-0"
              onClick={() => setShowAddMedicine(!showAddMedicine)}
            >
              <button className="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="bi bi-plus-square d-inline mb-1"
                  viewBox="0 0 17 17"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <p className="d-inline ms-2">Add Prescribed Medicines</p>
              </button>
            </div>
            {showAddMedicine ? (
              <div className="row d-flex justify-content-center mt-3">
                <div className="row">
                  <h5 className="border-bottom pb-1 d-flex justify-content-start">
                    Prescribed Medicine
                  </h5>
                </div>

                <div className="row">
                  <div className="form-group col-12">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Medicine Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Input medicine name"
                      autoComplete="off"
                      name="medicineName"
                      onChange={onChange}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col-3">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Form:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Input medicine form"
                      autoComplete="off"
                      name="form"
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group col-3">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Dosage:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Input dosage"
                      autoComplete="off"
                      name="dosage"
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group col-3">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Frequency:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Input frequency"
                      autoComplete="off"
                      name="frequency"
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group col-3">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Interval:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Input interval"
                      autoComplete="off"
                      name="interval"
                      onChange={onChange}
                    />
                  </div>

                  <div className="row mt-4 mb-2">
                    <div className="col-4"></div>
                    <button
                      className="btn btn-primary col-4"
                      onClick={() => {
                        submitPrescribedMedicine();
                        refreshPage();
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="white"
                        className="bi bi-file-earmark-plus d-inline mb-1"
                        viewBox="0 0 17 17"
                      >
                        <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z" />
                        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z" />
                      </svg>
                      <p className="d-inline ms-2">Create Prescription</p>
                    </button>
                    <div className="col-4"></div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            <div>
              {medicalRecord_id.length > 0 && (
                <div className="row d-flex justify-content-center mt-3">
                  <div className="row">
                    <h5 className="border-bottom pb-1 d-flex justify-content-start">
                      Prescribed Medicines
                    </h5>
                    <div>{existingPrescribedMedicines}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordTemplate;
