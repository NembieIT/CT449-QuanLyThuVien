const BorrowBookModel = require('../model/THEODOIMUONSACH');
const BookModel = require('../model/SACH');
const UserModel = require('../model/DOCGIA');
const UserAccount = require('../model/USERACCOUNT');
const DocgiaController = require('../controller/UserController');

const BorrowController = {
    getAll: async (req, res) => {
        try {
            var result = await BorrowBookModel.find().sort({
                createdAt: -1
            })
                .populate('bookid')
                .populate('userid')
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
            const IsvalidBorrow = await BookModel.findOne({
                _id: req.body.bookid,
                SOQUYEN: { $gt: 0 }
            });
            const IsBorrowed = await BorrowBookModel.findOne({
                bookid: req.body.bookid,
                status: { $in: ['pending', 'borrowing'] }
            });
            if (IsBorrowed) {
                return res.json({
                    EC: 0,
                    message: "Bạn đang mượn sách này !"
                })
            }
            if (IsvalidBorrow) {
                const AccountBorrow = await UserAccount.findById(req.body.userid)
                const userBorrow = await UserModel.find({
                    usernameUser: req.body.userid
                }).populate('borrowing')
                if (userBorrow) {
                    var ngaytra;
                    const ngaymuon = new Date(req.body.ngaymuon);
                    const ngaymuonCal = ngaymuon.getTime();
                    if (req.body.ngaytra == 'threeday') {
                        ngaytra = new Date(ngaymuonCal + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN');
                    } else if (req.body.ngaytra == 'oneweek') {
                        ngaytra = new Date(ngaymuonCal + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN');
                    } else if (req.body.ngaytra == 'twoweek') {
                        ngaytra = new Date(ngaymuonCal + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN');
                    } else {
                        ngaytra = new Date(ngaymuonCal + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN');
                    }
                    const newBorrow = new BorrowBookModel({
                        userid: req.body.userid,
                        bookid: req.body.bookid,
                        ngaymuon: req.body.ngaymuon,
                        ngaytra: ngaytra,
                        status: req.body.status,
                        note: req.body.note
                    })
                    const savedBorrow = await newBorrow.save();
                    await BookModel.findByIdAndUpdate(
                        req.body.bookid,
                        { $inc: { SOQUYEN: -1 } },
                        { new: true }
                    );
                    if (req.body.status == 'borrowing') {
                        var isValid = true;
                        if (userBorrow.borrowing.length > 0) {
                            userBorrow.borrowing.forEach(async item => {
                                if (item.bookid == req.body.bookid) isValid = false
                            })
                        }
                        if (isValid) {
                            try {
                                userBorrow.borrowing.push(savedBorrow);
                                await UserModel.findByIdAndUpdate(req.body.userid, userBorrow)
                            } catch (err) {
                                console.log("Co loi khi updateUser borrowing");
                            }
                        } else {
                            return res.json({
                                EC: 0,
                                message: "Bạn đang mượn sách này !"
                            })
                        }
                    }
                    return res.status(200).json({
                        EC: 1
                    })
                } else {
                    return res.json({
                        EC: 0,
                        message: "Người dùng không tồn tại !"
                    })
                }
            }
            return res.status(200).json({
                EC: 0,
                message: "Sách đã hết ! "
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
    findBorrowID: async (req, res) => {
        try {
            const id = req.params.id;
            const borrow = await BorrowBookModel.findOne({
                _id: id
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
            var ngaytra;
            if (req.body.ngaytra) {
                const ngaymuon = new Date(req.body.ngaymuon);
                const ngaymuonCal = ngaymuon.getTime();
                if (req.body.ngaytra == 'threeday') {
                    ngaytra = new Date(ngaymuonCal + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN');
                } else if (req.body.ngaytra == 'oneweek') {
                    ngaytra = new Date(ngaymuonCal + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN');
                } else if (req.body.ngaytra == 'twoweek') {
                    ngaytra = new Date(ngaymuonCal + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN');
                } else {
                    ngaytra = new Date(ngaymuonCal + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('vi-VN');
                }
            } else {
                ngaytra = req.body.ngaytra
            }
            const updatedBorrow = await BorrowBookModel.findByIdAndUpdate(
                req.params.id || req.body.idborrow,
                {
                    userid: req.body.userid,
                    bookid: req.body.bookid,
                    ngaymuon: req.body.ngaymuon,
                    ngaytra: ngaytra,
                    status: req.body.status
                },
                { new: true }
            );
            if (updatedBorrow.status == 'deny' || updatedBorrow.status == 'done') {
                const user = await UserModel.findById(updatedBorrow.userid);
                user.borrowing = user.borrowing.filter(item => item != req.body.idborrow);
                await UserModel.findByIdAndUpdate(user._id, user);
                const updated = await BookModel.findByIdAndUpdate(
                    req.body.bookid,
                    { $inc: { SOQUYEN: 1 } },
                    { new: true }
                );
            } else if (updatedBorrow.status == 'borrowing') {
                try {
                    const user = await UserModel.findById(updatedBorrow.userid);
                    user.borrowing.push(req.body.idborrow);
                    await UserModel.findByIdAndUpdate(user._id, user)
                } catch (err) {
                    console.log("Co loi khi updateUser borrowing");
                }
            }
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