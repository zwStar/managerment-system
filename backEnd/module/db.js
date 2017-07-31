/**
 * Created by Administrator on 2017/7/31.
 */
var mongoose = require("mongoose");

var db = mongoose.createConnection("mongodb://127.0.0.1:27017/managerment-system");

db.once('open',function (callback) {
    console.log("mongodb connect successful");
})

module.exports = db;