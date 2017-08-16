var mongoose = require("mongoose");
var db =require("./db.js")


var StudentSchema = new mongoose.Schema({
    sno:String,
    name:String,
    parentName:String,
    tel:String,
    sendAt:    { type: Date, default: Date.now },
    school:String,
    managerTeacher:String
});

var StudentModel = db.model("Student",StudentSchema);

module.exports = StudentModel