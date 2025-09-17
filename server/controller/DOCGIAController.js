const DocgiaModel = require('../model/DOCGIA');

const DocgiaController = {
    getAll: async (req, res) => {
        try {
            const data = await DocgiaModel.find({});
            return res.status(200).json({
                EC: 1,
                data
            });
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    addUser: async (req, res) => {
        try {
            const newUser = new DocgiaModel({
                ...req.body
            })
            await newUser.save();
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
    findUser: async (req, res) => {
        try {
            const fullName = req.body.name;
            const user = await DocgiaModel.find({
                $or: [
                    { holot: req.body.name },
                    { ten: req.body.name }
                ]
            });
            if(!user){
                return res.json({
                    EC:0,
                    message:"Not Exist"
                })
            }
            return res.status(200).json({
                EC: 1,
                user
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    updateUser: async (req, res) => {
        try {
            const updatedUser = await DocgiaModel.findByIdAndUpdate(req.params.id, ...req.body, { new: true });
            if (!updatedUser) {
                return res.json({
                    EC: 0,
                    messgae: "Không tìm thấy độc giả"
                })
            }
            return res.status(200).json({
                EC: 0,
                updatedUser
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const deleted = await DocgiaModel.findByIdAndDelete(req.params.id);
            if (!deleted) {
                return res.json({
                    EC: 0,
                    message: "Không tìm thấy độc giả"
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

module.exports = DocgiaController;