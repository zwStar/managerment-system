
import express from 'express'
const router = express.Router();
import Admin from '../admin'

//export const userCount = date => fetch('/statis/user/' + date + '/count');
router.get("/studentCount",Admin.Statis.studentCount);  //获取当日新增学生数量
router.get("/teacherCount",Admin.Statis.teacherCount);  //获取当日新增教师数量
router.get("/orderCount",Admin.Statis.orderCount);      //获取当日排课数量

export default router;