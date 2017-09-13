var mongoose = require("mongoose");
var db =require("./db.js")
<<<<<<< HEAD
=======
var teacher = require("./teacher")
>>>>>>> e5d45a64e216d0094773bf6d9e9a5b2a84e24cec

var CourseArrangedSchema = new mongoose.Schema({
    workNumber: String,  
    sno:String,
    courseNo:String,
    startTime:{ type: Date},
    endTime:{type:Date},
    courseNumber:String,
    courseHour:Number,
    status:{type:String,default:'未审核'},
    realCourseTime:{type:Number},//实际课时
    remark:{type:String},       //备注
    photoEvidencePath:{type:String},//拍照取证图片名称
    returnVisitPath:{type:String},   //微信回访图片名称
    reason:String                   //被撤回的原因
});

let CourseArrangedModel = mongoose.model("CourseArranged",CourseArrangedSchema);

<<<<<<< HEAD
module.exports = CourseArrangedModel
=======
var CourseArrangedModel = mongoose.model("CourseArranged",CourseArrangedSchema);

module.exports = CourseArrangedModel
>>>>>>> e5d45a64e216d0094773bf6d9e9a5b2a84e24cec
