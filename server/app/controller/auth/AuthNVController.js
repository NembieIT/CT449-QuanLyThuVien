const NhanvienModel = require("../../model/NHANVIEN");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const AuthNVControler = {
  loginNV: async (req, res) => {
    const validUsername = await NhanvienModel.findOne({
      usernameNV: req.body.username,
    });
    if (validUsername) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        validUsername.passwordNV
      );
      if (validPassword) {
        const accessToken = jwt.sign({username: req.body.username, role:'NV'}, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({
          EC: 1,
          accessToken,
          message: "Đăng nhập thành công ! ",
        });
      }
      return res.json({
        EC: 0,
        message: "Mật khẩu không chính xác ! ",
      });
    }
    return res.json({
      EC: 0,
      message: "Tài khoản không tồn tại ! ",
    });
  },
};

module.exports = AuthNVControler;
