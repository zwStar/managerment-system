/**
 * Created by Administrator on 2017/8/9.
 */
var express = require("express");
var router = express.Router();

import admin from "../admin"


router.get("/", function (req, res) {

    admin.courseArranged.findArrangeClass(req, function (error, data) {
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