const mongoose = require('mongoose');

const SACHSchema = new mongoose.Schema({
    TENSACH:String,
    DONGIA:String,
    SOQUYEN:Number,
    NAMXUATBAN:String,
    MANXB:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NXB'
    },
    TACGIA:String
})
const SACHModel = mongoose.model('SACH', SACHSchema);

module.exports = SACHModel;