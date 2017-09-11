/**
 * Created by admin on 2017/8/5.
 */

import express from 'express'
const router = express.Router();
import Admin from '../admin'

router.get("/findGrade",require("../module/course").findGrade)
router.get("/teacherOptions",require("../module/course").teacherOptions)
router.get("/courseArranged",require("../module/course").courseArranged)

// router.get("/findGrade",Admin.Course.findGrade)         //查找年级
// router.get("/teacherOptions",Admin.Course.teacherOptions)   //找教师列表
// router.get("/courseArranged",Admin.Course.courseArranged)   //安排课程

router.get("/ArrangedCount",require("../module/course").total)
// router.get("/ArrangedLists",require("../module/course").arrangedLists)
router.get("/ArrangedLists",function(req,res,next){
    require("../module/course").arrangedLists(req,res,next)
});
// router.get("/ArrangedCount",Admin.Course.total);        //课程安排量
// router.get("/ArrangedLists",Admin.Course.arrangedLists);    //安排的课程列表
export default router;