/**
 * Created by Administrator on 2017/7/31.
 */
var express = require("express");
var teacher = require("../module/teacher");
var teacherCourse = require("../module/teachCourse")
var md5 = require("../module/md5.js")

var router = express.Router();

router.post("/",function (req,res) {
    var date = new Date(req.body.inductionDate);
    
    new Promise(function (resolve,reject) {
        
    })
    teacher.count({},function (err,count) {
        if(err){
            console.log("addTeacher.js===>error")
            console.log(err);
        }

        new teacher({
            workNumber:date.getFullYear().toString() + count.toString(),
            name:req.body.name,
            age:req.body.age,
            sex:req.body.sex,
            inductionDate:date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString(),
            password:md5("123456")
        }).save(function (err) {
                if(err){
                    console.log("*****error in save teacher***********");
                }
        })

        teacherCourse.dealWithData(req.body.coursesTag,function (err,courseNo) {
            if(err){
                console.log("*****error in teacherCourse.dealWithData******");
                console.log(err);
            }

            new teacherCourse({
                workNumber:date.getFullYear().toString() + count.toString(),
                course:courseNo
            }).save(function (err) {
                if(err){
                    console.log("*****error in save teacherCourse***********");
                }
            })
        });
    });
});

module.exports = router