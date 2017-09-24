var express = require("express");
var router = express.Router();
import admin from "../admin";
import $ from "../utils";
import { getClassCount,savePhoto } from "../utils/commonFunction";

//老师修改密码
router.post("/changePassword",$.checkToken,admin.Teacher.changePassword);

//处理上传的图片
router.post("/photo/photoEvidence",$.checkToken,function(req,res){
    savePhoto(req,res,'photoEvidence');
})

//处理上传的图片
router.post("/photo/returnVisit",function(req,res){
    savePhoto(req,res,'returnVisit');
});

//老师上完课提交审核
router.post("/audit",$.checkToken,admin.courseArranged.submitAudit);
router.post("/teacherLogin",admin.Teacher.login);

//获取某位教师的课程表
router.get("/getArrangeClass",$.checkToken,admin.courseArranged.findArrangeClass);

router.get("/getAuditedClass",$.checkToken,admin.historyList.findAuditedClass);

router.get("/getClassCount",$.checkToken,getClassCount);

router.get("/getTeacherInfo",$.checkToken,admin.Teacher.getTeacherInfo);

export default router;