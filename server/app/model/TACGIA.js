const mongoose = require('mongoose');

const TacgiaSchema = new mongoose.Schema({
    MATACGIA: String,
    TENTACGIA: String,
}, {
    timestamps: true
})
const TacgiaModel = mongoose.model('TACGIA', TacgiaSchema);

module.exports = TacgiaModel;