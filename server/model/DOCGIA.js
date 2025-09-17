const mongoose = require('mongoose');

const Docgia =  new mongoose.Schema({
    holot: {
        type:String,
        default:""
    },
    ten:{
        type:String,
        required:true,
    },
    ngaysinh:{
        type:Date,
        required:true,
    },
    sex:{
        type:Boolean,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    }
});
const DocgiaModel = mongoose.model('DOCGIA', Docgia);

module.exports = DocgiaModel;