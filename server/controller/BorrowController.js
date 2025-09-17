const BorrowBookModel = require('../model/THEODOIMUONSACH');

const BorrowController = {
    getAll: async (req, res) => {
        try {
            const result = await BorrowBookModel.aggregate([
                {
                    $facet: {
                        data: [{ $sort: { createdAt: -1 } }],
                        pending: [{ $match: { status: "pending" } }, { $count: "count" }],
                        borrowing: [{ $match: { status: "borrowing" } }, { $count: "count" }],
                        late: [{ $match: { status: "late" } }, { $count: "count" }],
                        done: [{ $match: { status: "done" } }, { $count: "count" }],
                    }
                }
            ]);
            if (result) {
                return res.status(200).json({
                    EC: 1,
                    result
                })
            }
            return res.json({
                EC: 0,
                message: "Không có dữ liệu ! "
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    addBorrow: async (req, res) => {
        try {
            const IsvalidBorrow = await BorrowBookModel.findOne({
                _id: req.params.id,
                soluong: { $gt: 0 }
            });
            if (IsvalidBorrow) {
                const newBorrow = new BorrowBookModel({
                    ...req.body
                })
                await newBorrow.save();
                return res.status(200).json({
                    EC:1
                })
            }
            return res.status(200).json({
                EC: 0,
                message:"Sách đã hết ! "
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    findBorrow: async (req, res) => {
        try {
            const borrow = await BorrowBookModel.findOne({
                $or: [
                    { userid: req.body.value },
                    { userid: req.body.value }
                ]
            })
            if (!borrow) {
                return res.json({
                    EC: 0,
                    message: "Not Exist"
                })
            }
            return res.status(200).json({
                EC: 1,
                borrow
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    updateBorrow: async (req, res) => {
        try {
            const updatedBorrow = await BorrowBookModel.findByIdAndUpdate(req.params.id, ...req.body, { new: true });
            if (!updatedBorrow) {
                return res.json({
                    EC: 0,
                    messgae: "Không tìm thấy đơn ! "
                })
            }
            return res.status(200).json({
                EC: 1,
                updatedBorrow
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    deleteBorrow: async (req, res) => {
        try {
            const deleted = await BorrowBookModel.findByIdAndDelete(req.params.id);
            if (!deleted) {
                return res.json({
                    EC: 0,
                    message: "Không tìm thấy đơn ! "
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

module.exports = BorrowController;