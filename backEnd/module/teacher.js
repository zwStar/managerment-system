/**
 * Created by Administrator on 2017/7/31.
 */
var mongoose = require("mongoose");
var db =require("./db.js")
var course = require("./course.js")
import $ from '../utils'

var teacherSchema = new mongoose.Schema({
    workNumber:{ type:String },
    name:{ type:String },
    age:{ type: Number },
    sex:{ type:String },
    inductionDate:{ type:String },
    unpaidTime:{ type:Number },
    paidTime:{ type:Number },
    password:{ type:String },
    course:{type:Array},
    tel:{type:String}
});

teacherSchema.statics.findCourse = function (data,callback) {//根据课程号找出课程名字和年级
    var promises = [];
    var q = 0;
    for( var i = 0 ; i < data.length ; i++){
        for(var k = 0 ; k < data[i].course.length ; k++,q++){
            promises.push(new Promise(function (resolve,reject) {
                course.find( { courseNo:data[i].course[k] },function (err,course) {
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

teacherSchema.statics.getTeacherInfo = function (data,callback) {
    this.find(data,function (error,teacher) {
        if(error){
            callback(error,null);
        }else{
            callback(null,teacher[0]);
        }
    })
};



teacherSchema.statics.getTeacherNamesOneTime = function(data,callback){//找出教师名字
    var promises = [];
    var _this = this;
    for( var i = 0 ; i < data.length ; i++ ){
        promises.push(new Promise(function(resolve,reject){
            _this.findOne({workNumber:data[i].workNumber},'name',function(error,teacher){
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
};

teacherSchema.statics.login = function (req, res, next) {     //注册
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

var teacherModel = mongoose.model("teacher",teacherSchema);

module.exports = teacherModel

