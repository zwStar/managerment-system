var express = require("express");
var router = express.Router();

var historyList = require("../module/historyList");

router.get("/",function(req,res){
    historyList.count(req.body.data,function(error,count){
        if(error)
            res.send("error");
        else
            res.send({count:count});
    })
});

module.exports = router;