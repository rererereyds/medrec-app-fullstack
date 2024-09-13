import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import Modal from "react-modal";

const LogIn = () => {
  const [accountUserName, setUserName] = useState("");
  const [accountPassword, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginDetails = {
      accountUserName: accountUserName,
      accountPassword: accountPassword,
    };

    axios
      .post(
        `/api/v1/accounts/login`,
        loginDetails
      )
      .then((response) => {
        localStorage.setItem("userToken", response.data.token);
        setLogin(true);
        navigate(`/home`);
        console.log("current user: " + localStorage.getItem("userToken"));
      })
      .catch((error) => {
        console.log(error);
        openErrorMessage();
      });
  };

  const openErrorMessage = () => {
    setError(true);
  };

  const closeErrorMessage = () => {
    setError(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid blue",
    },
  };

  const slideImages = [
    {
      url: "https://www.virtru.com/hubfs/Imported_Blog_Media/electronic-medical-record.jpg",
      caption: "Slide 1",
    },
    {
      url: "http://cdivisalia.com/wp-content/uploads/2019/02/nurse-typing-at-computer2.jpg",
      caption: "Slide 2",
    },
    {
      url: "https://www.cio.com/wp-content/uploads/2021/12/medical_data_status_tracking_electronic_health_records_ehr_by_metamorworks_gettyimages_1200x800-100760924-orig.jpg?quality=50&strip=all&w=1024",
      caption: "Slide 3",
    },
  ];

  return (
    <div>
      <div className="d-flex align-items-center">
        <div className="col-sm-8 container ms-5">
          <div className="slide-container">
            <Slide>
              {slideImages.map((slideImage, index) => (
                <div className="each-slide" key={index}>
                  <img key={index} src={slideImage.url} className="images" />
                </div>
              ))}
            </Slide>
          </div>
        </div>

        <div className="col-sm-3 container me-5">
          <div className="p-5 shadow-sm border rounded-3 mt-4 container">
            <img
              src={require("../images/MedRec-login.png")}
              alt="logo and name"
            />
            <h2 className="text-center mt-3 mb-4 text-primary">Log In</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control border border-primary"
                  id="exampleInputEmail1"
                  autoComplete="off"
                  value={accountUserName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control border border-primary"
                  id="exampleInputPassword1"
                  value={accountPassword}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="d-grid">
                <button
                  className="btn btn-primary"
                  type="submit"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  Login
                </button>
              </div>
            </form>

            {login ? (
              <p>Redirecting to your account.</p>
            ) : (
              <div className="row mt-5 mb-5">
                Please input correct username and password.
              </div>
            )}
          </div>
        </div>

        <Modal
          isOpen={error}
          onRequestClose={closeErrorMessage}
          style={customStyles}
          ariaHideApp={false}
        >
          <div>
            <p className="d-flex justify-content-center">
              Oops! Cannot log in.
            </p>
            <p className="d-flex justify-content-center">
              Wrong username or password.
            </p>
            <div className="d-flex justify-content-center">
              <button onClick={closeErrorMessage} className="btn btn-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-arrow-repeat d-inline"
                  viewBox="0 0 17 17"
                >
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                  <path
                    fillRule="evenodd"
                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                  />
                </svg>
                <p className="d-inline ms-2">Try Again</p>
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default LogIn;
