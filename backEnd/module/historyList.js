var mongoose = require("mongoose");
var db = require("./db");

var historyListSchema = new mongoose.Schema({
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
    reason:String
})

var historyListModel = mongoose.model("historyList",historyListSchema);

module.exports = historyListModel