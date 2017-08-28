var express = require("express");
var router = express.Router();
var courseArranged = require("../module/courseArrange.js")

router.post("/",function(req,res){
    var detail = req.body.detail;
    courseArranged.update(
        {
            workNumber:detail.workNumber,
            sno:detail.sno,
            startTime:detail.startTime
        },
        {
            status:detail.status,
            reason:detail.reason
        },
        function(err,docs){
            if(error)
                res.send(error);
            else
                res.send("successful");
        })
});

module.exports = router;