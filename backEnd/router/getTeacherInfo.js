/**
 * Created by Administrator on 2017/8/9.
 */
var express = require("express");
var router = express.Router();
import admin from "../admin"
import $ from "../utils"

router.get("/",$.checkToken,function (req,res) {
    admin.Teacher.getTeacherInfo(req,res);
})

module.exports = router;