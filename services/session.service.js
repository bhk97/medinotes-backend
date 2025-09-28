const sessionModel = require('../models/session.model');

class SessionService {

    static async createSession(patientId, doctorId, patientName, templateId) {
        try {
            const newSession = new sessionModel({
                patientId,
                doctorId,
                patientName,
                templateId,
                status: 'recording'
            });
            return await newSession.save();
        } catch (err) {
            throw err;
        }
    }

    static async getSessionsByPatient(patientId) {
        try {
            return await sessionModel.find({ patientId }).sort({ startTime: -1 });
        } catch (err) {
            throw err;
        }
    }

    static async completeSession(sessionId) {
        try {
            return await sessionModel.findByIdAndUpdate(
                sessionId,
                { status: 'completed', endTime: new Date() },
                { new: true }
            );
        } catch (err) {
            throw err;
        }
    }
    static async addChunk(sessionId, chunkData) {
        try {
            return await sessionModel.findByIdAndUpdate(
                sessionId,
                { $push: { chunks: chunkData } },
                { new: true }
            );
        } catch (err) {
            throw err;
        }
    }
}

module.exports = SessionService;
