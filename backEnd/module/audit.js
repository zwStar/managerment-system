var mongoose = require("mongoose");
var db = require("./db");
/* var student = require("../admin/student").default;
var course = require("./course"); */


var auditSchema = new mongoose.Schema({
    workNumber: {type: String},
    sno: {type:String},
    courseNo: {type:String},
    startTime:{ type: Date},
    endTime:{type:Date},
    courseNumber:{type:String},
    courseHour:{type:Number},
    realCourseTime:{type:Number},//实际课时
    remark:{type:String},       //备注
    photoEvidencePath:{type:String},//拍照取证图片名称
    returnVisitPath:{type:String},   //微信回访图片名称
    status:{type:String}
})


var auditModel = mongoose.model("audit",auditSchema);

module.exports = auditModel;