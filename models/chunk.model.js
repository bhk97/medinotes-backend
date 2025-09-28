const mongoose = require('mongoose');
const { Schema } = mongoose;
const db = require('../config/db');

const chunkSchema = new Schema({
    sessionId: { type: String, required: true },
    chunkNumber: { type: Number, required: true },
    filePath: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
});

const ChunkModel = db.model('chunks', chunkSchema);
module.exports = ChunkModel;
