import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import axios from "axios";
import { useEffect, useState } from 'react';
import RecordTemplate from './RecordTemplate';

const PatientRecord = () => {

  const navigate = useNavigate();

  const navigateToAddRecord = () => {
    navigate(`/add-record/${id}`);
  };

  const { id } = useParams();
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [existingMedicalRecords, setExistingMedicalRecords] = useState([]);


  useEffect(() => {
    if (localStorage.getItem("userToken") === null) {
      navigate(`/`);
    }

    axios.get(`https://reyda-medrec-project-api.herokuapp.com/api/v1/patients/show-patient/${id}`).then((response) => {
      if (response.data.firstName && response.data.lastName) {
        setFullName(response.data.firstName + " " + response.data.lastName);
      }
      if (response.data.firstName && !response.data.lastName) {
        setFullName(response.data.firstName);
      }
      if (!response.data.firstName && response.data.lastName) {
        setFullName(response.data.lastName);
      }
      if (!response.data.firstName && !response.data.lastName) {
        setFullName("");
      }
      if (response.data.firstName) {
        setFirstName(response.data.firstName);
      }
      if (response.data.image) {
        setImage(response.data.image);
      }
      if (response.data.gender) {
        setGender(response.data.gender);
      }
      if (response.data.birthDate) {
        setBirthDate(response.data.birthDate);
      }
    });
  }, []);

  const getMedicalRecords = async () => {
    await axios.get(`https://reyda-medrec-project-api.herokuapp.com/api/v1/patient-records`).then((response) => {
      if (response.data.length > 0) {
        setMedicalRecords(response.data);
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

    getMedicalRecords();

    const medicalRecordsMap = medicalRecords.map((medicalRecord) => {
      if (medicalRecord.patient_id === id) {
        return <RecordTemplate
          key = {medicalRecord._id}
          medicalRecord_id = {medicalRecord._id}
          patient_id = {medicalRecord.patient_id}
          labTest = {medicalRecord.labTest}
          result = {medicalRecord.result}
          findings = {medicalRecord.findings}
          advice = {medicalRecord.advice}
          createdAt = {medicalRecord.createdAt}
        />
      }
    });

    setExistingMedicalRecords(medicalRecordsMap);

  }, [isLoading]);

  return (
    <div>

      <AppNavbar/>
        
      <div className='container-fluid'>

        <div className='row fill-container'></div>

        <div className='row'>

          <div className='row'>
            <div className='col-2 me-5'></div>
            <div className='col-7 me-2 d-flex align-items-center justify-content-start'>
              <h4>You are viewing {firstName}'s medical record. </h4>
            </div>
            <button className='btn btn-primary col-2' onClick={() => navigateToAddRecord()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-plus-square d-inline mb-1" viewBox="0 0 17 17">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
              </svg>
              <p className='d-inline ms-2'>Add New Record</p>
            </button>
          </div>

          <div className='row'>
            <div className='col-2 ms-5'>
              <div className='card d-flex justify-content-start shadow mt-3 px-2 card-container'>
                <div className="card-body jumbotron">
                  <h4 className='mt-2'>PROFILE</h4>
                </div>
                <img className="card-img-top mt-2" src={image} alt="user image"/>
                <div className="card-body d-flex justify-content-center">
                  <p className="card-text">{fullName}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{birthDate}</li>
                  <li className="list-group-item mb-4">{gender}</li>
                </ul>
              </div>
            </div>

            <div className='col-9 ms-2 mt-3 card shadow'>
              {existingMedicalRecords}
            </div>
              
          </div>
        </div>


        <div className='row'>    
          <footer className='col-12 footer-container mt-5'>
            <p className=' d-flex align-items-center justify-content-center mt-2 footer-text'>
              © 2022 MedRec. All rights reserved.
              <br/>
              EMR Software, EHR Software: Electronic Medical Record Service
            </p>
          </footer>
        </div>
                    
      </div>

    </div>
  )
}

export default PatientRecord