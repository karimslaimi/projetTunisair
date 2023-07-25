const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        userName: String,
        email: String,
        password: String,
        resetPasswordToken: String,
        resetPasswordExpires: String,
        role: String,
        token: String

    })
);

module.exports = User;