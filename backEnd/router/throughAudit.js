var express = require("express");
var router = express.Router();
var courseArranged = require("../module/courseArrange.js");
var historyList = require("../module/historyList")

router.post("/",function(req,res){
    var detail = req.body.detail;
    courseArranged.findOne({
        workNumber:detail.workNumber,
        sno:detail.sno,
        startTime:detail.startTime
    },function(error,result){
        console.log(new Date(detail.startTime));
        console.log(result);
    })
    courseArranged.remove({
        workNumber:detail.workNumber,
        sno:detail.sno,
        startTime:detail.startTime
    },function(error,doc){
        //console.log(doc)
        if(error)
            res.send(error)
        else
            new historyList(detail).save((error)=>{
                if(error)
                    res.send(error);
                else
                    res.send("successful");
            });
    });
});

module.exports = router;