var mongoose = require("mongoose");
var db = require("./db");
var student = require("../admin/student").default;
var course = require("./course")

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

auditSchema.statics.findAuditedClass = function(data,callback){
    this.find({
        workNumber:data.workNumber,
        startTime:{
            "$gte":data.startTime
        },
        endTime:{
            "$lte":data.endTime
        }
    },function(error,result){
        if(error)
            callback(error,null);
        else{
            for( var i = 0 ; i < result.length ; i++ ){
                var obj = {
                    workNumber:result[i].workNumber,
                    sno:result[i].sno,
                    courseNo:result[i].courseNo,
                    startTime:result[i].startTime,
                    endTime:result[i].endTime,
                    courseNumber:result[i].courseNumber,
                    courseHour:result[i].courseHour,
                    status:result[i].status,
                    realCourseTime:result[i].realCourseTime,
                    remark:result[i].remark,
                    photoEvidencePath:result[i].photoEvidencePath,
                    returnVisitPath:result[i].returnVisitPath
                }
                result[i] = obj;
            }
            new Promise((resolve,reject)=>{             
                student.getNamesBySnoOneTime(result,function (error,data) { //获取所有排课记录中的学生姓名，将其添加到数据库返回的记录中
                    if(error)
                        reject(error);
                    else
                        resolve(data);
                })
            }).then(function (data) {
                        return new Promise((resolve,reject) =>{
                            course.getCourseNamesOneTime(result,function (error,data) {//获取所有排课记录中的课程名，将其添加到数据库返回记录中
                                if(error)
                                    reject(error);
                                else
                                    resolve(data);                                                                
                            });
                        });
                    },function (error) {
                        callback(error,null);
                    })
                    .then(function (data) {
                        result = data;
                        callback(null,result);
                    },function (error) {
                        callback(error,null);
                    })
            }
        });
}


var auditModel = db.model("audit",auditSchema);

module.exports = auditModel;