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


//跨域
app.use('/', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", "http://192.168.232.243:8080")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/x-www-form-urlencoded")
    next()
})

app.use("/addTeacher",require("./router/addTeacher"));
app.use("/getTeacherList",require("./router/getTeacherList"));
app.use("/teacherLogin",require("./router/teacherLogin"));
app.use("/getTeacherInfo",require("./router/getTeacherInfo"));
app.use("/getArrangeClass",require("./router/getArrangeClass"));

app.use('/user',routers.admin);    //请求路由
app.use('/course',routers.course);  //课程相关操作路由

//处理上传的图片
app.use("/photoEvidence",require("./router/photoEvidence"))

var db = require("./module/db.js")
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server running @${port} `);
})