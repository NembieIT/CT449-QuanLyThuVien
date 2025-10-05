const mongoose = require('mongoose');

const BorrowBook = new mongoose.Schema({
    userid : {
        type: String,
        required:true,
    },
    userid:{
        type:String,
        required:true,
    },
    ngaymuon:{
        type:Date,
        required:true
    },
    ngaytra:{
        type:Date,
        default:null,
    },
    status: {
        type:String,
        enum:["pending", "done", "late", "borrowing"],
        default:"pending"
    }
}, {timestamps:true})

const BorrowBookModel = mongoose.model('BorrowBook', BorrowBook);
module.exports=BorrowBookModel;