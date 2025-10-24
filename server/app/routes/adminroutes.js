const router = require("express").Router();
const NhanvienController = require("../controller/NHANVIENController");
const AuthADController = require("../controller/auth/AuthADController");
const AuthUserController = require("../controller/auth/AuthUserController");
const AuthNVController = require("../controller/auth/AuthNVController");
const UserController = require("../controller/UserController");
const BooksController = require("../controller/BooksController");
const BorrowController = require("../controller/BorrowController");
const NXBController = require("../controller/NXBController");

// Auth AD
router.post("/admin/login", AuthADController.loginAD);

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

// CRUD Books
router.get("/books", BooksController.getAll);
router.post("/books/search", BooksController.findBook);
router.put("/books/edit/:id", BooksController.updateBook);
router.delete("/books/delete/:id", BooksController.deleteBook);

// CRUD NXB (done)
router.get("/nxb", NXBController.getAll);
router.get("/nxb/:id", NXBController.findNXB);
router.post("/addnxb", NXBController.addNXB);
router.put("/nxb/edit/:id", NXBController.updateNXB);
router.delete("/nxb/:id", NXBController.deleteNXB);

// CRUD BorrowBook
router.get("/borrow", BorrowController.getAll);
router.post("/borrow/search", BorrowController.findBorrow);
router.put("/borrow/edit/:id", BorrowController.updateBorrow);
router.delete("/borrow/delete/:id", BorrowController.deleteBorrow);

module.exports = router;
