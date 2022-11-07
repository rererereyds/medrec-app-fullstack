import React from 'react';
import AppNavbar from './AppNavbar';
import axios from "axios";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

const AddAccount = () => {

  const navigate = useNavigate();

  const navigateToActiveAccount = () => {
    navigate(`/users/active`);
  };

  useEffect(() => {
    if (localStorage.getItem("userToken") === null) {
      navigate(`/`);
    }
  }, []);

  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [accept, setAccept] = useState(false);

  
  const openErrorMessage = () => {
    setError(true);
  }

  const closeErrorMessage = () => {
    setError(false);
  }

  const openAcceptMessage = () => {
    setAccept(true)
  }

  const closeAcceptMessage = () => {
    setAccept(false)
  }

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: "1px solid blue"
    },
  };

  const customStylesForAccept = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: "1px solid green"
    },
  };

  const onChange = (e) => {
    const type = e.target.name;

    switch(type){
      case "image":
        setUser({...user, image: e.target.value});
        break;
      case "lastName":
        setUser({...user, lastName: e.target.value});
        break;
      case "firstName":
        setUser({...user, firstName: e.target.value});
        break;
      case "middleName":
        setUser({...user, middleName: e.target.value});
        break;
      case "suffix":
        setUser({...user, suffix: e.target.value});
        break;
      case "gender":
        setUser({...user, gender: e.target.value});
        break;
      case "birthDate":
        setUser({...user, birthDate: e.target.value});
        break;
      case "emailAddress":
        setUser({...user, emailAddress: e.target.value});
        break;
      case "contactNumber":
        setUser({...user, contactNumber: e.target.value});
        break;
      case "department":
        setUser({...user, department: e.target.value});
        break;
      case "position":
        setUser({...user, position: e.target.value});
        break;
      case "startedWorkDate":
        setUser({...user, startedWorkDate: e.target.value});
        break;
      case "accountUserName":
        setUser({...user, accountUserName: e.target.value});
        break;
      case "accountPassword":
        setUser({...user, accountPassword: e.target.value});
        break;
      default:
        break;
    }
  }

  const submitAccount = () => {
    axios.post(`https://reyda-medrec-project-api.herokuapp.com/api/v1/accounts`, user).then((response) => {
      console.log(response);
      console.log(user);
      openAcceptMessage();
    }).catch((error) => {
      console.log("eto" + error);
      openErrorMessage();
    });
  };


  return (
    <div>
      
      <AppNavbar/>
        
      <div className='container-fluid'>

        <div className='row fill-container'></div>

        <div className="row ">

          <div className='col-1'></div>

          <div className='col-10 card shadow'>
            <div className='row mt-3'>
              <h2 className='add-account-title-container'>Add New Account</h2>
            </div>

            <div className='row d-flex justify-content-center'>

              <div className='row d-flex justify-content-center mt-3'>
                <div className='row'>
                  <h5 className='border-bottom pb-1 d-flex justify-content-start'>General Information</h5>
                </div>

                <div className='row'>
                  <div className="form-group col-4">
                    <label className='d-flex justify-content-start mt-3 mb-1'>First Name:</label>
                    <input type="text" className="form-control text-capitalize" placeholder='Input complete given name' autoComplete="off" name="firstName" onChange={onChange}/>
                  </div> 

                  <div className="form-group col-3">
                    <label className='d-flex justify-content-start mt-3 mb-1'>Middle Name:</label>
                    <input type="text" className="form-control text-capitalize" placeholder='Input middle name' autoComplete="off" name="middleName" onChange={onChange}/>
                  </div> 
                  
                  <div className="form-group col-3">
                    <label className='d-flex justify-content-start mt-3 mb-1'>Last Name:</label>
                    <input type="text" className="form-control text-capitalize" placeholder='Input last name' autoComplete="off" name="lastName" onChange={onChange}/>
                  </div> 

                  <div className="form-group col-2">
                    <label className='d-flex justify-content-start mt-3 mb-1'>Suffix:</label>
                    <select className="form-select" aria-label="Default select example" autoComplete="off" defaultValue="Choose" name="suffix" onChange={onChange}>
                      <option value="Choose" disabled>Choose suffix</option>
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
                    <label className='d-flex justify-content-start mt-3 mb-1'>Gender:</label>
                    <select className="form-select" aria-label="Default select example" autoComplete="off" defaultValue="Choose" name="gender" onChange={onChange}>
                      <option value="Choose" disabled>Choose gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div> 

                  <div className="form-group col-3">
                    <label className='d-flex justify-content-start mt-3 mb-1'>Birth Date:</label>
                    <input type="date" className="form-control" autoComplete="off" name="birthDate" onChange={onChange}/>
                  </div>  

                  <div className="form-group col-3">
                    <label className='d-flex justify-content-start mt-3 mb-1'>Contact Number:</label>
                    <input type="tel" className="form-control" placeholder='Input like 09*********' autoComplete="off" name="contactNumber" onChange={onChange}/>
                  </div>
                  
                  <div className="form-group col-4">
                    <label className='d-flex justify-content-start mt-3 mb-1'>Email Address:</label>
                    <input type="email" className="form-control" placeholder='Input like ****@****.com' autoComplete="off" name="emailAddress" onChange={onChange}/>
                  </div>

                  <div className="form-group col-12">
                    <label className='d-flex justify-content-start mt-3 mb-1'>Image:</label>
                    <input type="url" className="form-control" placeholder='Input image link' autoComplete="off" name="image" onChange={onChange}/>
                  </div>
                 
                </div>


              </div> 


              <div className='row d-flex justify-content-center mt-4'>
                <div className='row'>
                  <h5 className='border-bottom pb-1 d-flex justify-content-start'>Work Information</h5>
                </div>

                <div className='row'>
                  <div className="form-group col-6">
                    <label className='d-flex justify-content-start mt-3 mb-1'>Department:</label>  
                    <select className="form-select" aria-label="Default select example" autoComplete="off" defaultValue="Choose" name="department" onChange={onChange}>
                      <option value="Choose" disabled>Choose department</option>
                      <option value="Outpatient Department">Outpatient Department</option>
                      <option value="Inpatient Service">Inpatient Service</option>
                      <option value="Medical Department">Medical Department</option>
                      <option value="Nursing Department">Nursing Department</option>
                      <option value="Paramedical Department">Paramedical Department</option>
                      <option value="Physical Medicine and Rehabilitation Department">Physical Medicine and Rehabilitation Department</option>
                      <option value="Operation Theatre Complex">Operation Theatre Complex</option>
                      <option value="Pharmacy Department">Pharmacy Department</option>
                      <option value="Radiology Department">Radiology Department</option>
                      <option value="Dietary Department">Dietary Department</option>
                      <option value="Non-professional Services (Business Management)">Non-professional Services (Business Management)</option>
                      <option value="Medical Record Department">Medical Record Department</option>
                      <option value="Personnel Department">Personnel Department</option>
                    </select>
                  </div> 

                  <div className="form-group col-3">
                    <label className='d-flex justify-content-start mt-3 mb-1'>Position:</label>
                    <input type="text" className="form-control text-capitalize" autoComplete="off" placeholder='Input position' name="position" onChange={onChange}/>
                  </div> 

                  <div className="form-group col-3">
                    <label className='d-flex justify-content-start mt-3 mb-1'>Started Work Date:</label>
                    <input type="date" className="form-control" autoComplete="off" name="startedWorkDate" onChange={onChange}/>
                  </div>
                </div>
              </div>

              <div className='row d-flex justify-content-center mt-4'>
                <div className='row'>
                  <h5 className='border-bottom pb-1 d-flex justify-content-start'>Account Information</h5>
                </div>

                <div className='row'>
                  <div className="form-group col-6">
                    <label className='d-flex justify-content-start mt-3 mb-1'>Username:</label>
                    <input type="text" className="form-control" autoComplete="off" placeholder='Input username' name="accountUserName" onChange={onChange}/>
                  </div>

                  <div className="form-group col-6">
                    <label className='d-flex justify-content-start mt-3 mb-1'>Password:</label>
                    <input type="text" className="form-control" autoComplete="off" placeholder='Input password' name="accountPassword" onChange={onChange}/>
                  </div>
                </div>
              </div> 

              <div className='row mt-4 mb-4'>
                <div className='col-5'></div>
                <button className="btn btn-primary col-2" onClick={submitAccount}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-file-earmark-plus d-inline mb-1" viewBox="0 0 17 17">
                    <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
                  </svg>
                  <p className='d-inline ms-2'>Create Account</p>
                </button>
                <div className='col-5'></div>
              </div>
            </div>
          </div>

          <div className='col-1'></div>
          
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

        <Modal
          isOpen={error}
          onRequestClose={closeErrorMessage}
          style={customStyles}
          ariaHideApp={false}
        >
          <div>
            <p className='d-flex justify-content-center'>Oops! Cannot create new account.</p>
            <p className='d-flex justify-content-center'>Either this person already has an account or username already existed.</p>
            <div className='d-flex justify-content-center'>
              <button onClick={closeErrorMessage} className="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat d-inline" viewBox="0 0 17 17">
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                  <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                </svg>
                <p className='d-inline ms-2'>Try Again</p>
              </button>
            </div>
          </div>
        </Modal>
                    
        <Modal
          isOpen={accept}
          onRequestClose={closeAcceptMessage}
          style={customStylesForAccept}
          ariaHideApp={false}
        >
          <div>
            <p className='d-flex justify-content-center'>Success!</p>
            <p className='d-flex justify-content-center'>Account already Created.</p>
            <div className='d-flex justify-content-center'>
              <button onClick={() => navigateToActiveAccount()} className="btn btn-success">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-back d-inline" viewBox="0 0 17 17">
                <path d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2z"/>
              </svg>
                <p className='d-inline ms-2'>Go back</p>
              </button>
            </div>
          </div>
        </Modal>

      </div>
      
    </div>
  )
}

export default AddAccount