const AdminModel = require('../../model/ADMIN');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const AuthAdminController = {
    loginAD: async (req, res) => {
        const validUsername = await AdminModel.findOne({
            usernameAD: req.body.username
        })
        if (validUsername) {
            const validPassword = await bcrypt.compare(req.body.password, validUsername.passwordAD);
            if (validPassword) {
                const accessToken = jwt.sign({username: req.body.username, role:'NV', id:validUsername._id}, process.env.ACCESS_TOKEN_SECRET);
                return res.status(200).json({
                    EC: 1,
                    accessToken,
                    message: "Đăng nhập thành công ! "
                })
            }
            return res.json({
                EC: 0,
                message: "Mật khẩu không chính xác ! "
            })
        }
        return res.json({
            EC: 0,
            message: "Tài khoản không tồn tại ! "
        })
    },
    // regAD: async (req, res) => {
    //     try {
    //         const genSalt = await bcrypt.genSalt(Number(process.env.NODE_GENSALT || 10));
    //         const hashed = await bcrypt.hash(req.body.password, genSalt);
    //         const newAD = new AdminModel({
    //             usernameAD: req.body.username,
    //             passwordAD: hashed,
    //         })
    //         await newAD.save();
    //         return res.status(200).json({
    //             EC: 1,
    //             message: "Đăng ký thành công ! "
    //         })
    //     } catch (err) {
    //         console.log("Loi backend", err);
    //         return res.json({
    //             EC: 0,
    //             message: "Có lỗi ở backend"
    //         });
    //     }
    // }
}
module.exports = AuthAdminController;