const BooksModel = require('../model/SACH');

const BooksController = {
    getAll: async (req, res) => {
        try {
            const data = await BooksModel.find({});
            if(data){
                return res.status(200).json({
                    EC:1,
                    data
                })
            }
            return res.json({
                EC:0,
                message:"Không có dữ liệu ! "
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    addBook: async (req, res) => {
        try {
            const newBook = new BooksModel({
                TENSACH: req.body.tensach,
                DONGIA: req.body.dongia,
                SOQUYEN: req.body.soquyen,
                NAMXUATBAN: req.body.namxuatban,
                MANXB:req.body.manxb,
                TACGIA:req.body.tacgia
            })
            await newBook.save();
            return res.status(200).json({
                EC: 1
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    findBook: async (req, res) => {
        try {
            const book = await BooksModel.findOne({
                $or:[
                    { TENSACH : req.body.value },
                    { TACGIA : req.body.value }
                ]
            })
            if (!book) {
                return res.json({
                    EC: 0,
                    message: "Not Exist"
                })
            }
            return res.status(200).json({
                EC: 1,
                book
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    findBookByID: async (req, res) => {
        try {
            const id = req.params.id;
            const book = await BooksModel.findById({
                _id:id
            })
            if (!book) {
                return res.json({
                    EC: 0,
                    message: "Not Exist"
                })
            }
            return res.status(200).json({
                EC: 1,
                book
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    updateBook: async (req, res) => {
        try {
            const updatedBook = await BooksModel.findByIdAndUpdate(req.params.id,
                {
                    TENSACH: req.body.tensach,
                    DONGIA: req.body.dongia,
                    SOQUYEN: req.body.soquyen,
                    NAMXUATBAN: req.body.namxuatban,
                    MANXB:req.body.manxb,
                    TACGIA:req.body.tacgia
                }
                , { new: true });
            if (!updatedBook) {
                return res.json({
                    EC: 0,
                    messgae: "Không tìm thấy sách ! "
                })
            }
            return res.status(200).json({
                EC: 1,
                updatedBook
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    deleteBook: async (req, res) => {
        try {
            const deleted = await BooksModel.findByIdAndDelete(req.params.id);
            if (!deleted) {
                return res.json({
                    EC: 0,
                    message: "Không tìm thấy nhân viên"
                })
            }
            return res.status(200).json({
                EC: 1
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    }
}

module.exports = BooksController;