/**
 * Created by Administrator on 2017/8/3.
 */
var express = require("express");
var router = express.Router();

import admin from "../admin"

router.get("/",function (req,res) {
    /*验证登陆状态*/
    admin.getTeacherList(req,res);
});

module.exports = router