const router = require("express").Router();
const UserController = require('../controllers/doctor.controller');
const verifyToken = require('../middleware');

router.post("/register",UserController.register);
router.post("/login",UserController.login);
router.post("/getUser",UserController.getUser);
router.put("/updateUser/:userid",UserController.updateUser)
router.get("/getAllUser/:doctor_id", UserController.getAllUser)





module.exports = router;