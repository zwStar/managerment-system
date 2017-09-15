/**
 * Created by Administrator on 2017/8/11.
 */
import Base from './base'
import Models from '../module'
import student from "./student"
import course from '../module/course'
import { getNamesBySnoOneTime,getCourseNamesOneTime,getTeacherNamesOneTime } from "../utils/commonFunction"


import CourseArrangedModel from '../module/courseArrange'   //课程安排表
import StudentModel from '../module/student'   
import teacherModel from "../module/teacher"
import historyListModel from "../module/historyList"
import $ from '../utils'

let CourseArrangedAPI = new Base({
    model: CourseArrangedModel
});

CourseArrangedAPI.methods.findArrangeClass = function(req,res,callback){
    CourseArrangedModel.find({
        workNumber:req.query.workNumber,
        startTime:{
            "$gte":req.query.startTime
        },
        endTime:{
            "$lte":req.query.endTime
        }
    } ,function (error,result) {
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
                reason:result[i].reason,
                photoEvidencePath:result[i].photoEvidencePath,
                returnVisitPath:result[i].returnVisitPath
            }
            result[i] = obj;
        }
        if(error)
            callback(error,null);
        else{
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
                            })
                        })
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

CourseArrangedAPI.methods.findAuditingClass = function(req,res){
    CourseArrangedModel.find({ status:'审核中'},function (error,result) {
        if(error){
            console.log("error in getAuditTable");
            console.log(error);
            res.send(error);
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
                    reason:result[i].reason,
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
                            })
                        })
                    },function (error) {
                        console.log("error in getAuditTable");
                        console.log(error);
                        res.send(error);
                    })
                    .then(function (data) {
                        result = data;
                        getTeacherNamesOneTime(result,function(error,data){
                            if(error){
                                console.log("error in getTeacherNamesOneTime");
                                console.log(error);
                                res.send("error in getTeacherNamesOneTime")
                            }else{
                                res.send(data);
                            }
                        })
                    },function (error) {
                        console.log("error in getCourseNamesOneTime");
                        console.log(error);
                        res.send(error);
                    })
            }
    });
}

CourseArrangedAPI.methods.refuseAudit = function(req,res){  //不通过教师提交的审核记录
    var detail = req.body.detail;
    CourseArrangedModel.update(
        {
            workNumber:detail.workNumber,
            sno:detail.sno,
            startTime:detail.startTime
        },
        {
            status:detail.status,
            reason:detail.reason
        },
        function(err,docs){
            if(error)
                res.send(error);
            else
                res.send("successful");
        })
}

CourseArrangedAPI.methods.submitAudit = function(req,res){      //教师在手机端提交审核
    CourseArrangedModel.update({
            workNumber:req.body.workNumber,
            sno:req.body.sno,
            startTime:req.body.startTime
        },{
            $set:{
                realCourseTime:req.body.realCourseTime,//实际课时
                remark:req.body.remark,
                photoEvidencePath:req.body.photoEvidencePath,
                returnVisitPath:req.body.returnVisitPath,
                status:req.body.status
            }
        },
        (error,rec)=>{
            if(error)
                res.send(error);
            else{
                teacherModel.update(
                    {workNumber:req.body.workNumber},
                    {'$inc':{'unpaidTime':req.body.realCourseTime}},
                    (error) =>{
                        if(error){
                            console.log("error in ./admin/courseArranged.js")
                            res.send(error);
                        }else{
                            res.send("successful");
                        }  
                    });
            }       
        }
    );
}

CourseArrangedAPI.methods.throughAudit = function(req,res){
    var detail = req.body.detail;
    CourseArrangedModel.remove({
        workNumber: detail.workNumber,
        sno: detail.sno,
        startTime: detail.startTime
    }, function (error, doc) {
        if (error)
            res.send(error)
        else
            new historyListModel(detail).save((error) => {
                if (error) {
                    console.log("error in ./admin/courseArranged.js")
                    console.log(error);
                    res.send(error);
                }
                else
                    teacherModel.update({
                        workNumber: detail.workNumber
                    }, {
                        '$inc': {
                            'unpaidTime': -detail.realCourseTime,
                            'paidTime': detail.realCourseTime
                        }
                    }, (error) => {
                        if (error) {
                            console.log("error in ./admin/courseArranged.js");
                            console.log(error);
                            res.send(error);
                        } else {
                            res.send("successful");
                        }
                    });
            });
    });
}


export default CourseArrangedAPI.methods;