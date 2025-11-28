const router = require('express').Router();
const UserInformController = require('../controller/UserInformController');
const Authenticated = require("../controller/auth/Authenticated");

router.get('/inform', Authenticated.Authentication, UserInformController.getIDTT);
router.post('/inform', Authenticated.Authentication, UserInformController.addTT);
router.put('/inform', Authenticated.Authentication, UserInformController.updateTT);

module.exports = router;