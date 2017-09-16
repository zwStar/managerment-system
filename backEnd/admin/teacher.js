

import Base from './base'
import { dealWithData } from "../utils/commonFunction"
import $ from "../utils/"

let teacherModel = require("../module/teacher");
let courseModel = require("../module/course");

let teacherAPI = new Base({
   model:teacherModel
});

teacherAPI.methods.addTeacher = function (req, res) {
    var date = new Date(req.body.inductionDate);//入职日期
    teacherModel.count({}, function (err, count) {//找出已有教师数量
        if (err) {
            console.log("addTeacher.js===>error")
            console.log(err);
            res.send(err);
        }
        dealWithData(req.body.coursesTag, function (err, courseNo) {//找课程号
            if (err) {
                console.log("*****error in course.dealWithData******");
                res.send(err);
                return
            }
            new teacherModel({
                workNumber: date.getFullYear().toString() + count.toString(),
                name: req.body.name,
                age: req.body.age,
                sex: req.body.sex,
                inductionDate: date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString(),
                password: md5("123456"),
                unpaidTime: 0,
                paidTime: 0,
                course: courseNo,
            }).save(function (err) {
                if (err) {
                    console.log("*****error in save teacher***********");
                    res.send(err);
                }
                res.send("successful");
            })
        });
    });
}

teacherAPI.methods.changePassword = function(req,res){
    teacherModel.findOne({workNumber:req.body.workNumber},'password',function(error,result){
        if(error){
            console.log("error in router/changePassword.js");
            console.log(error);
            res.send("error");
        }else{
            var oldPassword = $.md5(req.body.oldPassword);
            if( result.password == oldPassword ){        
                teacherModel.update(
                    {workNumber:req.body.workNumber},
                    {$set:{
                        password:$.md5(req.body.newPassword)
                    }},
                    (error,rec)=>{
                        if(error){
                            console.log("error in update teacher's password (router/changePassword.js)");
                            console.log(error);
                            res.send("error");
                        }else{
                            res.send("successful");
                        }
                    })
            }else{                  //旧密码有误
                res.send("oldPassword error");
            }
        }
    })
}

teacherAPI.methods.findCourse = function (data,callback) {//根据课程号找出课程名字和年级
    var promises = [];
    var q = 0;
    for( var i = 0 ; i < data.length ; i++){
        for(var k = 0 ; k < data[i].course.length ; k++,q++){
            promises.push(new Promise(function (resolve,reject) {
                courseModel.find( { courseNo:data[i].course[k] },function (err,course) {
                    if(err){
                        reject(err);
                    }else{
                        resolve(course);
                    }
                } )
            }))
        }
    }
    Promise.all(promises).then(function(course){
        var d = 0;
        for( var i = 0 ; i < data.length ; i++ ){
            for(var k = 0 ; k < data[i].course.length ; k++ ){
                data[i].course[k] = course[d][0].gradeNo + course[d][0].courseName;
                d++;
            }
        }
        callback(null,data);
    },function (err) {
        callback(err,null);
    })
}

teacherAPI.methods.getTeacherInfo = function (req,res) {
    teacherModel.findOne({workNumber:req.query.workNumber},function (error,teacher) {
        if(error){
            res.send(error);
        }else{
            res.send(teacher);
        }
    })
};

teacherAPI.methods.getTeacherList = function(req,res){
    teacherModel.find({},function (err,data) {
        if(err){
            console.log("*******error in ./admin/teacher.js***********");
            console.log(err);
            res.send(err);
        }
        teacherAPI.methods.findCourse(data,function (err,data) {
            if(err){
                console.log("*******error in ./admin/teacher.js***********");
                console.log(err);
                res.send(err);
            }else{
                res.send(data);
            }
        });
    });
}

teacherAPI.methods.login = function (req, res, next) {     //注册
    let LoginPromise = this.find({"workNumber": req.body.workNumber, "password": $.md5(req.body.password)});    //返回一个promise对象
    LoginPromise.then((documents) => {
        if (!documents.length) {                        //如果为空 登录失败 返回login failed
            // $.result(res, 'login failed');
            res.send({
                status:401,
                msg:"params error",
                success:false
            })
        }
        //登录成功
        let workNumber = documents.workNumber;
        return $.result(res, {success: true, "message": "登录成功", workNumber: workNumber, token: $.createToken(workNumber)});           //返回
    })
};

/* teacherAPI.methods.getTeacherNamesOneTime = function(data,callback){//找出教师名字
    var promises = [];
    for( var i = 0 ; i < data.length ; i++ ){
        promises.push(new Promise(function(resolve,reject){
            teacherModel.findOne({workNumber:data[i].workNumber},'name',function(error,teacher){
                if(error){
                    console.log("error in module teacher.js")
                    reject(error);
                }
                else
                    resolve(teacher.name);
            })
        }))
    }
    Promise.all(promises).then(function(teacher){
        for( var i = 0 ; i < teacher.length ; i++ ){
            data[i].teacherName = teacher[i];
        }
        callback(null,data);
    },function(error){
        callback(error,null);
    })
}; */



export default teacherAPI.methods;