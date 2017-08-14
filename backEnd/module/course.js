/**
 * Created by Administrator on 2017/8/1.
 */
var mongoose = require("mongoose");
var db =require("./db.js")
import Model from '../module'
let CourseArrangedModel = Model.admin.CourseArrangedModel;  //课程安排表
let StudentModel = Model.admin.StudentModel;

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
            _this.find ({gradeNo: result[1], courseName: result[2]}, function (err, course) {
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

//筛选出能教课的老师
courseSchema.statics.teacherOptions = function (req, res, next) {
    let query = req.query;
    let FindCourseNoPromise = CourseModel.findOne({courseNo: query.courseNo, gradeNo: query.gradeNo});  //找出课程号
    FindCourseNoPromise.then((result) => {
        if (result != null) {
            TeacherModel.find({}, "_id workNumber name")
                .populate({
                    path: 'course',
                    match: {_id: result._id},
                    // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
                    // options: { limit: 5 }
                    // select: 'workNumber -_id',   //这里是select Course表中的内容
                })
                .then((results) => {
                    let PromiseAll = [];
                    results.forEach(function (el) {
                        console.log(query.startTime);
                        console.log(query.endTime);
                        PromiseAll.push(CourseArrangedModel.findOne({
                            workNumber: el.workNumber,
                            $or: [
                                {$and: [{startTime: {$gt: query.startTime}}, {startTime: {$lt: query.endTime}}]},
                                {$and: [{startTime: {$lt: query.startTime}}, {endTime: {$gt: query.endTime}}]},
                                {$and: [{endTime: {$gt: query.startTime}}, {endTime: {$lt: query.endTime}}]},
                                {$and: [{startTime: {$gt: query.startTime}}, {endTime: {$lt: query.endTime}}]},
                            ]
                        }));
                    });
                    Promise.all(PromiseAll).then((documents) => {
                        console.log(documents);
                        let options = results.filter(function (el) {
                            let flag = true;
                            for (let i = 0; i < documents.length; i++) {
                                if (documents[i] !== null) {
                                    if (documents[i].workNumber === el.workNumber) {
                                        flag = false;
                                        break;
                                    }
                                }
                            }
                            if (flag)
                                return true;
                            else
                                return false;
                        })
                        $.result(res, {success: true, data: options});
                    });
                }), (error) => {
                console.log(error);
            }
        }
    });
}
/* courseSchema.statics.findArrangeClass = function(data,callback){

    CourseArrangedModel.find(data,null,{sort:[["beginTime",1]]},function (error,result) {
        if(error)
            callback(error,null)
        else{
            var promises = [];
            var nameAndClass = [];
            for( var i = 0 ; i < result.length ; i++ ){
                promises.push(new Promise(function (resolve,reject) {
                    student.getName({studentNumber:result[i].studentNumber},function (error,result) {
                        if(error)
                            reject(error);
                    });
                }).then(function () {

                },function (error) {

                }))
            }
        }
    })
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
                teacher.find
            })
            callback(null,result);
        },function (error) {
            callback(error,null)
        })
        .then(function () {

        },function () {

        })

} */

//筛选出年纪
courseSchema.statics.findGrade = function(req,res,next){
    let query = req.query;
    let findGradePromise = StudentModel.find({sno:query.sno});
    findGradePromise.then((doc)=>{
        $.result(res,{gradeNo:doc.gradeNo});
    },(err)=>{
        console.log(err);
    })
}

courseSchema.statics.findCourseNo = function (data,callback) {
     this.find(data,callback)
}

courseSchema.statics.getCourseNamesOneTime = function (data,callback) { //通过多个课程号一次获取多个课程名
    var promises = [];
    var _this = this;

    for(var i = 0 ; i < data.length ; i++ ){
        promises.push(new Promise(function (resolve,reject) {
            _this.findOne({courseNo:data[i].courseNo},function (error,course) {
                if(error)
                    reject(error);
                else
                    resolve(course.gradeNo + course.courseName);
            }) 
        }))
    }
    
    Promise.all(promises).then(function(course){
        for(var i = 0 ; i < data.length ; i++ ){
            delete data[i].courseNo;
            data[i].courseName = course[i];
        }
        callback(null,course);
    },function(error) {
        callback(error,null);
    })
}

var courseModel = db.model("course",courseSchema);

module.exports = courseModel