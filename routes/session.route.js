const router = require("express").Router();
const SessionController = require('../controllers/session.controller');
const verifyToken = require('../middleware');

router.post("/upload-session", SessionController.createSession);
router.get("/fetch-session-by-patient/:patientId", SessionController.getSessionsByPatient);
router.patch("/upload-session/:sessionId", SessionController.completeSession);

module.exports = router;
