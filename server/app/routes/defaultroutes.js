const router = require('express').Router();
const UserInformController = require('../controller/UserInformController');
const BorrowController = require("../controller/BorrowController");
const BooksController = require('../controller/BooksController');
const Authenticated = require("../controller/auth/Authenticated");
const NXBController = require("../controller/NXBController");
const AuthorController = require("../controller/AuthorController");

router.get('/inform', Authenticated.Authentication, UserInformController.getIDTT);
router.post('/inform', Authenticated.Authentication, UserInformController.addTT);
router.put('/inform', Authenticated.Authentication, UserInformController.updateTT);

router.get('/trangchu', BooksController.getAll);

router.post('/borrow', BorrowController.addBorrow);

router.get('/category/authors', AuthorController.getAll);
router.get('/category/nxb', NXBController.getAll);

module.exports = router;