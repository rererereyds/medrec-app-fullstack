import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import PatientsTemplate from "./PatientsTemplate";

const PatientsPage = () => {
  const navigate = useNavigate();

  const navigateToAddPatient = () => {
    navigate(`/add-patient`);
  };

  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [existingPatients, setExistingPatients] = useState([]);

  const getPatients = async () => {
    await axios
      .get(`https://reyda-medrec-project-api-52786e85dd45.herokuapp.com/api/v1/patients`)
      .then((response) => {
        if (response.data.length > 0) {
          setPatients(response.data);
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

    getPatients();

    const patientsMap = patients.map((patient) => {
      return (
        <PatientsTemplate
          key={patient._id}
          id={patient._id}
          image={patient.image}
          lastName={patient.lastName}
          firstName={patient.firstName}
          middleName={patient.middleName}
          suffix={patient.suffix}
          gender={patient.gender}
          birthDate={patient.birthDate}
        />
      );
    });

    setExistingPatients(patientsMap);
  }, [isLoading]);

  return (
    <div>
      <AppNavbar />

      <div className="container-fluid">
        <div className="row fill-container"></div>

        <div className="row">
          <div className="row">
            <div className="col-10"></div>
            <div className="col-2 card border-0">
              <button
                className="btn btn-primary"
                onClick={() => navigateToAddPatient()}
              >
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
                <p className="d-inline ms-2">Add New Patient</p>
              </button>
            </div>
          </div>

          <div className="row">{existingPatients}</div>

          <footer className="col-12 footer-container mt-5">
            <p className=" d-flex align-items-center justify-content-center mt-2 footer-text">
              © 2022 MedRec. All rights reserved.
              <br />
              EMR Software, EHR Software: Electronic Medical Record Service
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PatientsPage;
