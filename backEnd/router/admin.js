/**
 * Created by 郭泽伟 on 2017/8/1.
 */
import express from 'express'
const router = express.Router();
import Admin from '../admin'
import $ from '../utils'
import Captchas from '../admin/captchas'

router.post("/login",Admin.User.login)
router.post("/changeInfo",$.checkToken,Admin.User.update);


//创建学生信息
router.get("/addStudent",$.checkToken,Admin.Student.createStudent);
//获取学生数量
router.get("/studentsCount",$.checkToken,Admin.Student.total);
//获取学生列表
router.get("/students",$.checkToken,Admin.Student.studentLists);

// //获取教师数量
// router.get("/teachersCount",$.checkToken,Admin.Teacher.total);
// //获取教师列表
// router.get("/teachers",$.checkToken,Admin.Teacher.teacherLists);

//搜索
router.get("/search",$.checkToken,Admin.Search);
//获取验证码
router.post('/captchas', Captchas.getCaptchas);


export default router;