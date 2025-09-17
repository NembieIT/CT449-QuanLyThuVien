const mongoose = require('mongoose');

const NXBScheme =  new mongoose.Schema({
    MANXB:String,
    TENNXB : String,
    DIACHI: String,
});
const NXBModel = mongoose.model('NHAXUATBAN', NXBScheme);

module.exports = NXBModel;