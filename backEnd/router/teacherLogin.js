/**
 * Created by Administrator on 2017/8/8.
 */
var express = require("express");
var Router = express.Router();

var md5 =require("../module/md5");

router.post("/",function (req,res) {
    var userName = req.body.userName;
    var password = md5(req.body.password);

    //登陆

    res.send(token);
});

module.exports =router;