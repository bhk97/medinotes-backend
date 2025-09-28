const express = require('express');
const app = express();
const cors = require('cors');
const body_parser = require('body-parser');
const doctorRoutes = require('./routes/doctor.route')
const patientRoutes = require('./routes/patient.route')
const sessionRoutes = require('./routes/session.route')
const chunkRoutes = require('./routes/chunk.route');
app.use(body_parser.json());
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes)
app.use("/api/sessions", sessionRoutes)
app.use("/api/chunks", chunkRoutes);


module.exports = app;


