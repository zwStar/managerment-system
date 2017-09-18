import Base from './base'
import { getNamesBySnoOneTime,getCourseNamesOneTime } from "../utils/commonFunction"

let historyListModel = require("../module/historyList");

let historyListAPI = new Base({
   model:historyListModel
});

historyListAPI.methods.findAuditedClass = function(req,res){
    historyListModel.find({
        workNumber:req.query.workNumber,
        startTime:{
            "$gte":req.query.startTime
        },
        endTime:{
            "$lte":req.query.endTime
        }
    },function(error,result){
        if(error){
            console.log("error in ./admin/historyList.js  21行");
            console.log(error);
            res.send("error");
        }
        
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
                        console.log("error in ./admin/historyList.js  60行");
                        console.log(error);
                        res.send("error");
                    })
                    .then(function (data) {
                        result = data;
                        res.send(data);
                    },function (error) {
                        console.log("error in ./admin/historyList.js  68行");
                        console.log(error);
                    })
            }
        });
}
export default historyListAPI.methods;