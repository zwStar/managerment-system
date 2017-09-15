var express = require("express");
var router = express.Router();


import admin from "../admin"

router.get("/",function(req,res){

    admin.courseArranged.findAuditingClass(req,res);
});

module.exports = router;