/**
 * Created by Administrator on 2017/8/3.
 */
var express = require("express");
var router = express.Router();

var teacher = require("../module/teacher");
var course  = require("../module/course")

router.get("/",function (req,res) {
    /*验证登陆状态*/
    teacher.find({},function (err,data) {
        if(err){
            console.log("*******error in getTeacher.js***********");
            console.log(err);
        }
        teacher.findCourse(data,function (data) {
            res.send(data);
        })
    })
});

module.exports = router