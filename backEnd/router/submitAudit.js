var express = require("express");
var router = express.Router();

var teacher = require("../module/teacher");
var courseArranged = require("../module/courseArrange");

router.post("/",function(req,res){
    courseArranged.update({
            workNumber:req.body.workNumber,
            sno:req.body.sno,
            startTime:req.body.startTime
        },{
            $set:{
                realCourseTime:req.body.realCourseTime,//实际课时
                remark:req.body.remark,
                photoEvidencePath:req.body.photoEvidencePath,
                returnVisitPath:req.body.returnVisitPath,
                status:req.body.status
            }
        },
        (error,rec)=>{
            if(error)
                res.send(error);
            else{
                teacher.update(
                    {workNumber:req.body.workNumber},
                    {'$inc':{'unpaidTime':req.body.realCourseTime}},
                (error) =>{
                    if(error){
                        console.log("error in ./router/submitAudit.js")
                        res.send(error);
                    }else{
                        res.send("successful");
                    }  
                })    
            }
                
        }
    );
})

module.exports = router;