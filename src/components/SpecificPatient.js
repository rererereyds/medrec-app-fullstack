import React from "react";
import AppNavbar from "./AppNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";

const SpecificPatient = () => {
  const navigate = useNavigate();

  const navigateToMedicalRecord = () => {
    navigate(`/patient-record/${id}`);
  };

  const { id } = useParams();
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [patient, setPatient] = useState({});
  const [updateProfile, setUpdateProfile] = useState(false);

  const openUpdatedProfileMessage = () => {
    setUpdateProfile(true);
  };

  const closeUpdatedProfileMessage = () => {
    setUpdateProfile(false);
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
        setPatient({ ...patient, image: e.target.value });
        break;
      case "lastName":
        setPatient({ ...patient, lastName: e.target.value });
        break;
      case "firstName":
        setPatient({ ...patient, firstName: e.target.value });
        break;
      case "middleName":
        setPatient({ ...patient, middleName: e.target.value });
        break;
      case "suffix":
        setPatient({ ...patient, suffix: e.target.value });
        break;
      case "gender":
        setPatient({ ...patient, gender: e.target.value });
        break;
      case "birthDate":
        setPatient({ ...patient, birthDate: e.target.value });
        break;
      case "emailAddress":
        setPatient({ ...patient, emailAddress: e.target.value });
        break;
      case "contactNumber":
        setPatient({ ...patient, contactNumber: e.target.value });
        break;
      case "province":
        setPatient({ ...patient, province: e.target.value });
        break;
      case "city":
        setPatient({ ...patient, city: e.target.value });
        break;
      case "baranggay":
        setPatient({ ...patient, baranggay: e.target.value });
        break;
      case "subdivision":
        setPatient({ ...patient, subdivision: e.target.value });
        break;
      case "purok":
        setPatient({ ...patient, purok: e.target.value });
        break;
      case "phase":
        setPatient({ ...patient, phase: e.target.value });
        break;
      case "block":
        setPatient({ ...patient, block: e.target.value });
        break;
      case "lot":
        setPatient({ ...patient, lot: e.target.value });
        break;
      case "emergencyContactLastName":
        setPatient({ ...patient, emergencyContactLastName: e.target.value });
        break;
      case "emergencyContactFirstName":
        setPatient({ ...patient, emergencyContactFirstName: e.target.value });
        break;
      case "emergencyContactMiddleName":
        setPatient({ ...patient, emergencyContactMiddleName: e.target.value });
        break;
      case "emergencyContactSuffix":
        setPatient({ ...patient, emergencyContactSuffix: e.target.value });
        break;
      case "emergencyContactRelation":
        setPatient({ ...patient, emergencyContactRelation: e.target.value });
        break;
      case "emergencyContactNumber":
        setPatient({ ...patient, emergencyContactNumber: e.target.value });
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
        `https://reyda-medrec-project-api-52786e85dd45.herokuapp.com/api/v1/patients/show-patient/${id}`
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
        if (response.data.image) {
          setImage(response.data.image);
        }
        if (response.data.gender) {
          setGender(response.data.gender);
        }
        if (response.data.birthDate) {
          setBirthDate(response.data.birthDate);
        }
        if (response.data) {
          setPatient(response.data);
        }
      });
  }, []);

  const saveUpdate = () => {
    const patientReq = {
      image: patient.image,
      lastName: patient.lastName,
      firstName: patient.firstName,
      middleName: patient.middleName,
      suffix: patient.suffix,
      gender: patient.gender,
      birthDate: patient.birthDate,
      emailAddress: patient.emailAddress,
      contactNumber: patient.contactNumber,
      province: patient.province,
      city: patient.city,
      baranggay: patient.baranggay,
      subdivision: patient.subdivision,
      purok: patient.purok,
      phase: patient.phase,
      block: patient.block,
      lot: patient.lot,
      emergencyContactLastName: patient.emergencyContactLastName,
      emergencyContactFirstName: patient.emergencyContactFirstName,
      emergencyContactMiddleName: patient.emergencyContactMiddleName,
      emergencyContactSuffix: patient.emergencyContactSuffix,
      emergencyContactRelation: patient.emergencyContactRelation,
      emergencyContactNumber: patient.emergencyContactNumber,
    };
    axios
      .put(
        `https://reyda-medrec-project-api-52786e85dd45.herokuapp.com/api/v1/patients/edit-record/${id}`,
        patientReq
      )
      .then((response) => {
        if (response.status == "201") {
          window.location.reload();
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
          <div className="row">
            <div className="col-2 me-5"></div>
            <div className="col-7 me-4 d-flex align-items-center justify-content-start">
              <h4>You are viewing {firstName}'s profile. </h4>
            </div>
            <div className="col-2 d-flex align-items-center justify-content-start">
              <button
                className="btn btn-outline-primary"
                onClick={() => navigateToMedicalRecord()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  className="bi bi-person-badge d-inline mb-1 me-1"
                  viewBox="0 0 17 17"
                >
                  <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                  <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z" />
                </svg>
                <p className="d-inline">View Medical Record</p>
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-2 ms-5">
              <div className="card d-flex justify-content-start shadow mt-3 px-2 card-container">
                <div className="card-body jumbotron">
                  <h4 className="mt-2">PROFILE</h4>
                </div>
                <img
                  className="card-img-top mt-2"
                  src={image}
                  alt="user image"
                />
                <div className="card-body d-flex justify-content-center">
                  <p className="card-text">{fullName}</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">{birthDate}</li>
                  <li className="list-group-item mb-4">{gender}</li>
                </ul>
              </div>
            </div>

            <div className="col-9 ms-2 mt-3 card shadow">
              <div>
                <div className="row mt-3 mb-3">
                  <p className="text-muted d-flex justify-content-start py-0 my-0">
                    In updating profile, input new data in desired text boxes
                    and click update.
                  </p>
                  <p className="text-muted d-flex justify-content-start py-0 my-0">
                    Only contact number, e-mail address, image, address, and
                    emergency contact can be updated.
                  </p>
                </div>

                <div className="row d-flex justify-content-center">
                  <div className="row d-flex justify-content-center mt-3">
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
                          defaultValue={patient.firstName}
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
                          defaultValue={patient.middleName}
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
                          defaultValue={patient.lastName}
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
                          value={patient.suffix}
                          disabled
                          readOnly
                        >
                          <option value={patient.suffix} disabled>
                            {patient.suffix}
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
                          value={patient.gender}
                          disabled
                          readOnly
                        >
                          <option value={patient.gender} disabled>
                            {patient.gender}
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
                          defaultValue={patient.birthDate}
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
                          defaultValue={patient.contactNumber}
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
                          defaultValue={patient.emailAddress}
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
                          defaultValue={patient.image}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row d-flex justify-content-center mt-4">
                    <div className="row">
                      <h6 className="pb-1 d-flex justify-content-start">
                        Permanent Address
                      </h6>
                    </div>

                    <div className="row">
                      <div className="form-group col-6">
                        <label className="d-flex justify-content-start mt-3 mb-1">
                          Province:
                        </label>
                        <input
                          type="text"
                          className="form-control text-capitalize"
                          placeholder="Input province"
                          autoComplete="off"
                          name="province"
                          defaultValue={patient.province}
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-group col-6">
                        <label className="d-flex justify-content-start mt-3 mb-1">
                          City:
                        </label>
                        <input
                          type="text"
                          className="form-control text-capitalize"
                          placeholder="Input city"
                          autoComplete="off"
                          name="city"
                          defaultValue={patient.city}
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-group col-6">
                        <label className="d-flex justify-content-start mt-3 mb-1">
                          Baranggay:
                        </label>
                        <input
                          type="text"
                          className="form-control text-capitalize"
                          placeholder="Input baranggay"
                          autoComplete="off"
                          name="baranggay"
                          defaultValue={patient.baranggay}
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-group col-6">
                        <label className="d-flex justify-content-start mt-3 mb-1">
                          Subdivision:
                        </label>
                        <input
                          type="text"
                          className="form-control text-capitalize"
                          placeholder="Input subdivision"
                          autoComplete="off"
                          name="subdivision"
                          defaultValue={patient.subdivision}
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-group col-3">
                        <label className="d-flex justify-content-start mt-3 mb-1">
                          Purok:
                        </label>
                        <input
                          type="text"
                          className="form-control text-capitalize"
                          placeholder="Input purok"
                          autoComplete="off"
                          name="purok"
                          defaultValue={patient.purok}
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-group col-3">
                        <label className="d-flex justify-content-start mt-3 mb-1">
                          Phase:
                        </label>
                        <input
                          type="text"
                          className="form-control text-capitalize"
                          placeholder="Input phase"
                          autoComplete="off"
                          name="phase"
                          defaultValue={patient.phase}
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-group col-3">
                        <label className="d-flex justify-content-start mt-3 mb-1">
                          Block:
                        </label>
                        <input
                          type="text"
                          className="form-control text-capitalize"
                          placeholder="Input block"
                          autoComplete="off"
                          name="block"
                          defaultValue={patient.block}
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-group col-3">
                        <label className="d-flex justify-content-start mt-3 mb-1">
                          Lot:
                        </label>
                        <input
                          type="text"
                          className="form-control text-capitalize"
                          placeholder="Input lot"
                          autoComplete="off"
                          name="lot"
                          defaultValue={patient.lot}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row d-flex justify-content-center mt-4">
                    <div className="row">
                      <h5 className="border-bottom pb-1 d-flex justify-content-start">
                        Emergency Contact Information
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
                          name="emergencyContactFirstName"
                          defaultValue={patient.emergencyContactFirstName}
                          onChange={onChange}
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
                          name="emergencyContactMiddleName"
                          defaultValue={patient.emergencyContactMiddleName}
                          onChange={onChange}
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
                          name="emergencyContactLastName"
                          defaultValue={patient.emergencyContactLastName}
                          onChange={onChange}
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
                          name="emergencyContactSuffix"
                          defaultValue={patient.emergencyContactSuffix}
                          onChange={onChange}
                        >
                          <option
                            value={patient.emergencyContactSuffix}
                            disabled
                          >
                            {patient.emergencyContactSuffix}
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

                      <div className="form-group col-4">
                        <label className="d-flex justify-content-start mt-3 mb-1">
                          Relationship:
                        </label>
                        <input
                          type="text"
                          className="form-control text-capitalize"
                          placeholder="Input relationship to patient"
                          autoComplete="off"
                          name="emergencyContactRelation"
                          defaultValue={patient.emergencyContactRelation}
                          onChange={onChange}
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
                          name="emergencyContactNumber"
                          defaultValue={patient.emergencyContactNumber}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mt-4 mb-4">
                    <div className="col-4"></div>
                    <button
                      className="btn btn-primary col-4 mb-4"
                      onClick={openUpdatedProfileMessage}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square d-inline"
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
                    <div className="col-4"></div>
                  </div>
                </div>
              </div>

              <div className="col-1"></div>
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
          isOpen={updateProfile}
          onRequestClose={closeUpdatedProfileMessage}
          style={customStyles}
          ariaHideApp={false}
        >
          <div>
            <p className="d-flex justify-content-center">
              Are you sure you want to update this profile?
            </p>
            <div className="row">
              <div className="d-flex justify-content-center">
                <button
                  onClick={closeUpdatedProfileMessage}
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
                    window.location.reload();
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
  );
};

export default SpecificPatient;
