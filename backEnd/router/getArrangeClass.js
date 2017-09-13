/**
 * Created by Administrator on 2017/8/9.
 */
var express = require("express");
var router = express.Router();

import Model from '../module'
import StudentModel from '../module/student'

var courseArranged = require("../admin").default.courseArranged;

router.get("/", function (req, res) {
    courseArranged.findArrangeClass(req.query, function (error, data) {
        if (error) {
            console.log("error in ./router/getArrangeClass.js");
            console.log(error);
            res.send("error");
        } else {
            res.send(data);
        }
    })

});


module.exports = router;