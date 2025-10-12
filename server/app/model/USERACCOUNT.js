const mongoose = require('mongoose');

const UserAccScheme = new mongoose.Schema({
    usernameUser: {
        type: String,
        required: true
    },
    passwordUser: {
        type: String,
        required: true
    },
    emailUser: {
        type: String,
        default: "admin@admin.admin"
    },
    role: {
        type: String,
        default: "USER"
    }
}, { timestamps: true });
const UserAccModel = mongoose.model('User', UserAccScheme);
module.exports = UserAccModel;