/**
 * Created by Administrator on 2017/7/31.
 */
var express = require("express");
var teacher = require("../module/teacher");
var course = require("../module/course")
var md5 = require("../module/md5")

var router = express.Router();

router.post("/",function (req,res) {
    var date = new Date(req.body.inductionDate);
    teacher.count({}, function (err, count) {
        if (err) {
            console.log("addTeacher.js===>error")
            console.log(err);
            res.send(err);
        }

        course.dealWithData(req.body.coursesTag, function (err, courseNo) {
            if (err) {
                console.log("*****error in course.dealWithData******");
                res.send(err);
                return
            }
            new teacher({
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



});

module.exports = router