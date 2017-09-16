/**
 * Created by Administrator on 2017/7/31.
 */
var mongoose = require("mongoose");
var db =require("./db.js");
var course = require("./course.js");

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

