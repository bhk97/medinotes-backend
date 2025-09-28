const router = require("express").Router();
const UserController = require('../controllers/patient.controller');
const verifyToken = require('../middleware');

router.post("/register",UserController.register);
router.post("/login",UserController.login);
router.post("/getUser",UserController.getUser);
router.put("/updateUser/:userid",UserController.updateUser)



module.exports = router;