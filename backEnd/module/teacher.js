/**
 * Created by Administrator on 2017/7/31.
 */
var mongoose = require("mongoose");
var db = require("./db.js")
var course = require("./course.js")

var teacherSchema = new mongoose.Schema({
    workNumber:{ type:String },
    name:{ type:String },
    age:{ type: Number },
    sex:{ type:String },
    inductionDate:{ type:String },
    unpaidTime:{ type:Number },
    paidTime:{ type:Number },
    password:{ type:String },
    course:{type:Array}
});

teacherSchema.statics.findCourse = function (data,callback) {
    var promises = [];
    var q = 0;
    for( var i = 0 ; i < data.length ; i++){
        for(var k = 0 ; k < data[i].course.length ; k++,q++){
            promises.push(new Promise(function (resolve,reject) {
                course.find( { courseNo:data[i].course[k] },function (err,course) {
                    if(err){
                        reject(err);
                    }else{
                        resolve(course);
                    }
                } )
            }))
        }
    }
    Promise.all(promises).then(function(course){
        var d = 0;
        for( var i = 0 ; i < data.length ; i++ ){
            console.log(course);
            for(var k = 0 ; k < data[i].course[k].length ; k++ ){
                data[i].course[k] = course[d].gradeNo + course[d].courseName;
                d++;
            }
        }
        callback(null,data);
    },function (err) {
        callback(err,null);
    })
}

var teacherModel = db.model("teacher",teacherSchema);

module.exports = teacherModel

