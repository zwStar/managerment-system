/**
 * Created by Administrator on 2017/8/9.
 */
var express = require("express");
var router = express.Router();
var teacher = require("../module/teacher");

router.get("/",function (req,res) {
    /*登陆*/
    teacher.getTeacherInfo({workNumber:"20170"},function (error,data) {
        if(error){
            res.send(error);
        }else{
            console.log(data)
            res.send(data);
        }
    })

})

module.exports = router;