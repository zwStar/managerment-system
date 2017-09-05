/**
 * Created by Administrator on 2017/8/9.
 */
var express = require("express");
var router = express.Router();

import Model from '../module'

let StudentModel = Model.admin.StudentModel;

var courseArranged = require("../admin").default.courseArranged;

router.get("/",function (req,res) {
    courseArranged.findArrangeClass({workNumber:'20170'},function (error,data) {
        if(error){
            console.log("error in ./router/getArrangeClass.js");
            console.log(error);
            res.send("error");
        }else{
            res.send(data);
        }
    })

});


module.exports = router;