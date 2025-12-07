const DocgiaModel = require("../model/DOCGIA");
const UserAccModel = require("../model/USERACCOUNT");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

dotenv.config();
const UserInformController = {
  getIDTT: async (req, res) => {
    try {
      const data = await DocgiaModel.find({
        usernameUser: req.query.id
      });
      return res.status(200).json({
        EC: 1,
        data,
      });
    } catch (err) {
      console.log("Loi backend", err);
      return res.json({
        EC: 0,
        message: "Có lỗi ở backend",
      });
    }
  },
  addTT: async (req, res) => {
    try {
      const newTT = new DocgiaModel({
        usernameUser: req.body.id,
        holot: req.body.holot,
        ten: req.body.ten,
        ngaysinh: req.body.ngaysinh,
        sex: req.body.sex,
        address: req.body.address,
        phone: req.body.phone
      });
      await newTT.save();
      return res.status(200).json({
        EC: 1,
      });
    } catch (err) {
      console.log("Loi backend", err);
      return res.json({
        EC: 0,
        message: "Có lỗi ở backend",
      });
    }
  },
  updateTT: async (req, res) => {
    try {
      if (req.body.oldpasswd) {
        const docgia = await DocgiaModel.findById(req.body.id);
        const accUser = await UserAccModel.findOne({ _id: docgia.usernameUser });
        const validPassword = await bcrypt.compare(req.body.oldpasswd, accUser.passwordUser);
        if (validPassword) {
          const genSalt = await bcrypt.genSalt(Number(process.env.NODE_GENSALT || 10));
          const hashed = await bcrypt.hash(req.body.newpasswd, genSalt);
          const updatedAcc = await UserAccModel.findByIdAndUpdate(
            accUser._id,
            {
              passwordUser: hashed
            }
          )
        } else {
          return res.json({
            EC: 0,
            message: "Mật khẩu cũ không đúng !"
          })
        }
      }
      const updatedTT = await DocgiaModel.findByIdAndUpdate(
        req.body.id,
        {
          holot: req.body.holot,
          ten: req.body.ten,
          ngaysinh: req.body.ngaysinh,
          sex: req.body.sex,
          address: req.body.address,
          phone: req.body.phone,
          usernameuser: req.body.usernameuser,
          favorite: req.body.favorite
        },
        { new: true }
      );
      if (!updatedTT) {
        return res.json({
          EC: 0,
          messgae: "Không tìm thấy thông tin người dùng",
        });
      }
      return res.status(200).json({
        EC: 1,
        updatedTT,
      });
    } catch (err) {
      console.log("Loi backend", err);
      return res.json({
        EC: 0,
        message: "Có lỗi ở backend",
      });
    }
  },
  deleteTT: async (req, res) => {
    try {
      const deleted = await DocgiaModel.findOneAndDelete({
        usernameUser: req.params.id
      });
      if (!deleted) {
        return res.json({
          EC: 0,
          message: "Không tìm thấy nguoi dung",
        });
      }
      return res.status(200).json({
        EC: 1,
      });
    } catch (err) {
      console.log("Loi backend", err);
      return res.json({
        EC: 0,
        message: "Có lỗi ở backend",
      });
    }
  },
};

module.exports = UserInformController;
