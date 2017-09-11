// var mongoose = require("mongoose");
// var db =require("./db.js")
//
//
// var StudentSchema = new mongoose.Schema({
//     sno:String,
//     name:String,
//     parentName:String,
//     tel:String,
//     sendAt:    { type: Date, default: Date.now },
//     school:String,
//     managerTeacher:String
// });
//
// var StudentModel = mongoose.model("Student1",StudentSchema);
//
// module.exports = StudentModel
//
// var db =require("../db.js")
// const StudentSchema = new mongoose.Schema("Student",{
//
// })

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