const mongoose = require('mongoose');

const Nhanvien = new mongoose.Schema({
    usernameNV: {
        type: String
    },
    nameNV: {
        type: String
    },
    passwordNV: {
        type: String
    },
    role: {
        type: String,
        default: "NV"
    },
    addressNV: {
        type: String,
    },
    phoneNV: {
        type: String,
    }
}, { timestamps: true });
const NhanvienModel = mongoose.model('Nhanvien', Nhanvien);

module.exports = NhanvienModel;