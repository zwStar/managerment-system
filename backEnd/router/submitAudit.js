var express = require("express");
var router = express.Router();

import admin from "../admin"


router.post("/",function(req,res){
    admin.courseArranged.submitAudit(req,res);
})

module.exports = router;