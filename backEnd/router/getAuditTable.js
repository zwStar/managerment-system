var express = require("express");
var router = express.Router();

var teacher = require("../module/teacher.js")
var courseArranged = require("../admin").default.courseArranged;

router.get("/",function(req,res){
    courseArranged.findArrangeClass({ status:'审核中'},function(error,result){
        if(error){
            console.log("error in getAuditTable");
            console.log(error);
        }else{
            teacher.getTeacherNamesOneTime(result,function(error,data){
                if(error){
                    console.log("error in teacher.getTeacherNamesOneTime");
                    console.log(error);
                    res.send("error in teacher.getTeacherNamesOneTime")
                }else{
                    res.send(data);
                }
            })
        }
    })
});

module.exports = router;