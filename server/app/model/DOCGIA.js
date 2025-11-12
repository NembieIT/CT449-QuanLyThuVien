const mongoose = require('mongoose');

const Docgia = new mongoose.Schema({
    holot: {
        type: String,
        default: ""
    },
    ten: {
        type: String,
        required: true,
    },
    ngaysinh: {
        type: Date,
        required: true,
    },
    sex: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    usernameUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    borrowing: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BorrowBook'
    }]
});
const DocgiaModel = mongoose.model('DOCGIA', Docgia);

module.exports = DocgiaModel;