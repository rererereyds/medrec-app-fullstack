import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import UsersTemplate from "./UsersTemplate";

const UsersPage = () => {
  const navigate = useNavigate();

  const navigateToAddAccount = () => {
    navigate(`/add-account`);
  };

  const navigateToActiveAccount = () => {
    navigate(`/users/active`);
  };

  const navigateToInactiveAccount = () => {
    navigate(`/users/inactive`);
  };

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeUsers, setActiveUsers] = useState([]);

  const getUsers = async () => {
    await axios
      .get(
        `https://reyda-medrec-project-api-52786e85dd45.herokuapp.com/api/v1/accounts/active`
      )
      .then((response) => {
        if (response.data.length > 0) {
          setUsers(response.data);
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

    getUsers();
    // console.log(users);

    const usersMap = users.map((user) => {
      return (
        <UsersTemplate
          key={user._id}
          id={user._id}
          image={user.image}
          lastName={user.lastName}
          firstName={user.firstName}
          middleName={user.middleName}
          suffix={user.suffix}
          department={user.department}
          position={user.position}
        />
      );
    });

    setActiveUsers(usersMap);
  }, [isLoading]);

  return (
    <div>
      <AppNavbar />

      <div className="container-fluid">
        <div className="row fill-container"></div>

        <div className="row">
          <div className="col-1 card border-0">
            <div className="dropdown show">
              <button
                className="btn btn-primary dropdown-toggle px-3"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="bi bi-check-circle mb-1"
                  viewBox="0 0 17 17"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                </svg>
                <p className="d-inline ms-2">Active</p>
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <div
                  className="dropdown-item"
                  onClick={() => navigateToActiveAccount()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="blue"
                    className="bi bi-check-circle mb-1"
                    viewBox="0 0 17 17"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                  </svg>
                  <p className="d-inline ms-2">Active</p>
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => navigateToInactiveAccount()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="blue"
                    class="bi bi-x-circle mb-1"
                    viewBox="0 0 17 17"
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                  <p className="d-inline ms-2">Inactive</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-9"></div>

          <div className="col-2 card border-0">
            <button
              className="btn btn-primary"
              onClick={() => navigateToAddAccount()}
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
              <p className="d-inline ms-2">Add New Account</p>
            </button>
          </div>
        </div>

        <div className="row">
          <div className="col-12 mt-4">
            <h2 className="title-container">Active Accounts</h2>
          </div>

          <div className="container-fluid">
            <div className="row d-flex justify-content-center">
              {activeUsers}
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

export default UsersPage;
