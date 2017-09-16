/**
 * Created by admin on 2017/8/5.
 */

import express from 'express'
const router = express.Router();
import Admin from '../admin'
import $ from '../utils'

router.get("/findGrade",Admin.courseArranged.findGrade)         //查找年级
router.get("/teacherOptions",Admin.courseArranged.teacherOptions)   //找教师列表
router.get("/courseArranged",Admin.courseArranged.courseArranged)   //安排课程

router.get("/ArrangedCount",Admin.courseArranged.total)
// router.get("/ArrangedLists",$.checkToken,function(req,res,next){
//     Admin.courseArranged.arrangedLists(req,res,next)
// });

router.get("/getAuditTable",$.checkToken,admin.courseArranged.findAuditingClass);
router.get("/getPhoto",$.checkToken,function(req,res){
    var img = new Array();
    img.push(fs.readFileSync("./photo/photoEvidence/" + req.query.photoEvidence).toString("base64"));
    img.push(fs.readFileSync("./photo/returnVisit/" + req.query.returnVisit).toString("base64"));
    res.send(img);
});
router.post("/refuseAudit",$.checkToken,admin.courseArranged.refuseAudit);
router.post("/throughAudit",$.checkToken,admin.courseArranged.throughAudit);


router.get("/ArrangedLists",Admin.courseArranged.arrangedLists);    //安排的课程列表
export default router;