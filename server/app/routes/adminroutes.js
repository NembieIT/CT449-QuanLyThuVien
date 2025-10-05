const router = require('express').Router();
const NhanvienController = require('../controller/NHANVIENController');
const AuthADController = require('../controller/auth/AuthADController');

// Auth AD
router.post('/login', AuthADController.loginAD);

// CRUD nhan vien
router.get('/nv-list', NhanvienController.getAll);
router.post('/nv-list/search', NhanvienController.findNV);
router.put('/nv-list/edit/:id', NhanvienController.updateNV);
router.delete('/nv-list/delete/:id', NhanvienController.deleteNV);
router.post('/nv-list/add', NhanvienController.addNV);

// Thong bao den nhan vien

module.exports=router;