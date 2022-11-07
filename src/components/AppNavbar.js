import React from 'react'
import { useNavigate } from 'react-router-dom'

const AppNavbar = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userToken");

    if (localStorage.getItem("userToken") === null) {
      navigate(`/`);
    }
  }

  return (
    <div className='col-md-12 fixed-top'>
      <nav className="navbar navbar-expand-lg shadow p-3 mb-5 bg-white rounded navbar-fixed-top">
        <div className='col-md-1'>
          <a className="nav-link font-style d-flex justify-content-start align-items-center ms-5" href={"/home"}>
            <img src={require("../images/MedRec-logo.png")} alt="logo"/>
          </a>
        </div>
        <div className='col-md-1 ms-1'>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <a className="nav-link font-style nav-text" href={"/home"} >MedRec</a>
            </li>
          </ul>
        </div>
        <div className='col-md-7'></div>
        <div className='col-md-2 ms-5'>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link font-style nav-text" href={"/patients"} >Patients</a>
              </li>
              {/* if user is admin */}
              <li className="nav-item">
                <a className="nav-link font-style nav-text" href={"/users/active"}>Users</a>
              </li>
              {/* endif user is admin */}
              <li className="nav-item">
                  <a className="nav-link font-style nav-text" onClick={logout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AppNavbar;