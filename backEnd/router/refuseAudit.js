var express = require("express");
var router = express.Router();
import admin from "../admin"

router.post("/",function(req,res){
    admin.courseArranged.refuseAudit(req,res);

});

module.exports = router;