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
        default:"admin111"
    },
    role:{
        type:String,
        default:"NV"
    },
    addressNV:{
        type:String,
        required:true,
    },
    phoneNV:{
        type:String,
        required:true,
    },
    pin:{
        type:String,
        default:"1111"
    }
}, {timestamps:true});
const NhanvienModel = mongoose.model('Nhanvien', Nhanvien);

module.exports = NhanvienModel;