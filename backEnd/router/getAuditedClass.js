var express = require("express");
var router = express.Router();
var admin = require("../admin");


router.get("/",function(req,res){
    admin.audit.findAuditedClass(req,res,function(error,data){
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