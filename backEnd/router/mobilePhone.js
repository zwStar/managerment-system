var express = require("express");
var router = express.Router();
import admin from "../admin";
import $ from "../utils";
import { getClassCount,savePhoto } from "../utils/commonFunction";

//老师修改密码
router.post("/changePassword",$.checkToken,function(req,res){ 
    admin.Teacher.changePassword(req,res);
});

//处理上传的图片
router.post("/photoEvidence",$.checkToken,function(req,res){
    savePhoto(req,res,'photoEvidence');
})

//处理上传的图片
router.post("/returnVisit",function(req,res){
    savePhoto(req,res,'returnVisit');
});

//老师上完课提交审核
router.post("/audit",$.checkToken,function(req,res){ 
    admin.courseArranged.submitAudit(req,res);
});
router.post("/teacherLogin",function (req,res) {
    admin.Teacher.login(req,res)
});

//获取某位教师的课程表
router.get("/getArrangeClass",$.checkToken, function (req, res) {
    admin.courseArranged.findArrangeClass(req, res);
});

router.get("/getAuditedClass",$.checkToken,function(req,res){
    admin.audit.findAuditedClass(req,res);
});

router.get("/getClassCount",$.checkToken,function(req,res){
    getClassCount(req,res);
});

router.get("/getTeacherInfo",$.checkToken,function (req,res) {
    admin.Teacher.getTeacherInfo(req,res);
});

export default router;