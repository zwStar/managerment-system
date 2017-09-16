/**
 * Created by Administrator on 2017/7/31.
 */
let mongoose = require("mongoose");
let db =require("./db.js");

let teacherSchema = new mongoose.Schema({
    workNumber:{ type:String },
    name:{ type:String },
    age:{ type: Number },
    sex:{ type:String },
    inductionDate:{ type:String },
    unpaidTime:{ type:Number },
    paidTime:{ type:Number },
    password:{ type:String },
    course:{type:Array},
    tel:{type:String}
});
let teacherModel = mongoose.model("teacher",teacherSchema);
module.exports = teacherModel

