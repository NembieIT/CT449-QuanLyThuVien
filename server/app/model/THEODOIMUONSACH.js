const mongoose = require('mongoose');

const BorrowBook = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DOCGIA',
        required: true,
    },
    bookid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SACH',
        required: true,
    },
    ngaymuon: {
        type: Date,
        required: true
    },
    ngaytra: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ["pending", "done", "late", "borrowing", "deny", "waiting"],
        default: "pending"
    },
    tienphat: {
        type: Number,
        default: 0
    },
    note: String
}, { timestamps: true })

const BorrowBookModel = mongoose.model('BorrowBook', BorrowBook);
module.exports = BorrowBookModel;