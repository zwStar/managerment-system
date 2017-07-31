/**
 * Created by Administrator on 2017/7/31.
 */
var express = require("express");
var teacher = require("../module/teacher");
var md5 = require("../module/md5.js")

var router = express.Router();

router.post("/",function (req,res) {
    new teacher({
        name:req.body.name,
        age:req.body.age,
        sex:req.body.sex,
        inductionDate:req.body.inductionDate,
        password:md5("123456")
    }).save(function () {
        console.log("教师"+req.body.name+"添加成功")
    })
});

module.exports = router