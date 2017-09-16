/**
 * Created by Administrator on 2017/8/3.
 */
var express = require("express");
var router = express.Router();

import admin from "../admin";
import $ from "../utils";

router.get("/",$.checkToken,function (req,res) {
    admin.Teacher.getTeacherList(req,res);
});

module.exports = router