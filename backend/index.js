const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 8080;
const app = express();
require('dotenv').config();

//5 Install body-parser and cors
app.use(bodyParser.json());
app.use(cors());

//1 Connect to mongodb
// const uri = "mongodb+srv://rererereyds:Mongodb12345@project6db.fcqd7kp.mongodb.net/usersdb";
const uri = "mongodb+srv://reydabarroso:uIkx8HCWIRPrwBbY@records.qqvb3.mongodb.net/";
mongoose.connect (uri);
// mongoose.set('strictQuery', true);


//Trying Vercel
const fetch = require('node-fetch');

const token = 'VrWosZnCewI8SS4GEQPBehIm'; // Replace with your actual token
const url = 'https://medrec-app-fullstack-iptzi3xpm-reyds-projects.vercel.app/api/v1/accounts'; // Replace with the API endpoint you want to call

async function fetchData() {
    const response = await fetch(url, {
        method: 'GET', // or 'POST', 'PUT', etc. depending on your request
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' // If needed
        }
    });

    const data = await response.json();
    console.log(data);
}

fetchData();


 
//3 Create landing page message
app.get("/", (request, response) => {
    response.send(`Welcome to your Express App.`);
});

//4 Get routers
const accountsRouter = require("./routes/accounts");
app.use("/api/v1/accounts", accountsRouter);

const patientsRouter = require("./routes/patients");
app.use("/api/v1/patients", patientsRouter);

const patientRecordsRouter = require("./routes/patientRecords");
app.use("/api/v1/patient-records", patientRecordsRouter);

const prescribedMedicinesRouter = require("./routes/prescribedMedicines");
app.use("/api/v1/prescribed-medicine", prescribedMedicinesRouter);

//2 Export
// app.listen(process.env.PORT || port, () => {
//     console.log(`Express is running on port ${port}.`)
// });

// Start the server (local development only)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Express is running on http://localhost:${port}`);
    });
}

// No need to create an HTTP or HTTPS server when deploying to Vercel
module.exports = app; // Export the app for Vercel to use