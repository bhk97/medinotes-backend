const sessionModel = require('../models/session.model');
const sessionService = require('../services/session.service');

exports.createSession = async (req, res, next) => {
    try {
        const { patientId, doctorId, patientName, templateId } = req.body;
        const session = await sessionService.createSession(patientId, doctorId, patientName, templateId);
        res.json({ status: true, sessionId: session._id });
    } catch (err) {
        next(err);
    }
};

exports.getSessionsByPatient = async (req, res, next) => {
    try {
        const { patientId } = req.params;
        const sessions = await sessionService.getSessionsByPatient(patientId);
        res.json({ status: true, sessions });
    } catch (err) {
        next(err);
    }
};

exports.completeSession = async (req, res, next) => {
  try {
    const { sessionId } = req.body;
    const session = await sessionModel.findById(sessionId);
    if (!session) return res.status(404).json({ status: false, message: 'Session not found' });

    session.status = "completed";
    session.endTime = new Date();
    await session.save();

    res.status(200).json({ status: true, message: 'Session completed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

