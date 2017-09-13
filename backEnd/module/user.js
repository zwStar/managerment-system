
import mongoose from 'mongoose'
import './db'

const userSchema = new mongoose.Schema({
    email: String,
    password: String,           //密码
});

let userModel = mongoose.model("user",userSchema);

module.exports = userModel;