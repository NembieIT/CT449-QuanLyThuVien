const NXBModel = require('../model/NXB');

const NXBController = {
    getAll: async (req, res) => {
        try {
            const data = await NXBModel.find({});
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
    addNXB: async (req, res) => {
        try {
            const IsvalidNXB = await NXBModel.findOne({
                $or:[
                    { MANXB : req.body.manxb },
                    { TENNXB : req.body.tennxb }
                ]
            })
            if(IsvalidNXB){
                return res.json({
                    EC:0,
                    message:"Đã tồn tại NXB ! "
                })
            }
            const newNXB = new NXBModel({
                ...req.body
            })
            await newNXB.save();
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
    findNXB: async (req, res) => {
        try {
            const nxb = await NXBModel.findOne({
                $or:[
                    { MANXB : req.body.value },
                    { TENNXB : req.body.value }
                ]
            })
            if (!nxb) {
                return res.json({
                    EC: 0,
                    message: "Not Exist"
                })
            }
            return res.status(200).json({
                EC: 1,
                nxb
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    updateNXB: async (req, res) => {
        try {
            const updatedNXB = await NXBModel.findByIdAndUpdate(req.params.id, ...req.body, { new: true });
            if (!updatedNXB) {
                return res.json({
                    EC: 0,
                    messgae: "Không tìm thấy NXB ! "
                })
            }
            return res.status(200).json({
                EC: 1,
                updatedNXB
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
    deleteNXB: async (req, res) => {
        try {
            const deleted = await NXBModel.findByIdAndDelete(req.params.id);
            if (!deleted) {
                return res.json({
                    EC: 0,
                    message: "Không tìm thấy NXB"
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

module.exports = NXBController;