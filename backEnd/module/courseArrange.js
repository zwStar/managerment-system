var mongoose = require("mongoose");
var db =require("./db.js")


var CourseArrangedSchema = new mongoose.Schema({
    workNumber: String,  //可教课程 },      //入职时间
    sno:String,
    courseNo:String,
    startTime:{ type: Date},
    endTime:{type:Date},
    courseNumber:String,
    courseHour:Number
});

var CourseArrangedModel = db.model("CourseArranged",CourseArrangedSchema);

module.exports = CourseArrangedModel