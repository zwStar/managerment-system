/**
 * Created by Administrator on 2017/8/8.
 */
var express = require("express");
var router = express.Router();

var teacher = require("../module/teacher");

router.post("/",function (req,res) {
    teacher.login(req,res)
});

module.exports =router;