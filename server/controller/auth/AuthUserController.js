const UserAccModel = require('../../model/USERACCOUNT');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();

const UserAccController = {
    loginUser: async (req, res) => {
        const validUsername = await UserAccModel.findOne({
            usernameUser: req.body.username
        })
        if (validUsername) {
            const validPassword = await bcrypt.compare(req.body.password, validUsername.passwordUser);
            if (validPassword) {
                return res.status(200).json({
                    EC: 1,
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
    registerUser: async (req, res) => {
        try {
            const IsvalidUsername = await UserAccModel.findOne({
                $or: [
                    { usernameUser: req.body.username },
                    { emailUser: req.body.email }
                ]
            })
            if (IsvalidUsername) {
                return res.json({
                    EC: 0,
                    message: "Username hoặc email đã tồn tại ! "
                })
            }
            const genSalt = await bcrypt.genSalt(Number(process.env.NODE_GENSALT));
            const hashed = await bcrypt.hash(req.body.password, genSalt);
            const newUser = new UserAccModel({
                usernameUser:req.body.username,
                emailUser:req.body.email,
                passwordUser:hashed,
            })
            await newUser.save();
            return res.status(200).json({
                EC: 1,
                message: "Đăng ký thành công ! "
            })
        } catch (err) {
            console.log("Loi backend", err);
            return res.json({
                EC: 0,
                message: "Có lỗi ở backend"
            });
        }
    },
}
module.exports = UserAccController;