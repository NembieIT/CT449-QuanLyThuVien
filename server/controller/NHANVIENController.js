const NhanvienModel = require('../model/NHANVIEN');

const NhanvienController = {
    getAll: async (req, res) => {
        try {
            const data = await NhanvienModel.find({});
            return res.status(200).json({
                EC: 1,
                data
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    addNV: async (req, res) => {
        try {
            const newNV = new NhanvienModel({
                ...req.body
            })
            await newNV.save();
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
    findNV: async (req, res) => {
        try {
            const NV = await NhanvienModel.findOne({
                usernameNV: req.body.usernameNV
            })
            if (!NV) {
                return res.json({
                    EC: 0,
                    message: "Not Exist"
                })
            }
            return res.status(200).json({
                EC: 1,
                NV
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    updateNV: async (req, res) => {
        try {
            const updatedNV = await NhanvienModel.findByIdAndUpdate(req.params.id, ...req.body, { new: true });
            if (!updatedNV) {
                return res.json({
                    EC: 0,
                    messgae: "Không tìm thấy nhân viên"
                })
            }
            return res.status(200).json({
                EC: 0,
                updatedNV
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    deleteNV: async (req, res) => {
        try {
            const deleted = await NhanvienModel.findByIdAndDelete(req.params.id);
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

module.exports = NhanvienController;