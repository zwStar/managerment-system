/**
 * Created by Administrator on 2017/8/8.
 */
var express = require("express");
var router = express.Router();

var md5 =require("../module/md5");

var teacher = require("../module/teacher");

router.post("/",function (req,res) {
    teacher.login(req,res)
});

module.exports =router;