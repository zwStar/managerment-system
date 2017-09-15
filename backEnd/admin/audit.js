import Base from './base'
import { getNamesBySnoOneTime,getCourseNamesOneTime } from "../utils/commonFunction"

let auditModel = require("../module/audit");

let auditAPI = new Base({
   model:auditModel
});

auditAPI.methods.findAuditedClass = function(req,res,callback){
    auditModel.find({
        workNumber:req.query.workNumber,
        startTime:{
            "$gte":req.query.startTime
        },
        endTime:{
            "$lte":req.query.endTime
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
                getNamesBySnoOneTime(result,function (error,data) { //获取所有排课记录中的学生姓名，将其添加到数据库返回的记录中
                    if(error)
                        reject(error);
                    else
                        resolve(data);
                })
            }).then(function (data) {
                        return new Promise((resolve,reject) =>{
                            getCourseNamesOneTime(result,function (error,data) {//获取所有排课记录中的课程名，将其添加到数据库返回记录中
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
export default auditAPI.methods;