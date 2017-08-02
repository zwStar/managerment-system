/**
 * Created by Administrator on 2017/8/1.
 */
var mongoose = require("mongoose");
var db = require("./db.js")
var course = require("./course")

var teacherCourseSchema = new mongoose.Schema({
    workNumber:{ type:String },
    course:{type:Array}
});

var PRIMARY_REG = /(小学)([\u4e00-\u9fa5]{2})/
var JUNIOR_REG = /(初中)([\u4e00-\u9fa5]{2})/
var HIGH_REG = /(高中)([\u4e00-\u9fa5]{2})/
var CONVENTIONAL_REG = /([\u4e00-\u9fa5]{2})([\u4e00-\u9fa5]{2})/

teacherCourseSchema.statics.dealWithData = function (data,callback) {

    var courseNo = new Array();
    var promises = new Array();

    for( var i = 0 ; i < data.length ; i++ ){

        var result = data[i].name.match(PRIMARY_REG) || data[i].name.match(JUNIOR_REG) || data[i].name.match(HIGH_REG);
        if( !result )
            result = data[i].name.match(CONVENTIONAL_REG);
        if(result[1] == '初中'){
            if(result[2] != '物理' && result[2] != '化学')
                data.push({name:"初一"+result[2]});
            if(result[2] != '化学')
            data.push({name:"初二"+result[2]});
            data.push({name:"初三"+result[2]});
            continue;
        }else if( result[1] == '高中'){
            data.push({name:"高一"+result[2]});
            data.push({name:"高二"+result[2]});
            data.push({name:"高三"+result[2]});
            continue;
        }

        var promise = new Promise(function (resolve, reject) {
            console.log(result);
            course.findCourseNo({gradeNo: result[1], courseName: result[2]}, function (err, course) {
                if (err) {
                    reject(err,null);
                }
                    resolve(null,course[0].courseNo)
            })

        })
        promises.push(promise);
    }
    console.log(promises.length)
    Promise.all(promises).then(function (err,courseNo) {
        callback(err,courseNo);
    },function (err) {
        callback(err,courseNo);
    })

}

var teacherCourse = db.model("teacherCourse",teacherCourseSchema);

module.exports = teacherCourse

