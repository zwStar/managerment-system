var express = require("express");
var router = express.Router();
var courseArranged = require("../module/courseArrange.js");
var historyList = require("../module/historyList")

router.post("/",function(req,res){
    var detail = req.body.detail;
    courseArranged.remove({
        workNumber:detail.workNumber,
        sno:detail.sno,
        startTime:detail.startTime
    },function(error,doc){
        if(error)
            res.send(error)
        else
            historyList.save(detail,function(error){
                if(error)
                    res.send(error);
                else
                    res.send("successful");
            })

    })
});

module.exports = router;