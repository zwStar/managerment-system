var express = require("express");
var router = express.Router();

var courseArranged = require("../module/courseArrange")

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
            console.log(rec)
            if(error)
                res.send(error);
            else
                res.send("successful");
        }
    );
})

module.exports = router;