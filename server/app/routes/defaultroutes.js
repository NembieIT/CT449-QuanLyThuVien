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
router.get('/trangchu/borrow/:id', BorrowController.findBorrow);

router.post('/updateBook/:id', BooksController.updateBook);

router.get('/borrow', Authenticated.Authentication, (req, res) => { return res.status(200) });
router.post('/borrow', BorrowController.addBorrow);
router.get('/borrow/:id', BooksController.findBookByID);
router.put('/borrow/waiting/:id', BorrowController.updateBorrow);

router.get('/category/authors', AuthorController.getAll);
router.get('/category/nxb', NXBController.getAll);

router.get('/favorite', Authenticated.Authentication, (req, res) => { return res.status(200) });

module.exports = router;