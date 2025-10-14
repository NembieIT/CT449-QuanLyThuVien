const router = require("express").Router();
const NhanvienController = require("../controller/NHANVIENController");
const AuthADController = require("../controller/auth/AuthADController");
const AuthUserController = require("../controller/auth/AuthUserController");
const UserController = require("../controller/UserController");
const BooksController = require("../controller/BooksController");
const BorrowController = require("../controller/BorrowController");
const NXBController = require("../controller/NXBController");

// Auth AD
router.post("/login", AuthADController.loginAD);

// CRUD nhan vien
router.get("/nhanvien", NhanvienController.getAll);
router.post("/nhanvien/search", NhanvienController.findNV);
router.put("/nhanvien/edit/:id", NhanvienController.updateNV);
router.delete("/nhanvien/delete/:id", NhanvienController.deleteNV);
router.post("/nhanvien/add", NhanvienController.addNV);

// CRUD user (done)
router.get("/user", UserController.getAll);
router.post("/adduser", UserController.addUserInfo);
router.post("/adduser/account", AuthUserController.registerUser);
router.get("/user/:id", UserController.findUser);
router.get("/adduser/:id", UserController.findUserByID);
router.put("/user/edit/:id", UserController.updateUser);
router.delete("/user/:id", UserController.deleteUser);

// CRUD Books
router.get("/books", BooksController.getAll);
router.post("/books/search", BooksController.findBook);
router.put("/books/edit/:id", BooksController.updateBook);
router.delete("/books/delete/:id", BooksController.deleteBook);

// CRUD NXB
router.get("/nxb", NXBController.getAll);
router.post("/nxb/search", NXBController.findNXB);
router.put("/nxb/edit/:id", NXBController.updateNXB);
router.delete("/nxb/delete/:id", NXBController.deleteNXB);

// CRUD BorrowBook
router.get("/borrow", BorrowController.getAll);
router.post("/borrow/search", BorrowController.findBorrow);
router.put("/borrow/edit/:id", BorrowController.updateBorrow);
router.delete("/borrow/delete/:id", BorrowController.deleteBorrow);

module.exports = router;
