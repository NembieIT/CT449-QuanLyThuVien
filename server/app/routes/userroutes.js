const router = require('express').Router();
const AuthUserController = require('../controller/auth/AuthUserController');

// Auth User
router.post('/register', AuthUserController.registerUser);
router.post('/login', AuthUserController.loginUser);

module.exports = router;
