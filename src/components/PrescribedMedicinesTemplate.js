import React from 'react'

const PrescribedMedicinesTemplate = ({ id, patient_id, medicalRecord_id, medicineName, form, dosage, frequency, interval, createdAt }) => {


  return (

    <div className='container-fluid'>
    
      <div className='row mt-4 mb-4'>
        <div className='card'>
          <div className='row'>
            <div className="form-group col-12">
              <label className='d-flex justify-content-start mt-3 mb-1'>Medicine Name:</label>
              <input type="text" className="form-control" placeholder='Input medicine name' autoComplete="off" name="medicineName" value={medicineName} disabled readOnly/>
            </div>
          </div>
          <div className='row'>
            <div className="form-group col-3">
              <label className='d-flex justify-content-start mt-3 mb-1'>Form:</label>
              <input type="text" className="form-control" placeholder='Input medicine form' autoComplete="off" name="form" value={form} disabled readOnly/>
            </div> 

            <div className="form-group col-3">
              <label className='d-flex justify-content-start mt-3 mb-1'>Dosage:</label>
              <input type="text" className="form-control" placeholder='Input dosage' autoComplete="off" name="dosage" value={dosage} disabled readOnly/>
            </div>

            <div className="form-group col-3">
              <label className='d-flex justify-content-start mt-3 mb-1'>Frequency:</label>
              <input type="text" className="form-control" placeholder='Input frequency' autoComplete="off" name="frequency" value={frequency} disabled readOnly/>
            </div>

            <div className="form-group col-3">
              <label className='d-flex justify-content-start mt-3 mb-1'>Interval:</label>
              <input type="text" className="form-control" placeholder='Input interval' autoComplete="off" name="interval" value={interval} disabled readOnly/>
            </div>
          </div>

          <div className='row mt-3'>
            <div className="form-group col-8 d-flex justify-content-start">
              <p className='text-muted account-info-text fw-lighter'>Prescription created at: {createdAt}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PrescribedMedicinesTemplate