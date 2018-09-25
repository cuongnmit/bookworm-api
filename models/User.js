var mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        email: { type: String, required: true, lowercase: true },
        passwordHash: { type: String }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', schema);
