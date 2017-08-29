var express = require("express");
var router = express.Router();

var courseArranged = require("../module/courseArrange")

router.post("/",function(req,res){

    courseArranged.find({
        workNumber:req.body.workNumber,
        sno:req.body.sno,
        startTime:req.body.startTime
    },function(error,ress){
        console.log(ress)
    })

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
        (error)=>{
            courseArranged.find({
                workNumber:req.body.workNumber,
                sno:req.body.sno,
                startTime:req.body.startTime
            },function(error,res){
            })
            /* if(error)
                res.send(error);
            else
                res.send("successful"); */
        }
    );
    /* new audit(req.body).save(function(error){
        if(error){
            console.log("提交审核课程时失败，router/submitAudit.js");
            res.send(error);
        }else{
            res.send("successful");
        }
    }) */
})

module.exports = router;