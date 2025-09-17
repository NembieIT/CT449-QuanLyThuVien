const router = require('express').Router();
const DocgiaController = require('../controller/DOCGIAController');

router.get('/nhanvien', DocgiaController.getAll);
router.post('/register', DocgiaController.addUser);
router.post('/nhanvien/search', DocgiaController.findUser);

module.exports=router;