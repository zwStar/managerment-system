/**
 * Created by Administrator on 2017/8/9.
 */
var express = require("express");
var router = express.Router();

import Model from '../module'

let StudentModel = Model.admin.StudentModel;

var courseArrangedModel = require("../module/admin").CourseArrangedModel;

router.get("/",function (req,res) {

    courseArrangedModel.findArrangeClass({workNumber:req.workNumber},function (error,data) {
        if(error){
            res.send(error);
        }else{
            res.send(data);
        }
    })

});


module.exports = router;