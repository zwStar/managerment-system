/**
 * Created by Administrator on 2017/8/9.
 */
var express = require("express");
var router = express.Router();

var arrangeClass = require("../module/arrangeClass");

router.get("/",function (req,res) {

    arrangeClass.findArrangeClass({workNumber:req.workNumber},function (error,data) {
        if(error){
            res.send(error);
        }else{
            res.send(data);
        }
    })

});


module.exports = router;