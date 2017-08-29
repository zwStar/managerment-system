var express = require("express");
var router = express.Router();

var historyList = require("../module/historyList");
var courseArranged = require("../module/courseArrange");

router.get("/",function(req,res){
    var promises = [];
    promises.push(new Promise(function(resolve,reject){
        historyList.count(req.body.data,function(error,result){
            if(error)
                reject(error);
            else
                resolve(result);
        })
    }))
    promises.push(new Promise(function(resolve,reject){
        courseArranged.count({ ...req.body.data,$or:[{status:'未通过'},{status:'审核中'}]},(error,result)=>{
            if(error)
                reject(error);
            else
                resolve(result);
        })
    }))

    Promise.all(promises).then((result)=>{
        res.send({count:result[0]+result[1]});
    },(error)=>{
        res.send("error");
    })
   // res.send({count:2});

    /* historyList.count(req.body.data,function(error,count){
        if(error)
            res.send("error");
        else
            res.send({count:count});
    }) */
});

module.exports = router;