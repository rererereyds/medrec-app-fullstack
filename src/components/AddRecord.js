import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import Modal from "react-modal";

const AddRecord = () => {
  const navigate = useNavigate();

  const navigateToPatientsRecord = () => {
    navigate(`/patient-record/${id}`);
  };

  useEffect(() => {
    if (localStorage.getItem("userToken") === null) {
      navigate(`/`);
    }
  }, []);

  const { id } = useParams();
  const [record, setRecord] = useState({});
  const [accept, setAccept] = useState(false);

  const openAcceptMessage = () => {
    setAccept(true);
  };

  const closeAcceptMessage = () => {
    setAccept(false);
  };

  const customStylesForAccept = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid green",
    },
  };

  const onChange = (e) => {
    const type = e.target.name;
    switch (type) {
      case "labTest":
        setRecord({ ...record, labTest: e.target.value });
        break;
      case "result":
        setRecord({ ...record, result: e.target.value });
        break;
      case "findings":
        setRecord({ ...record, findings: e.target.value });
        break;
      case "advice":
        setRecord({ ...record, advice: e.target.value });
        break;
      default:
        break;
    }
  };

  const submitRecord = () => {
    const recordReq = {
      patient_id: id,
      labTest: record.labTest,
      result: record.result,
      findings: record.findings,
      advice: record.advice,
    };
    axios
      .post(
        `https://reyda-medrec-project-api-52786e85dd45.herokuapp.com/api/v1/patient-records/${id}`,
        recordReq
      )
      .then((response) => {
        console.log(response);
        openAcceptMessage();
      })
      .catch((error) => {
        console.log("eto" + error);
      });
  };

  return (
    <div>
      <AppNavbar />

      <div className="container-fluid">
        <div className="row fill-container"></div>

        <div className="row">
          <div className="col-1"></div>

          <div className="col-10 card shadow">
            <div className="row mt-3">
              <h2 className="add-account-title-container col-4">
                Add New Record
              </h2>
            </div>

            <div className="row d-flex justify-content-center">
              <div className="row d-flex justify-content-center mt-3">
                <div className="row">
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
                      defaultValue="Choose"
                      name="labTest"
                      onChange={onChange}
                    >
                      <option value="Choose" disabled>
                        Choose type of test
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
                      onChange={onChange}
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
                      onChange={onChange}
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
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row mt-4 mb-4">
                <div className="col-5"></div>
                <button
                  className="btn btn-primary col-2"
                  onClick={submitRecord}
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
                  <p className="d-inline ms-2">Create Record</p>
                </button>
                <div className="col-5"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <footer className="col-12 footer-container mt-5">
            <p className=" d-flex align-items-center justify-content-center mt-2 footer-text">
              © 2022 MedRec. All rights reserved.
              <br />
              EMR Software, EHR Software: Electronic Medical Record Service
            </p>
          </footer>
        </div>

        <Modal
          isOpen={accept}
          onRequestClose={closeAcceptMessage}
          style={customStylesForAccept}
          ariaHideApp={false}
        >
          <div>
            <p className="d-flex justify-content-center">Success!</p>
            <p className="d-flex justify-content-center">
              Patient profile already created.
            </p>
            <div className="d-flex justify-content-center">
              <button
                onClick={() => navigateToPatientsRecord()}
                className="btn btn-success"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-back d-inline"
                  viewBox="0 0 17 17"
                >
                  <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z" />
                </svg>
                <p className="d-inline ms-2">Go back</p>
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AddRecord;
