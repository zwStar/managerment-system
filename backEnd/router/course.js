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

router.get("/ArrangedLists",Admin.courseArranged.arrangedLists);    //安排的课程列表
export default router;