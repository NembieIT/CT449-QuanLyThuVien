const AdminModel = require('../../model/ADMIN');

const AuthAdminController = {
    loginAD: async (req, res) => {
        const validUsername = await AdminModel.findOne({
            usernameAD: req.body.username
        })
        if (validUsername) {
            const validPassword = (req.body.password === validUsername.passwordAD);
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
}
module.exports = AuthAdminController;