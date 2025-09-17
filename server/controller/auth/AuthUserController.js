const UserAccModel = require('../../model/USERACCOUNT');

const UserAccController = {
    loginUser: async (req, res) => {
        const validUsername = await UserAccModel.findOne({
            usernameUser: req.body.username
        })
        if (validUsername) {
            const validPassword = (req.body.password === validUsername.passwordUser);
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
            const newUser = new UserAccModel({
                ...req.body
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