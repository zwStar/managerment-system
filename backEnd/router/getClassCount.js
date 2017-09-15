var express = require("express");
var router = express.Router();

var historyList = require("../module/historyList");
var courseArranged = require("../module/courseArrange");

import { getClassCount } from "../utils/commonFunction";

router.get("/",function(req,res){
    getClassCount(req,res);
});

module.exports = router;