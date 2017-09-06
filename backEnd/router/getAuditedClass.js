var express = require("express");
var router = express.Router();
var audit = require("../module/audit");


router.get("/",function(req,res){
    audit.findAuditedClass(req.query,function(error,data){
        if(error){
            console.log("error in ./router/getArrangeClass.js");
            console.log(error);
            res.send("error");
        }else{
            res.send(data);
        }
    });
});

module.exports = router;