/**
 * Created by Administrator on 2017/8/9.
 */
var express = require("express");
var router = express.Router();
import admin from "../admin"

router.get("/",function (req,res) {
    /*登陆*/
    admin.Teacher.getTeacherInfo(req,res);
})

module.exports = router;