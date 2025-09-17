const mongoose = require('mongoose');

const Nhanvien =  new mongoose.Schema({
    usernameNV:{
        type:String,
        required:true
    },
    nameNV: {
        type:String,
        required:true
    },
    passwordNV:{
        type:String,
        required:true
    },
    chucvu:{
        type:String,
        enum:["Nhân viên", "Admin"],
        default:"Nhân viên",
        required:true,
    },
    addressNV:{
        type:String,
        required:true,
    },
    phoneNV:{
        type:String,
        required:true,
    }
});
const NhanvienModel = mongoose.model('Nhanvien', Nhanvien);

module.exports = NhanvienModel;