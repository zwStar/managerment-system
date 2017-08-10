/**
 * Created by Administrator on 2017/8/9.
 */
var mongoose = require("mongoose");
var db = require("./db")
var teacher = require("./teacher")

var arrangeClassSchema = new mongoose.Schema({
    workNumber:{type:String},
    studentNumber:{type:String},
    courseNo:{type:String},
    beginTime:{type:Date},
    endTime:{type:Date},
    courseLong:{type:Number},
    courseTime:{type:Number},
});

arrangeClassSchema.statics.findArrangeClass = function(data,callback){
    new Promise(function (resolve,reject) {
        this.find(data,null,{sort:[["beginTime",1]]},function (error,result) {
            if(error)
                reject(error);
            else{
                resolve(result);
            }
        })
    })
        .then(function (data) {
            return new Promise(function (resolve,reject) {

            })
            callback(null,result);
        },function (error) {
            callback(error,null)
        })
        .then(function () {

        },function () {

        })

}


var arrangeClassModel = db.model("arrangeClass",arrangeClassSchema);

module.exports = arrangeClassModel;