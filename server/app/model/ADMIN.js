const mongoose = require('mongoose');

const AdminScheme = new mongoose.Schema({
    usernameAD:{
        type:String,
        required:true
    },
    passwordAD:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"AD"
    }
})
const AdminModel = mongoose.model('Admin', AdminScheme);
module.exports = AdminModel;