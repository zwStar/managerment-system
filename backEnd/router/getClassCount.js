var express = require("express");
var router = express.Router();

import $ from "../utils";
import { getClassCount } from "../utils/commonFunction";

router.get("/",$.checkToken,function(req,res){
    getClassCount(req,res);
});

module.exports = router;