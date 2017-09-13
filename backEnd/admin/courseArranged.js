/**
 * Created by Administrator on 2017/8/11.
 */
import Base from './base'
import Models from '../module'
import student from "./student"
import course from '../module/course'

/* const CourseArrangedModel = Models.admin.CourseArrangedModel; */
 // const CourseArrangedModel = require("../module/courseArrange");

import CourseArrangedModel from '../module/courseArrange'   //课程安排表
import StudentModel from '../module/student'   //课程安排表
import $ from '../utils'

let CourseArrangedAPI = new Base({
    model: CourseArrangedModel
});

CourseArrangedAPI.methods.findArrangeClass = function (data,callback) {
    CourseArrangedModel.find({
        // workNumber:"20170",
        // startTime:{
        //     "$gte":data.startTime
        // },
        // endTime:{
        //     "$lte":data.endTime
        // }
    } ,function (error,result) {
    CourseArrangedModel.find({
        workNumber:data.workNumber,
        startTime:{
            "$gte":data.startTime
        },
        endTime:{
            "$lte":data.endTime
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
})
}
export default CourseArrangedAPI.methods;