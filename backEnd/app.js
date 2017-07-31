/**
 * Created by Administrator on 2017/7/31.
 */
const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


//跨域
app.use('/', function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:8080")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/x-www-form-urlencoded")
    next()
})

app.use("/addTeacher",require("./router/addTeacher"));


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`server running @${port} `);
})