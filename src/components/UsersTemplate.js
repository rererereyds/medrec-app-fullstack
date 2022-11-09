import React from "react";
import { useNavigate } from "react-router-dom";

const UsersTemplate = ({
  id,
  image,
  lastName,
  firstName,
  middleName,
  suffix,
  department,
  position,
}) => {
  const navigate = useNavigate();

  const navigateToShowAccount = (id) => {
    navigate(`/show-account/${id}`);
  };

  return (
    <div className="col-6 my-2 p-0">
      <div className="container-fluid">
        <div className="col-12 card shadow">
          <div className="row">
            <div className="col-3 d-flex align-items-center justify-content-center">
              <img
                src={image}
                alt="user-icon"
                className="col-1 img-fluid my-2 w-75"
              />
            </div>
            <div className="col-5 card border-0 d-flex align-items-center justify-content-center">
              <p className="py-0 my-0 text-limit">
                {lastName}, {firstName} {middleName} {suffix}
              </p>
              <p className="py-0 my-0 text-limit">{department}</p>
              <p className="py-0 my-0 text-limit">{position}</p>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center">
              <button
                className="btn btn-outline-primary"
                onClick={() => navigateToShowAccount(id)}
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
                <p className="d-inline">View Account</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTemplate;
