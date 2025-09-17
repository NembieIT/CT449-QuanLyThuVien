const mongoose = require('mongoose');

const SACHSchema = new mongoose.Schema({
    TENSACH:String,
    DONGIA:String,
    SOQUYEN:String,
    NAMXUATBAN:String,
    MANXB:String,
    TACGIA:String
})
const SACHModel = mongoose.model('SACH', SACHSchema);

module.exports = SACHModel;