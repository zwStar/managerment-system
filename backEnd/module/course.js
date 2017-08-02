/**
 * Created by Administrator on 2017/8/1.
 */
var mongoose = require("mongoose");
var db = require("./db.js")

var courseSchema = new mongoose.Schema({
    gradeNo:{ type:String },
    courseNo:{ type:String },
    courseName:{ type: String },
});

courseSchema.statics.findCourseNo = function (data,callback) {
     this.find(data,callback)
}


var courseModel = db.model("course",courseSchema);

module.exports = courseModel