/**
 * Created by Administrator on 2017/8/1.
 */
import mongoose from 'mongoose'

let db = require("./db.js")

import $ from '../utils'

import StudentModel from './student'
import TeacherModel from './teacher'            //教师表
import CourseArrangedModel from './courseArrange'   //课程安排表
var courseSchema = new mongoose.Schema({
    gradeNo: {type: String},
    courseNo: {type: String},
    courseName: {type: String},
});

var PRIMARY_REG = /(小学)([\u4e00-\u9fa5]{2})/
var JUNIOR_REG = /(初中)([\u4e00-\u9fa5]{2})/
var HIGH_REG = /(高中)([\u4e00-\u9fa5]{2})/
var CONVENTIONAL_REG = /([\u4e00-\u9fa5]{2})([\u4e00-\u9fa5]{2})/

courseSchema.statics.dealWithData = function (data, callback) {
    var courseNo = new Array();
    var promises = new Array();
    for (var i = 0; i < data.length; i++) {
        var result = data[i].name.match(PRIMARY_REG) || data[i].name.match(JUNIOR_REG) || data[i].name.match(HIGH_REG);
        if (!result)
            result = data[i].name.match(CONVENTIONAL_REG);
        if (result[1] == '初中') {
            if (result[2] != '物理' && result[2] != '化学')
                data.push({name: "初一" + result[2]});
            if (result[2] != '化学')
                data.push({name: "初二" + result[2]});
            data.push({name: "初三" + result[2]});
            continue;
        } else if (result[1] == '高中') {
            data.push({name: "高一" + result[2]});
            data.push({name: "高二" + result[2]});
            data.push({name: "高三" + result[2]});
            continue;
        }
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.find({gradeNo: result[1], courseName: result[2]}, function (err, course) {
                if (err) {
                    reject(err);
                } else {
                    resolve(course[0].courseNo);
                }
            })
        })
        promises.push(promise);
    }

    Promise.all(promises).then(function (courseNo) {
        callback(null, courseNo);
    }, function (err) {
        callback(err);
    })

}

//筛选出能教课的老师
courseSchema.statics.teacherOptions = function (req, res, next) {
    let query = req.query;
    let FindCourseNoPromise = CourseModel.findOne({course: query.course, grade: query.grade});  //找出课程号
    FindCourseNoPromise.then((result) => {
        if (result != null) {
            TeacherModel.find({course: result._id})  //找出能授课的老师 根据外键 course 为 该课程id
                .select("_id workNumber name course")
                .populate({ //外键
                    path: 'course',
                    // match: {_id: result._id},            //这些选择都是针对population find找到内容只与find里面的参数有关
                    //     // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
                    // options: { limit: 1 },
                    select: ' grade course',   //这里是select Course表中的内容
                })
                .then((results) => {
                    let PromiseAll = [];
                    results.forEach(function (el) {//找出老师之后 还要根据已经安排的课表 判断该老师这个时间段是否有时间
                        PromiseAll.push(CourseArrangedModel.find({
                            workNumber: el.workNumber,
                            $or: [  //时间区域判断
                                {$and: [{startTime: {$gt: query.startTime}}, {startTime: {$lt: query.endTime}}]},
                                {$and: [{startTime: {$lt: query.startTime}}, {endTime: {$gt: query.endTime}}]},
                                {$and: [{endTime: {$gt: query.startTime}}, {endTime: {$lt: query.endTime}}]},
                                {$and: [{startTime: {$gt: query.startTime}}, {endTime: {$lt: query.endTime}}]},
                            ]
                        }));
                    });
                    Promise.all(PromiseAll).then((documents) => {
                        let options = results.filter(function (el) {//根据在已经安排的课程中找到出来的老师 在开始的授课老师中过滤掉
                            let flag = true;    //标志 表示可以任课
                            for (let i = 0; i < documents.length; i++) {//循环 如果该教师存在 flag为false
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

//筛选出年级
courseSchema.statics.findGrade = function (req, res, next) {
    let query = req.query;
    let findGradePromise = StudentModel.findOne({sno: query.sno});//根据学生学号找出他的年级
    findGradePromise.then((doc) => {
        if ($.isEmpty(doc))
            $.result(res, "error");
        $.result(res, {grade: doc.grade});
    }, (err) => {
        console.log(err);
    })
}
//找出课程号
courseSchema.statics.findCourseNo = function (data, callback) {
    this.find(data, callback)
}

courseSchema.statics.getCourseNamesOneTime = function (data, callback) { //通过多个课程号一次获取多个课程名
    var promises = [];
    var _this = this;

    for (var i = 0; i < data.length; i++) {
        promises.push(new Promise(function (resolve, reject) {
            _this.findOne({courseNo: data[i].courseNo}, function (error, course) {
                if (error)
                    reject(error);
                else
                    resolve(course.gradeNo + course.courseName);
            })
        }))
    }

    Promise.all(promises).then(function (course) {
        for (var i = 0; i < data.length; i++) {
            data[i].courseName = course[i];
        }
        callback(null, data);
    }, function (error) {
        callback(error, null);
    })
}

//安排课程
courseSchema.statics.courseArranged = function (req, res, next) {
    let query = req.query;
    //找出课程号
    let findCourseNoPromise = CourseModel.findOne({grade: query.grade, course: query.course});
    findCourseNoPromise.then((doc) => {
        delete query.grade; //删除年级
        delete query.course;    //删除课程
        query.courseNo = doc.courseNo;//只记录课程号
        let ArrangedPromise = CourseArrangedModel.create(query);
        ArrangedPromise.then((doc) => {
            if (doc)
                $.result(res, doc);
            else
                $.result(res, "error");
        }, (err) => {
            console.log(err);
        })
    }, (err) => {
        console.log(err);
    })
}

//获得已经安排总课程的总量
courseSchema.statics.total = function (req, res, next) {
    let totalPromise = CourseArrangedModel.count({});
    totalPromise.then(results => {
        res.send({
            status: 1,
            sussess: '获取总数成功',
            count: results
        })
    })
}

//安排课程列表
courseSchema.statics.arrangedLists = async function (req, res, next) {
    let _this = this;
    let {limit = 10, start = 0} = req.query;
    try {
        let Courses = await CourseArrangedModel.find({}).limit(Number(limit)).skip(Number(limit * start));//已经安排的课程
        let results = [];
        for (let i = 0; i < Courses.length; i++) {
            //根据学号 在学生表中查找该学生姓名
            let StudentName = await StudentModel.findOne({sno: Courses[i].sno}, 'name');
            // //根据教师工号 找出教师名字
            let TeacherName = await TeacherModel.findOne({workNumber: Courses[i].workNumber}, 'name');

            //根据课程号 找出年级
            let Course = await _this.findOne({courseNo: Courses[i].courseNo}, 'course grade');
            console.log("Course",Course)
            if (StudentName !== null && TeacherName !== null && Course !== null) {
                let dateformat = {  //对时间进行格式化
                    startTime: $.dateformat(Courses[i].startTime, 'YYYY-MM-DD HH:mm:ss'),
                    endTime: $.dateformat(Courses[i].endTime, 'YYYY-MM-DD HH:mm:ss')
                }
                let CourseArranged = {//组成一个前端数据需要的对象
                    ...Courses[i]._doc, ...{StudentName: StudentName.name}, ...{TeacherName: TeacherName.name}, ...{
                        course: Course.courseName,
                        grade: Course.gradeNo
                    }, ...dateformat
                };
                results.push(CourseArranged);
            }
        }
        $.result(res, results);
    } catch (err) {
        res.send({
            status: 0,
            type: 'ERROR_PARAMS',
            message: err.message
        })
    }

}

var courseModel = mongoose.model("course", courseSchema);

module.exports = courseModel