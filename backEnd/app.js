/**
 * Created by Administrator on 2017/7/31.
 */
require('babel-core/register');
require("babel-polyfill");

const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const routers = require("./router").default;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
/* app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); */


//跨域
app.use('/', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", req.headers.origin)
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/x-www-form-urlencoded")
    next()
})

app.use("/addTeacher",require("./router/addTeacher"));
app.use("/getTeacherList",require("./router/getTeacherList"));
app.use("/getAuditTable",require("./router/getAuditTable"));    //获取老师提交的审核记录
app.use("/getPhoto",require("./router/getPhoto"));              //获取审核记录的照片
app.use("/refuseAudit",require("./router/refuseAudit"));        //不通过审核
app.use("/throughAudit",require("./router/throughAudit"));      //通过审核
app.use("/getClassCount",require("./router/getClassCount"));    //统计某一位老师对某一位学生上过的课的数量

app.use("/teacherLogin",require("./router/teacherLogin"));
app.use("/getTeacherInfo",require("./router/getTeacherInfo"));
app.use("/getArrangeClass",require("./router/getArrangeClass"));//获取某位教师的课程表
app.use("/getAuditedClass",require("./router/getAuditedClass"));    //获取老师已经审核过的课
app.use("/audit",require("./router/submitAudit"))           //老师上完课提交审核
app.use("/changePassword",require("./router/changePassword"))       //老师修改密码

app.use('/user',routers.admin);    //请求路由
app.use('/course',routers.course);  //课程相关操作路由

//处理上传的图片
app.use("/photo",require("./router/photo"))

/* var db = require("./module/db.js") */
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server running @${port} `);
})