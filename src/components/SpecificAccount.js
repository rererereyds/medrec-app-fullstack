import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AppNavbar from "./AppNavbar";
import Modal from "react-modal";

const SpecificAccount = () => {
  const navigate = useNavigate();

  const navigateToInactiveAccount = () => {
    navigate(`/users/inactive`);
  };

  const navigateToActiveAccount = () => {
    navigate(`/users/active`);
  };

  const { id } = useParams();
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState({});
  const [inactivateAccount, setInactivateAccount] = useState(false);
  const [updateAccount, setUpdatedAccount] = useState(false);

  const openInactivateAccountMessage = () => {
    setInactivateAccount(true);
  };

  const closeInactivateAccountMessage = () => {
    setInactivateAccount(false);
  };

  const openUpdatedAccountMessage = () => {
    setUpdatedAccount(true);
  };

  const closeUpdatedAccountMessage = () => {
    setUpdatedAccount(false);
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

  const onChange = (e) => {
    const type = e.target.name;

    switch (type) {
      case "image":
        setUser({ ...user, image: e.target.value });
        break;
      case "lastName":
        setUser({ ...user, lastName: e.target.value });
        break;
      case "firstName":
        setUser({ ...user, firstName: e.target.value });
        break;
      case "middleName":
        setUser({ ...user, middleName: e.target.value });
        break;
      case "suffix":
        setUser({ ...user, suffix: e.target.value });
        break;
      case "gender":
        setUser({ ...user, gender: e.target.value });
        break;
      case "birthDate":
        setUser({ ...user, birthDate: e.target.value });
        break;
      case "emailAddress":
        setUser({ ...user, emailAddress: e.target.value });
        break;
      case "contactNumber":
        setUser({ ...user, contactNumber: e.target.value });
        break;
      case "department":
        setUser({ ...user, department: e.target.value });
        break;
      case "position":
        setUser({ ...user, position: e.target.value });
        break;
      case "startedWorkDate":
        setUser({ ...user, startedWorkDate: e.target.value });
        break;
      case "status":
        setUser({ ...user, status: e.target.value });
        break;
      case "createdAt":
        setUser({ ...user, createdAt: e.target.value });
        break;
      case "updatedAt":
        setUser({ ...user, updatedAt: e.target.value });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userToken") === null) {
      navigate(`/`);
    }

    axios
      .get(
        `https://reyda-medrec-project-api.herokuapp.com/api/v1/accounts/show-account/${id}`
      )
      .then((response) => {
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
        if (response.data.department) {
          setDepartment(response.data.department);
        }
        if (response.data.position) {
          setPosition(response.data.position);
        }
        if (response.data.image) {
          setImage(response.data.image);
        }
        if (response.data) {
          setUser(response.data);
        }
      });
  }, []);

  const saveUpdate = () => {
    const userReq = {
      image: user.image,
      lastName: user.lastName,
      firstName: user.firstName,
      middleName: user.middleName,
      suffix: user.suffix,
      gender: user.gender,
      birthDate: user.birthDate,
      emailAddress: user.emailAddress,
      contactNumber: user.contactNumber,
      department: user.department,
      position: user.position,
      startedWorkDate: user.startedWorkDate,
      status: user.status,
    };
    axios
      .put(
        `https://reyda-medrec-project-api.herokuapp.com/api/v1/accounts/edit-account/${id}`,
        userReq
      )
      .then((response) => {
        if (response.status == "201") {
          navigateToActiveAccount();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const inactivateUser = () => {
    const userStatus = {
      status: "inactive",
    };

    axios
      .put(
        `https://reyda-medrec-project-api.herokuapp.com/api/v1/accounts/inactivate-account/${id}`,
        userStatus
      )
      .then((response) => {
        console.log(response);
        if (response.status == "202") {
          navigateToInactiveAccount();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <AppNavbar />

      <div className="container-fluid">
        <div className="row fill-container"></div>

        <div className="row">
          <h4>You are viewing {firstName}'s profile. </h4>
        </div>

        <div className="row">
          <div className="col-2 ms-5">
            <div className="card d-flex justify-content-start shadow mt-3 px-2 card-container">
              <div className="card-body jumbotron">
                <h4 className="mt-2">OVERVIEW</h4>
              </div>
              <img className="card-img-top mt-2" src={image} alt="user image" />
              <div className="card-body d-flex justify-content-center">
                <p className="card-text">{fullName}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{department}</li>
                <li className="list-group-item mb-4">{position}</li>
              </ul>
            </div>
          </div>

          <div className="col-9 ms-2 mt-3 card shadow">
            {user.status === "active" && (
              <div className="row mt-3 mb-3">
                <p className="text-muted d-flex justify-content-start py-0 my-0">
                  In updating account, input new data in desired text boxes and
                  click update.
                </p>
                <p className="text-muted d-flex justify-content-start py-0 my-0">
                  Only contact number, e-mail address, image, department and
                  position can be updated.
                </p>
              </div>
            )}

            {user.status === "inactive" && (
              <div className="col-12 d-flex justify-content-start mt-3">
                <p className="text-muted">
                  This account is already inactive. It cannot be updated.
                </p>
              </div>
            )}

            {user.status === "active" && (
              <div className="row d-flex justify-content-center mt-4">
                <div className="row">
                  <h5 className="border-bottom pb-1 d-flex justify-content-start">
                    General Information
                  </h5>
                </div>

                <div className="row">
                  <div className="form-group col-4">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      First Name:
                    </label>
                    <input
                      type="text"
                      className="form-control text-capitalize"
                      placeholder="Input complete given name"
                      autoComplete="off"
                      name="firstName"
                      defaultValue={user.firstName}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="form-group col-3">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Middle Name:
                    </label>
                    <input
                      type="text"
                      className="form-control text-capitalize"
                      placeholder="Input middle name"
                      autoComplete="off"
                      name="middleName"
                      defaultValue={user.middleName}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="form-group col-3">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      className="form-control text-capitalize"
                      placeholder="Input last name"
                      autoComplete="off"
                      name="lastName"
                      defaultValue={user.lastName}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="form-group col-2">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Suffix:
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      autoComplete="off"
                      name="suffix"
                      value={user.suffix}
                      disabled
                      readOnly
                    >
                      <option value={user.suffix} disabled>
                        {user.suffix}
                      </option>
                      <option value=""></option>
                      <option value="Sr">Sr.</option>
                      <option value="Jr">Jr.</option>
                      <option value="I">I</option>
                      <option value="II">II</option>
                      <option value="III">III</option>
                      <option value="IV">IV</option>
                      <option value="V">V</option>
                      <option value="VI">VI</option>
                      <option value="VII">VII</option>
                      <option value="VIII">VIII</option>
                      <option value="IX">IX</option>
                      <option value="X">X</option>
                    </select>
                  </div>

                  <div className="form-group col-2">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Gender:
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      autoComplete="off"
                      name="gender"
                      value={user.gender}
                      disabled
                      readOnly
                    >
                      <option value={user.gender} disabled>
                        {user.gender}
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="form-group col-3">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Birth Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      autoComplete="off"
                      name="birthDate"
                      defaultValue={user.birthDate}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="form-group col-3">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Contact Number:
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Input like 09*********"
                      autoComplete="off"
                      name="contactNumber"
                      defaultValue={user.contactNumber}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group col-4">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Input like ****@****.com"
                      autoComplete="off"
                      name="emailAddress"
                      defaultValue={user.emailAddress}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group col-12">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Image:
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Input image link"
                      autoComplete="off"
                      name="image"
                      defaultValue={user.image}
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {user.status === "inactive" && (
              <div className="row d-flex justify-content-center mt-4">
                <div className="row">
                  <h5 className="border-bottom pb-1 d-flex justify-content-start">
                    General Information
                  </h5>
                </div>

                <div className="row">
                  <div className="form-group col-4">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      First Name:
                    </label>
                    <input
                      type="text"
                      className="form-control text-capitalize"
                      placeholder="Input complete given name"
                      autoComplete="off"
                      name="firstName"
                      value={user.firstName}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="form-group col-3">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Middle Name:
                    </label>
                    <input
                      type="text"
                      className="form-control text-capitalize"
                      placeholder="Input middle name"
                      autoComplete="off"
                      name="middleName"
                      value={user.middleName}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="form-group col-3">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      className="form-control text-capitalize"
                      placeholder="Input last name"
                      autoComplete="off"
                      name="lastName"
                      value={user.lastName}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="form-group col-2">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Suffix:
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      autoComplete="off"
                      name="suffix"
                      value={user.suffix}
                      disabled
                      readOnly
                    >
                      <option value={user.suffix} disabled>
                        {user.suffix}
                      </option>
                      <option value=""></option>
                      <option value="Sr">Sr.</option>
                      <option value="Jr">Jr.</option>
                      <option value="I">I</option>
                      <option value="II">II</option>
                      <option value="III">III</option>
                      <option value="IV">IV</option>
                      <option value="V">V</option>
                      <option value="VI">VI</option>
                      <option value="VII">VII</option>
                      <option value="VIII">VIII</option>
                      <option value="IX">IX</option>
                      <option value="X">X</option>
                    </select>
                  </div>

                  <div className="form-group col-2">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Gender:
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      autoComplete="off"
                      name="gender"
                      defaultValue={user.gender}
                      disabled
                      readOnly
                    >
                      <option value={user.gender} disabled>
                        {user.gender}
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>

                  <div className="form-group col-3">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Birth Date:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      autoComplete="off"
                      name="birthDate"
                      value={user.birthDate}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="form-group col-3">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Contact Number:
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Input like 09*********"
                      autoComplete="off"
                      name="contactNumber"
                      value={user.contactNumber}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="form-group col-4">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Input like ****@****.com"
                      autoComplete="off"
                      name="emailAddress"
                      value={user.emailAddress}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="form-group col-12">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Image:
                    </label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Input image link"
                      autoComplete="off"
                      name="image"
                      value={user.image}
                      disabled
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}

            {user.status === "active" && (
              <div className="row d-flex justify-content-center mt-4">
                <div className="row">
                  <h5 className="border-bottom pb-1 d-flex justify-content-start">
                    Work Information
                  </h5>
                </div>

                <div className="row">
                  <div className="form-group col-6">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Department:
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      autoComplete="off"
                      name="department"
                      defaultValue={user.department}
                      onChange={onChange}
                    >
                      <option value={user.department} disabled>
                        {user.department}
                      </option>
                      <option value="Outpatient Department">
                        Outpatient Department
                      </option>
                      <option value="Inpatient Service">
                        Inpatient Service
                      </option>
                      <option value="Medical Department">
                        Medical Department
                      </option>
                      <option value="Nursing Department">
                        Nursing Department
                      </option>
                      <option value="Paramedical Department">
                        Paramedical Department
                      </option>
                      <option value="Physical Medicine and Rehabilitation Department">
                        Physical Medicine and Rehabilitation Department
                      </option>
                      <option value="Operation Theatre Complex">
                        Operation Theatre Complex
                      </option>
                      <option value="Pharmacy Department">
                        Pharmacy Department
                      </option>
                      <option value="Radiology Department">
                        Radiology Department
                      </option>
                      <option value="Dietary Department">
                        Dietary Department
                      </option>
                      <option value="Non-professional Services (Business Management)">
                        Non-professional Services (Business Management)
                      </option>
                      <option value="Medical Record Department">
                        Medical Record Department
                      </option>
                      <option value="Personnel Department">
                        Personnel Department
                      </option>
                    </select>
                  </div>

                  <div className="form-group col-3">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Position:
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      autoComplete="off"
                      placeholder="Input position"
                      name="position"
                      defaultValue={user.position}
                      onChange={onChange}
                    />
                  </div>

                  <div className="form-group col-3">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Employee since:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      autoComplete="off"
                      name="startedWorkDate"
                      defaultValue={user.startedWorkDate}
                      disabled
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}

            {user.status === "inactive" && (
              <div className="row d-flex justify-content-center mt-4">
                <div className="row">
                  <h5 className="border-bottom pb-1 d-flex justify-content-start">
                    Work Information
                  </h5>
                </div>

                <div className="row">
                  <div className="form-group col-6">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Department:
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      autoComplete="off"
                      name="department"
                      value={user.department}
                      disabled
                      readOnly
                    >
                      <option value={user.department} disabled>
                        {user.department}
                      </option>
                      <option value="Outpatient Department">
                        Outpatient Department
                      </option>
                      <option value="Inpatient Service">
                        Inpatient Service
                      </option>
                      <option value="Medical Department">
                        Medical Department
                      </option>
                      <option value="Nursing Department">
                        Nursing Department
                      </option>
                      <option value="Paramedical Department">
                        Paramedical Department
                      </option>
                      <option value="Physical Medicine and Rehabilitation Department">
                        Physical Medicine and Rehabilitation Department
                      </option>
                      <option value="Operation Theatre Complex">
                        Operation Theatre Complex
                      </option>
                      <option value="Pharmacy Department">
                        Pharmacy Department
                      </option>
                      <option value="Radiology Department">
                        Radiology Department
                      </option>
                      <option value="Dietary Department">
                        Dietary Department
                      </option>
                      <option value="Non-professional Services (Business Management)">
                        Non-professional Services (Business Management)
                      </option>
                      <option value="Medical Record Department">
                        Medical Record Department
                      </option>
                      <option value="Personnel Department">
                        Personnel Department
                      </option>
                    </select>
                  </div>

                  <div className="form-group col-3">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Position:
                    </label>
                    <input
                      type="text"
                      className="form-control "
                      autoComplete="off"
                      placeholder="Input position"
                      name="position"
                      value={user.position}
                      disabled
                      readOnly
                    />
                  </div>

                  <div className="form-group col-3">
                    <label className="d-flex justify-content-start mt-3 mb-1">
                      Employee since:
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      autoComplete="off"
                      name="startedWorkDate"
                      value={user.startedWorkDate}
                      disabled
                      readOnly
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="col-12 d-flex justify-content-start mt-5 account-info-container">
              <p className="text-muted account-info-text fw-lighter">
                This account is created at {user.createdAt}.
              </p>
            </div>
            <div className="col-12 d-flex justify-content-start mb-4 account-info-container">
              <p className="text-muted account-info-text fw-lighter">
                This account is last updated at {user.updatedAt}.
              </p>
            </div>

            {user.status === "active" && (
              <div className="row mx-2">
                <button
                  className="btn btn-danger col-3 mb-4"
                  onClick={openInactivateAccountMessage}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-x-square d-inline mb-1"
                    viewBox="0 0 17 17"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                  <p className="d-inline ms-2">Set Inactive</p>
                </button>
                <div className="col-6"></div>
                <button
                  className="btn btn-primary col-3 mb-4"
                  onClick={openUpdatedAccountMessage}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-pencil-square d-inline"
                    viewBox="0 0 17 17"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                    />
                  </svg>
                  <p className="d-inline ms-2">Update Account</p>
                </button>
              </div>
            )}
          </div>

          <footer className="col-12 footer-container mt-5">
            <p className=" d-flex align-items-center justify-content-center mt-2 footer-text">
              © 2022 MedRec. All rights reserved.
              <br />
              EMR Software, EHR Software: Electronic Medical Record Service
            </p>
          </footer>

          <Modal
            isOpen={inactivateAccount}
            onRequestClose={closeInactivateAccountMessage}
            style={customStyles}
            ariaHideApp={false}
          >
            <div>
              <p className="d-flex justify-content-center">
                Are you sure you want to inactivate this account?
              </p>
              <p className="d-flex justify-content-center">
                Once accounts are inactivated, user will no longer have access
                to MedRec.
              </p>
              <div className="d-flex justify-content-center">
                <button
                  onClick={() => {
                    inactivateUser();
                    navigateToInactiveAccount();
                    window.location.reload();
                  }}
                  className="btn btn-danger col-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-x-square d-inline mb-1"
                    viewBox="0 0 17 17"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                  <p className="d-inline ms-2">Set Inactive</p>
                </button>
                <div className="col-3"></div>
                <button
                  onClick={closeInactivateAccountMessage}
                  className="btn btn-primary col-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-back d-inline mb-1"
                    viewBox="0 0 17 17"
                  >
                    <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z" />
                  </svg>
                  <p className="d-inline ms-2">Cancel</p>
                </button>
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={updateAccount}
            onRequestClose={closeUpdatedAccountMessage}
            style={customStyles}
            ariaHideApp={false}
          >
            <div>
              <p className="d-flex justify-content-center">
                Are you sure you want to update this account?
              </p>
              <div className="row">
                <div className="d-flex justify-content-center">
                  <button
                    onClick={closeUpdatedAccountMessage}
                    className="btn btn-primary me-2 col-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-back d-inline mb-1"
                      viewBox="0 0 17 17"
                    >
                      <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z" />
                    </svg>
                    <p className="d-inline ms-2">Cancel</p>
                  </button>
                  <div className="col-2"></div>
                  <button
                    onClick={() => {
                      saveUpdate();
                      navigateToActiveAccount();
                    }}
                    className="btn btn-success ms-2 col-6"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-pencil-square d-inline"
                      viewBox="0 0 17 17"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                    <p className="d-inline ms-2">Update Account</p>
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SpecificAccount;
