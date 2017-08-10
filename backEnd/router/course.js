/**
 * Created by admin on 2017/8/5.
 */

import express from 'express'
const router = express.Router();




router.get("/findGrade",require("../module/course").findGrade)
router.get("/teacherOptions",require("../module/course").teacherOptions)
// router.get("/courseArranged",require("../module/course").courseArranged)
export default router;