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

var PRIMARY_REG = /(小学)([\u4e00-\u9fa5]{2})/
var JUNIOR_REG = /(初中)([\u4e00-\u9fa5]{2})/
var HIGH_REG = /(高中)([\u4e00-\u9fa5]{2})/
var CONVENTIONAL_REG = /([\u4e00-\u9fa5]{2})([\u4e00-\u9fa5]{2})/

courseSchema.statics.dealWithData = function (data,callback) {

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

        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.find({gradeNo: result[1], courseName: result[2]}, function (err, course) {
                if (err) {
                    reject(err);
                }else{
                    resolve(course[0].courseNo);
                }

            })

        })
        promises.push(promise);
    }

    Promise.all(promises).then(function (courseNo) {
        callback(null,courseNo);
    },function (err) {
        callback(err);
    })

}


courseSchema.statics.findCourseNo = function (data,callback) {
     this.find(data,callback)
}


var courseModel = db.model("course",courseSchema);

module.exports = courseModel