/**
 * Created by Administrator on 2017/7/31.
 */
require('babel-core/register');
require("babel-polyfill");

const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const routers = require("./router").default;
const cookieParser = require('cookie-parser')


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
//跨域
app.use('/', function (req, res, next) {
    /* if(req.headers.origin ===  "http://39.108.162.150" || req.headers.origin ===  "http://39.108.162.150:8080" || req.headers.origin ==="http://192.168.232.243:8081"){ */
         res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,X-Token");
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", ' 3.2.1');
        res.header("Content-Type", "application/x-www-form-urlencoded");
        if(req.method == 'OPTIONS'){
            res.end("OK");
        }else
            next()
    /* }else{
        return;
    } */
})




app.use('/user',routers.admin);    //请求路由
app.use('/course',routers.course);  //课程相关操作路由
app.use("/statis",routers.statis);   //获取每天新增学员 新增教师 新增订单
app.use("/mobilePhone",routers.mobilePhone);

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server running @${port} `);
})