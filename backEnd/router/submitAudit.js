var express = require("express");
var router = express.Router();

var audit = require("../module/audit")

router.post("/",function(req,res){
    new audit(req.body).save(function(error){
        if(error){
            console.log("提交审核课程时失败，router/submitAudit.js");
            res.send(error);
        }else{
            res.send("successful");
        }
    })
})

module.exports = router;