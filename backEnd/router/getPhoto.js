var express = require("express");
var router = express.Router();
var fs = require("fs");

router.get("/",function(req,res){
    var img = new Array();
    img.push(fs.readFileSync("./photo/photoEvidence/" + req.query.photoEvidence+'.jpg').toString("base64"));
    img.push(fs.readFileSync("./photo/returnVisit/" + req.query.returnVisit + ".jpg").toString("base64"));
    res.send(img);
});

module.exports = router;