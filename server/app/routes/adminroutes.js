const router = require("express").Router();
const NhanvienController = require("../controller/NHANVIENController");
const AuthUserController = require("../controller/auth/AuthUserController");
const UserController = require("../controller/UserController");
const BooksController = require("../controller/BooksController");
const BorrowController = require("../controller/BorrowController");
const NXBController = require("../controller/NXBController");


// CRUD nhan vien (done)
router.get("/nhanvien", NhanvienController.getAll);
router.post("/addnv", NhanvienController.addNV);
router.get("/nhanvien/:id", NhanvienController.findNV);
router.put("/nhanvien/edit/:id", NhanvienController.updateNV);
router.delete("/nhanvien/:id", NhanvienController.deleteNV);

// CRUD user (done)
router.get("/user", UserController.getAll);
router.post("/adduser", UserController.addUserInfo);
router.post("/adduser/account", AuthUserController.registerUser);
router.get("/user/:id", UserController.findUser);
router.get("/adduser/:id", UserController.findUserByID);
router.put("/user/edit/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

// CRUD Books (done)
router.get("/books", BooksController.getAll);
router.get("/books/:id", BooksController.findBookByID);
router.post("/addbook/", BooksController.addBook);
router.put("/books/edit/:id", BooksController.updateBook);
router.delete("/books/:id", BooksController.deleteBook);

// CRUD NXB (done)
router.get("/nxb", NXBController.getAll);
router.get("/nxb/:id", NXBController.findNXB);
router.post("/addnxb", NXBController.addNXB);
router.put("/nxb/edit/:id", NXBController.updateNXB);
router.delete("/nxb/:id", NXBController.deleteNXB);

// CRUD BorrowBook
router.get("/borrow", BorrowController.getAll);
router.get("/borrow/:id", BorrowController.findBorrowID);
router.post("/addborrow", BorrowController.addBorrow);
router.put("/borrow/edit/:id", BorrowController.updateBorrow);
router.delete("/borrow/:id", BorrowController.deleteBorrow);

module.exports = router;
