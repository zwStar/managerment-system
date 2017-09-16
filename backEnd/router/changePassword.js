var express = require("express");
var router = express.Router();
import admin from "../admin";
import $ from "../utils"

router.post("/",$.checkToken,function(req,res){
    admin.Teacher.changePassword(req,res);
});

module.exports = router;