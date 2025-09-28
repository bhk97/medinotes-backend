const mongoose = require('mongoose');
const db = require('../config/db');
const { Schema } = mongoose;

const sessionSchema = new Schema({
    patientId: { type: String, required: true },
    doctorId: { type: String, required: true },
    patientName: { type: String, required: true },
    status: { type: String, enum: ['recording', 'completed', 'failed'], default: 'recording' },
    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    templateId: { type: String },
    chunks: [
        {
            chunkNumber: Number,
            path: String,
            uploadedAt: { type: Date, default: Date.now }
        }
    ]
});

const sessionModel = db.model('sessions', sessionSchema);
module.exports = sessionModel;
