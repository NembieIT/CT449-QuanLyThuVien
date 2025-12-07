const TacgiaModel = require('../model/TACGIA');

function normalizeName(str) {
    return str
        .normalize("NFD")                    // tách dấu
        .replace(/[\u0300-\u036f]/g, "")     // bỏ dấu
        .toLowerCase()                       // về lowercase
        .trim()
        .replace(/\s+/g, " ");               // gom khoảng trắng
}

const AuthorController = {
    getAll: async (req, res) => {
        try {
            const data = await TacgiaModel.find({}).sort({ createdAt: -1 });
            if (data) {
                return res.status(200).json({
                    EC: 1,
                    data
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
    addAuthor: async (req, res) => {
        try {
            const IsvalidAuthor = await TacgiaModel.findOne({
                $or: [{ MATACGIA: req.body.matacgia || req.body.matacgianew }],
            });
            if (IsvalidAuthor) {
                return res.json({
                    EC: 0,
                    message: "Đã tồn tại mã tác giả này !"
                });
            }
            const inputName = normalizeName(req.body.tentacgia || req.body.tentacgianew);
            const authors = await TacgiaModel.find({});
            const existed = authors.find(author => {
                return normalizeName(author.TENTACGIA) === inputName;
            });
            if (existed) {
                return res.json({ EC: 0, message: "Tên tác giả đã tồn tại!" });
            }
            const newAuthor = new TacgiaModel({
                MATACGIA: req.body.matacgia || req.body.matacgianew,
                TENTACGIA: req.body.tentacgia || req.body.tentacgianew
            })
            await newAuthor.save();
            return res.status(200).json({
                EC: 1,
                data: newAuthor
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    findAuthor: async (req, res) => {
        try {
            const author = await TacgiaModel.findOne({
                $or: [
                    { MATACGIA: req.body.value },
                    { TENTACGIA: req.body.value }
                ]
            })
            if (!author) {
                return res.json({
                    EC: 0,
                    message: "Not Exist"
                })
            }
            return res.status(200).json({
                EC: 1,
                author
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    findAuthorByID: async (req, res) => {
        try {
            const id = req.params.id;
            const author = await TacgiaModel.findById({
                _id: id
            })
            if (!author) {
                return res.json({
                    EC: 0,
                    message: "Not Exist"
                })
            }
            return res.status(200).json({
                EC: 1,
                author
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    updateAuthor: async (req, res) => {
        try {
            const updatedAuthor = await TacgiaModel.findByIdAndUpdate(req.params.id,
                {
                    MATACGIA: req.body.matacgia,
                    TENTACGIA: req.body.tentacgia,
                }
                , { new: true });
            if (!updatedAuthor) {
                return res.json({
                    EC: 0,
                    messgae: "Không tìm thấy tác giả ! "
                })
            }
            return res.status(200).json({
                EC: 1,
                updatedAuthor
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    deleteAuthor: async (req, res) => {
        try {
            const deleted = await TacgiaModel.findByIdAndDelete(req.params.id);
            if (!deleted) {
                return res.json({
                    EC: 0,
                    message: "Không tìm thấy tác giả"
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

module.exports = AuthorController;