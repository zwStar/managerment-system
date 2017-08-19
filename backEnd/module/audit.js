var mongoose = require("mongoose");
var db = require("./db");

var auditSchema = new mongoose.Schema({
    workNumber: {type: String},
    sno: {type:String},
    courseNo: {type:String},
    startTime:{ type: Date},
    endTime:{type:Date},
    courseNumber:{type:String},
    courseHour:{type:Number},

    realCourseTime:this.realCourseTime,//实际课时
    remark:{type:String},
    photoEvidencePath:{type:String},
    returnVisitPath:{type:String}
})

var auditModel = db.model("audit",auditSchema);

module.exports = auditModel;