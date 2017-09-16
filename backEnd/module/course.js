/**
 * Created by Administrator on 2017/8/1.
 */
import mongoose from 'mongoose'
let db = require("./db.js")

let courseSchema = new mongoose.Schema({
    gradeNo: {type: String},
    courseNo: {type: String},
    courseName: {type: String},
});

let courseModel = mongoose.model("course", courseSchema);

module.exports = courseModel