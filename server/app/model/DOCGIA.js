const mongoose = require('mongoose');

const Docgia = new mongoose.Schema({
    holot: {
        type: String,
        default: ""
    },
    ten: {
        type: String
    },
    ngaysinh: {
        type: Date
    },
    sex: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    },
    usernameUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    borrowing: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BorrowBook'
        }
    ],
    favorite: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SACH'
        }
    ]
}, {
    timestamps: true
});
const DocgiaModel = mongoose.model('DOCGIA', Docgia);

module.exports = DocgiaModel;