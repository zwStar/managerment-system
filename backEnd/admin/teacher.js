import Base from './base'
import { dealWithData } from "../utils/commonFunction"
import $ from "../utils/"

let teacherModel = require("../module/teacher");
let courseModel = require("../module/course");

let teacherAPI = new Base({
   model:teacherModel
});

teacherAPI.methods.addTeacher = function (req, res) {
    
    teacherModel.count({}, function (err, count) {//找出已有教师数量
        if (err) {
            console.log("error in ./admin/teacher.js 16行");
            console.log(err);
            res.send(err);
        }
        if( ( ++count ) < 10 ){
            count = "0" + count;
        }else{
            count++;
            count = count.toString();
        }
        dealWithData(req.body.coursesTag, function (err, courseNo) {//找课程号
            if (err) {
                console.log("error in ./admin/teacher.js 22行");
                res.send(err);
            }else{
                new teacherModel({
                    workNumber: req.body.workNumber + count,
                    name: req.body.name,
                    age: req.body.age,
                    sex: req.body.sex,
                    inductionDate: date,
                    password: $.md5("123456"),
                    unpaidTime: 0,
                    paidTime: 0,
                    course: courseNo,
                }).save(function (err) {
                    if (err) {
                        console.log("error in ./admin/teacher.js 38行");
                        res.send(err);
                    }
                    res.send("successful");
                })
            }
            
        });
    });
}

teacherAPI.methods.changePassword = function(req,res){
    teacherModel.findOne({workNumber:req.body.workNumber},'password',function(error,result){
        if(error){
            console.log("error in ./admin/teacher.js 50行");
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
                            console.log("error in ./admin/teacher.js 63行");
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


    teacherModel.find({})
        .skip((req.query.page - 1) * 5)
        .limit(5).exec(
            function (err,data) {
                if(err){
                    console.log("error in ./admin/teacher.js 120行");
                    console.log(err);
                    res.send(err);
                }
                teacherAPI.methods.findCourse(data,function (err,data) {
                    if(err){
                        console.log("error in ./admin/teacher.js 126行");
                        console.log(err);
                        res.send(err);
                    }else{
                        res.send(data);
                    }
                });
        });
}

teacherAPI.methods.getTeacherCount = function(req,res){
    teacherModel.count( {} , function(error,result){
        if(error){
            console.log("error in ./admin/teacher.js  145行");
            res.send(error);
        }else{
            res.send({count:result});
        }
    });
}

teacherAPI.methods.login = function (req, res, next) {     //注册
    let LoginPromise = teacherModel.find({"workNumber": req.body.workNumber, "password": $.md5(req.body.password)});    //返回一个promise对象
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

export default teacherAPI.methods;