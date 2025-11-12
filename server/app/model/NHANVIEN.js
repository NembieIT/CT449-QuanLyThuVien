const mongoose = require('mongoose');

const Nhanvien =  new mongoose.Schema({
    usernameNV:{
        type:String
    },
    nameNV: {
        type:String
    },
    passwordNV:{
        type:String
    },
    role:{
        type:String,
        default:"NV"
    },
    addressNV:{
        type:String,
    },
    phoneNV:{
        type:String,
    },
    pin:{
        type:String,
        default:"1111"
    }
}, {timestamps:true});
const NhanvienModel = mongoose.model('Nhanvien', Nhanvien);

module.exports = NhanvienModel;