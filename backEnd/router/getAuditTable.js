var express = require("express");
var router = express.Router();
var courseArranged = require("../admin").default.courseArranged;

router.get("/",function(req,res){
    courseArranged.find({ status:'审核中'},function(error,result){
        if(error){
            console.log("error in getAuditTable");
            console.log(error);
        }else{
            
        }
    })
});

module.exports = router;