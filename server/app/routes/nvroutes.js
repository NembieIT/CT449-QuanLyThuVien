const router = require('express').Router();
const UserController = require('../controller/UserController');
const AuthNVControler = require('../controller/auth/AuthNVController');
const BooksController = require('../controller/BooksController');
const NXBController = require('../controller/NXBController');
const BorrowController = require('../controller/BorrowController');

// Auth NV
router.post('/login', AuthNVControler.loginNV);

// CRUD user
router.get('/user-list', UserController.getAll);
router.post('/user-list/search', UserController.findUser);
router.put('/user-list/edit/:id', UserController.updateUser);
router.delete('/user-list/delete/:id', UserController.deleteUser);

// CRUD Books
router.get('/books', BooksController.getAll);
router.post('/books/search', BooksController.findBook);
router.put('/books/edit/:id', BooksController.updateBook);
router.delete('/books/delete/:id', BooksController.deleteBook);

// CRUD NXB
router.get('/nxb', NXBController.getAll);
router.post('/nxb/search', NXBController.findNXB);
router.put('/nxb/edit/:id', NXBController.updateNXB);
router.delete('/nxb/delete/:id', NXBController.deleteNXB);

// CRUD BorrowBook
router.get('/borrow', BorrowController.getAll);
router.post('/borrow/search', BorrowController.findBorrow);
router.put('/borrow/edit/:id', BorrowController.updateBorrow);
router.delete('/borrow/delete/:id', BorrowController.deleteBorrow);

module.exports=router;