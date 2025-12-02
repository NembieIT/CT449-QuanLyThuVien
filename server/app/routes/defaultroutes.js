const router = require('express').Router();
const UserInformController = require('../controller/UserInformController');
const BorrowController = require("../controller/BorrowController");
const BooksController = require('../controller/BooksController');
const Authenticated = require("../controller/auth/Authenticated");

router.get('/inform', Authenticated.Authentication, UserInformController.getIDTT);
router.post('/inform', Authenticated.Authentication, UserInformController.addTT);
router.put('/inform', Authenticated.Authentication, UserInformController.updateTT);

router.get('/trangchu', BooksController.getAll);

router.post('/borrow', BorrowController.addBorrow);

module.exports = router;