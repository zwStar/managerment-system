/**
 * Created by Administrator on 2017/7/31.
 */
var mongoose = require("mongoose");
var db = require("./db.js")

var teacherSchema = new mongoose.Schema({
    workNumber:{ type:String },
    name:{ type:String },
    age:{ type: Number },
    sex:{ type:String },
    inductionDate:{ type:String },
    unpaidTime:{ type:Number },
    paidTime:{ type:Number },
    password:{ type:String }
});

var teacherModel = db.model("teacher",teacherSchema);

module.exports = teacherModel

