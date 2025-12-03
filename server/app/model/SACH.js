const mongoose = require('mongoose');

const SACHSchema = new mongoose.Schema({
    TENSACH: String,
    DONGIA: String,
    SOQUYEN: Number,
    NAMXUATBAN: String,
    MANXB: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NHAXUATBAN'
    },
    TACGIA: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TACGIA'
    },
    IMAGEURL: String,
    DESC: String,
    FAV: {
        type: Number,
        default: 0
    },
    COMMENT: Array
})
const SACHModel = mongoose.model('SACH', SACHSchema);

module.exports = SACHModel;