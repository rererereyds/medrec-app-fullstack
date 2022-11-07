import { Link, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import LogIn from "./components/LogIn";
import HomePage from "./components/HomePage";
import UsersPage from "./components/UsersPage";
import AddAccount from "./components/AddAccount";
import PatientsPage from "./components/PatientsPage";
import UsersPage_Inactive from "./components/UsersPage_Inactive";
import SpecificAccount from "./components/SpecificAccount";
import SpecificPatient from "./components/SpecificPatient";
import AddPatient from "./components/AddPatient";
import PatientRecord from "./components/PatientRecord";
import AddRecord from "./components/AddRecord";


function App() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  }, []);

  return (
    <div className="App">

      {loading 
        ? <div className="grid-container">
            <img src={require("./images/MedRec-logo-and-name.png")} alt="logo and name" loading={loading} className="splash-image"/>
          </div>
        : <Routes>
            <Route path="/" element={<LogIn/>}></Route>
            <Route path="/home" element={<HomePage/>}></Route>
            <Route path="/users/active" element={<UsersPage/>}></Route>
            <Route path="/users/inactive" element={<UsersPage_Inactive/>}></Route>
            <Route path="/patients" element={<PatientsPage/>}></Route>
            <Route path="/show-account/:id" element={<SpecificAccount/>}></Route>
            <Route path="/show-patient/:id" element={<SpecificPatient/>}></Route>
            <Route path="/add-account" element={<AddAccount/>}></Route>
            <Route path="/add-patient" element={<AddPatient/>}></Route>
            <Route path="/patient-record/:id" element={<PatientRecord/>}></Route>
            <Route path="/add-record/:id" element={<AddRecord/>}></Route>
          </Routes>
      }

    </div>
  );
}

export default App;
