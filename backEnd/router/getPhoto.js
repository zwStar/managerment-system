var express = require("express");
var router = express.Router();
var fs = require("fs");
import $ from "../utils";

router.get("/",$.checkToken,function(req,res){
    var img = new Array();
    img.push(fs.readFileSync("./photo/photoEvidence/" + req.query.photoEvidence).toString("base64"));
    img.push(fs.readFileSync("./photo/returnVisit/" + req.query.returnVisit).toString("base64"));
    res.send(img);
});

module.exports = router;