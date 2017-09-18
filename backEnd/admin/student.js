/**
 * Created by admin on 2017/8/5.
 */
import Model from '../module'

import Base from './base'

/* let StudentModel = Model.admin.StudentModel; */
let StudentModel = require("../module/student")
import CourseArrangedModel from '../module/courseArrange'
import $ from '../utils'
let StudentAPI = new Base({
   model:StudentModel
});

/* StudentAPI.methods.getNamesBySnoOneTime = function (data,callback) {//通过多个学号一次获取多个学生姓名
    var promises = [];
    for( var i = 0 ; i < data.length ; i++ ){
        promises.push(new Promise(function (resolve,reject) {
            StudentModel.findOne({sno:data[i].sno},"name",function (error,student) {
                if(error)
                    reject(error);
                else
                    resolve(student.name)
            })
        }))
    }
    Promise.all(promises).then(function (student) {
        for(var i = 0 ; i < student.length ; i++ ){
            data[i].studentName = student[i];
        }
        callback(null,data);
    },function (error) {
        callback(error,null);
    })
} */

//创建学生
StudentAPI.methods.createStudent = async function (req,res,next) {
    let params = req.method === 'POST' ? req.body : req.query;
    console.log(params.sendAt)
    try{
        if(!params.sno){
            throw new Error('必须填写学生学号');
        }else if(!params.name){
            throw new Error('必须填写学生姓名');
        }else if(!params.parentName){
            throw new Error('必须填写家长姓名');
        }else if(!params.tel){
            throw new Error('必须填写家长电话号码');
        }else if(!params.managerTeacher){
            throw new Error('必须填写学管师');
        }else if(!params.gradeNo){
            throw new Error('必须填写年级');
        }else if(!params.orderCourseNumber){
            throw new Error('必须填写购买总课程数量');
        }
    }catch (err){
        console.log('前台参数错误', err.message);
        // $.result(res,err.message);
        res.send({
            status:0,
            type: 'ERROR_PARAMS',
            message: err.message
        })
    }

    try{
        //判断该学号是否已经存在
        let isExit =await StudentModel.find({sno:params.sno});
        if(!isExit.length){
            let createPromise = StudentAPI.model.create(params);
            createPromise.then((results) => {
                $.result(res, {success: true, message: "添加成功！"});
            }, (error) => {
                console.log(error);
            })
        }else{
            res.send({
                status:0,
                type: 'ERROR_PARAMS',
                message: "该学号已经存在！"
            })
        }

    }catch (err){
        console.log(error);
    }
};

StudentAPI.methods.studentLists = async function (req,res,next) {
    let {limit = 10 ,start = 0} = req.query;
    let Students = await StudentModel.find({}).limit(Number(limit)).skip(Number(limit * start));
    let arr = [];
    for(let i=0;i<Students.length;i++){
        let CourseArrangeds = await CourseArrangedModel.find({sno:Students[i].sno});
        let  courseNumber = 0;
        let remainCourse = 0;
        CourseArrangeds.forEach(course=>{
            courseNumber += parseInt(course.courseNumber);
        })
        remainCourse = Students[i].orderCourseNumber - courseNumber;
        let Student = {...Students[i]._doc,...{remainCourse:remainCourse},...{date:$.dateformat(Students[i].sendAt)}};
        arr.push(Student)
    }
    $.result(res,arr);
}

export default StudentAPI.methods;