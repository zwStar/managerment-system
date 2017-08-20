var mongoose = require("mongoose");
var db =require("./db.js")

var teacher = require("./teacher")

var CourseArrangedSchema = new mongoose.Schema({
    workNumber: String,  //可教课程 },      //入职时间
    sno:String,
    courseNo:String,
    startTime:{ type: Date},
    endTime:{type:Date},
    courseNumber:String,
    courseHour:Number
});

/* CourseArrangedModel.statics.getAudit = function(data,callback){
    this.find(data,function(error,result){
        if(error){
            console.log("error in get the audit by status");
            console.log(error);
            callback(error,null);
        }else{
            for(var i = 0 ; i < result.length ; i++ ){
                result[i] = new Object(result[i]);
            }
            new Promise(function(resolve,reject){
                teacher.getTeacherNamesOneTime(result,function(error,teacher){
                    if(error)
                        reject(error)
                    else{

                        resolve(teacher)
                    }
                        
                })
            })
            .then(function(){},function(){})
            
        }
    })
} */

var CourseArrangedModel = db.model("CourseArranged",CourseArrangedSchema);

module.exports = CourseArrangedModel