const router = require('express').Router();
const UserController = require('../controller/UserController');
const AuthNVControler = require('../controller/auth/AuthNVController');

// Auth NV
router.post('/login', AuthNVControler.loginNV);

// CRUD user
router.get('/user-list', UserController.getAll);
router.post('/user-list/search', UserController.findUser);
router.put('/user-list/edit/:id', UserController.updateUser);
router.delete('/user-list/delete/:id', UserController.deleteUser);

module.exports=router;