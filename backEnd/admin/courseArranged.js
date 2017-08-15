/**
 * Created by Administrator on 2017/8/11.
 */
import Base from './base'
import Models from '../module'
import student from "./student"
import course from '../module/course'

/* const CourseArrangedModel = Models.admin.CourseArrangedModel; */
const CourseArrangedModel = require("../module/courseArrange");

const StudentModel = Models.admin.StudentModel;
import $ from '../utils'

let CourseArrangedAPI = new Base({
    model: CourseArrangedModel
});

CourseArrangedAPI.methods.findArrangeClass = function (data,callback) {
    
    /* CourseArrangedModel.all(data).then(function(result){
        new Promise((resolve,reject)=>{
            
            student.getNamesBySnoOneTime(data,function (error,data) { //获取所有排课记录中的学生姓名，将其添加到数据库返回的记录中
                if(error)
                    reject(error);
                else
                    resolve(data);
            })
        }).then(function (data) {
                    result = data;
                    console.log(data);
                    return new Promise((response,reject) =>{
                        course.getCourseNamesOneTime(result,function (error,data) {
                            if(error)
                                reject(error);
                            else
                                resolve(result);
                        })
                    })//获取所有排课记录中的课程名，将其添加到数据库返回记录中
                },function (error) {
                    callback(error,null);
                })
                .then(function (data) {
                    callback(null,data);
                },function (error) {
                    callback(error,null);
                })
        
    },function(error){
        callback(error,null)
    }) */

    CourseArrangedModel.find(data,function (error,result) {
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
                        result = data;
                        /* for( var i = 0 ; i < student.length ; i++ ){
                            delete result[i].sno;
                            result[i].studentName = student[i];
                        } */
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
                        /* for(var i = 0 ; i < course.length ; i++ ){
                            result[i].courseName = course[i];
                        } */
                        result = data;
                        callback(null,result);
                    },function (error) {
                        callback(error,null);
                    })
            }
    })
}

export default CourseArrangedAPI.methods;