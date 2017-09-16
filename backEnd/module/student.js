let mongoose = require("mongoose");
let db =require("./db.js")

let StudentSchema = new mongoose.Schema({
    sno:String,
    name:String,
    parentName:String,
    tel:String,
    sendAt:    { type: Date, default: Date.now },
    school:String,
    managerTeacher:String,
    grade:String,
    orderCourseNumber:String
});

let StudentModel = mongoose.model("Student",StudentSchema);

module.exports = StudentModel