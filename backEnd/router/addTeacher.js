/**
 * Created by Administrator on 2017/7/31.
 */
import admin from "../admin";
import $ from "../utils"
var express = require("express");

var router = express.Router();

router.post("/",$.checkToken, function (req, res) {

    admin.Teacher.addTeacher(req,res);
});

module.exports = router