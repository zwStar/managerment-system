var express = require("express")
var router = express.Router();

import { savePhoto } from "../utils/commonFunction"



router.post("/photoEvidence",function(req,res){
    savePhoto(req,res,'photoEvidence')
})

router.post("/returnVisit",function(req,res){
    savePhoto(req,res,'returnVisit')
})

module.exports = router;