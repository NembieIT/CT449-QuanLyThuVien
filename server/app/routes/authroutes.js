const router = require("express").Router();
const AuthUserController = require('../controller/auth/AuthUserController');
const AuthADController = require("../controller/auth/AuthADController");
const AuthNVControler = require('../controller/auth/AuthNVController');

// Auth User
router.post('/register', AuthUserController.registerUser);
router.post('/login', AuthUserController.loginUser);

// Auth AD
router.post("/admin/login", AuthADController.loginAD);

// Auth NV
router.post('/nhanvien/login', AuthNVControler.loginNV);

module.exports = router;