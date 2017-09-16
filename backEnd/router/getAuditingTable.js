var express = require("express");
var router = express.Router();


import admin from "../admin";
import $ from "../utils";

router.get("/",$.checkToken,function(req,res){

    admin.courseArranged.findAuditingClass(req,res);
});

module.exports = router;