import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppNavbar from "./AppNavbar";

const HomePage = () => {
  const [fullName, setFullName] = useState("");
  const [firstName, setFisrtName] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userToken") === null) {
      navigate(`/`);
    }

    axios
      .post(
        `https://reyda-medrec-project-api-52786e85dd45.herokuapp.com/api/v1/accounts/auth-user`,
        { token: localStorage.getItem("userToken") }
      )
      .then((response) => {
        console.log(response);
        if (response.data.user.firstName) {
          setFisrtName(response.data.user.firstName);
        }
        if (response.data.user.firstName && response.data.user.lastName) {
          setFullName(
            response.data.user.firstName + " " + response.data.user.lastName
          );
        }
        if (response.data.user.firstName && !response.data.user.lastName) {
          setFullName(response.data.user.firstName);
        }
        if (!response.data.user.firstName && response.data.user.lastName) {
          setFullName(response.data.user.lastName);
        }
        if (!response.data.user.firstName && !response.data.user.lastName) {
          setFullName("");
        }
        if (response.data.user.department) {
          setDepartment(response.data.user.department);
        }
        if (response.data.user.position) {
          setPosition(response.data.user.position);
        }
        // if (response.data.user.startedWorkDate.month && response.data.user.startedWorkDate.day && response.data.user.startedWorkDate.year) {
        //   setStartDate(response.data.user.startedWorkDate.month + " " + response.data.user.startedWorkDate.day + " " + response.data.user.startedWorkDate.year);
        // }
        if (response.data.user.image) {
          setImage(response.data.user.image);
        }
      });
  }, []);

  let today = new Date().toLocaleDateString();

  let time = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(time);

  const updateTime = () => {
    time = new Date().toLocaleTimeString();
    setCurrentTime(time);
  };

  setInterval(updateTime, 1000);

  return (
    <div>
      <AppNavbar />

      <div className="container-fluid">
        <div className="row fill-container"></div>

        <div className="row">
          <div className="card col-xl-2 align-self-center shadow ms-5 card-container">
            <div className="card-body jumbotron">
              <h2 className="card-text mt-4">PROFILE</h2>
            </div>
            <img className="card-img-top mt-2" src={image} alt="user image" />
            <div className="card-body">
              <p className="card-text">{fullName}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{department}</li>
              <li className="list-group-item mb-5">{position}</li>
            </ul>
          </div>

          <div className="col-xl-9 card shadow ms-3">
            <div className="row">
              <div className="container-fluid p-2 time-date-container">
                <h1 className="time-date-style d-inline me-5">{today}</h1>
                <h1 className="time-date-style d-inline">{currentTime}</h1>
              </div>

              <div className="row mt-3">
                <div className="col-8 ms-5 card d-inline">Graphs here.</div>

                <div className="col-3 ms-3 card d-inline reminder-container">
                  <div>
                    <div className="mt-3">
                      <h5>Reminders</h5>
                    </div>
                    <div className="reminder-1 me-1">
                      <div className="container-fluid d-flex justify-content-center align-items-center mt-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="35"
                          fill="blue"
                          class="bi bi-keyboard-fill d-inline col-3 mb-3 me-2"
                          viewBox="0 0 17 17"
                        >
                          <path d="M14 5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h12zM2 4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H2z" />
                          <path d="M13 10.25a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm0-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5 0A.25.25 0 0 1 8.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 8 8.75v-.5zm2 0a.25.25 0 0 1 .25-.25h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5a.25.25 0 0 1-.25-.25v-.5zm1 2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-5-2A.25.25 0 0 1 6.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 6 8.75v-.5zm-2 0A.25.25 0 0 1 4.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 4 8.75v-.5zm-2 0A.25.25 0 0 1 2.25 8h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 2 8.75v-.5zm11-2a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm-2 0A.25.25 0 0 1 9.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 9 6.75v-.5zm-2 0A.25.25 0 0 1 7.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 7 6.75v-.5zm-2 0A.25.25 0 0 1 5.25 6h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5A.25.25 0 0 1 5 6.75v-.5zm-3 0A.25.25 0 0 1 2.25 6h1.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-1.5A.25.25 0 0 1 2 6.75v-.5zm0 4a.25.25 0 0 1 .25-.25h.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-.5a.25.25 0 0 1-.25-.25v-.5zm2 0a.25.25 0 0 1 .25-.25h5.5a.25.25 0 0 1 .25.25v.5a.25.25 0 0 1-.25.25h-5.5a.25.25 0 0 1-.25-.25v-.5z" />
                        </svg>
                        <p className="d-inline reminder-text">
                          Double check information before submitting new
                          accounts or records.
                        </p>
                      </div>
                    </div>
                    <div className="reminder-2 me-1">
                      <div className="container-fluid d-flex justify-content-center align-items-center mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="35"
                          fill="blue"
                          class="bi bi-lock d-inline col-3 mb-3 me-2"
                          viewBox="0 0 17 17"
                        >
                          <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                        </svg>
                        <p className="d-inline reminder-text">
                          Do not let anyone use your account to avoid data
                          breach.
                        </p>
                      </div>
                    </div>
                    <div className="reminder-3 me-1">
                      <div className="container-fluid d-flex justify-content-center align-items-center mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="35"
                          fill="blue"
                          class="bi bi-box-arrow-right d-inline col-3 mb-3 me-2"
                          viewBox="0 0 17 17"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                          />
                        </svg>
                        <p className="d-inline reminder-text">
                          Log out account after working hours or while taking
                          breaks.
                        </p>
                      </div>
                    </div>
                    <div className="reminder-4 me-1">
                      <div className="container-fluid d-flex justify-content-center align-items-center mt-2">
                        <p className="compliance-text">
                          These reminders are for the compliance to Joint
                          Administrative Order No. 2016-002 entitled "Privacy
                          Guidelines for the Implementation of the Philippine
                          Health Information Exchange"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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

export default HomePage;
