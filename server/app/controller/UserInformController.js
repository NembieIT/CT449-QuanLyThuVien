const DocgiaModel = require("../model/DOCGIA");
const dotenv = require("dotenv");

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
      const deleted = await DocgiaModel.findByIdAndDelete(req.params.id);
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
