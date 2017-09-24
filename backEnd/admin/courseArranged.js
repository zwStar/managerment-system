/**
 * Created by Administrator on 2017/8/11.
 */
import Base from './base'

import {getNamesBySnoOneTime, getCourseNamesOneTime, getTeacherNamesOneTime} from "../utils/commonFunction"

import CourseModel from '../module/course'
import CourseArrangedModel from '../module/courseArrange'   //课程安排表
import StudentModel from '../module/student'
import teacherModel from "../module/teacher"
import historyListModel from "../module/historyList"
import $ from '../utils'

let CourseArrangedAPI = new Base({
    model: CourseArrangedModel
});

CourseArrangedAPI.methods.findArrangeClass = function (req, res) {
    CourseArrangedModel.find({
        workNumber: req.query.workNumber,
        startTime: {
            "$gte": req.query.startTime
        },
        endTime: {
            "$lte": req.query.endTime
        }
    }, function (error, result) {
        for (var i = 0; i < result.length; i++) {
            var obj = {
                workNumber: result[i].workNumber,
                sno: result[i].sno,
                courseNo: result[i].courseNo,
                startTime: result[i].startTime,
                endTime: result[i].endTime,
                courseNumber: result[i].courseNumber,
                courseHour: result[i].courseHour,
                status: result[i].status,
                realCourseTime: result[i].realCourseTime,
                remark: result[i].remark,
                reason: result[i].reason,
                photoEvidencePath: result[i].photoEvidencePath,
                returnVisitPath: result[i].returnVisitPath,
                threeTimes: result[i].threeTimes
            }
            result[i] = obj;
        }
        if (error) {
            console.log("error in ./admin/courseArranged.js  48行");
            console.log(error);
            res.send("error");
        }
        else {
            new Promise((resolve, reject) => {
                getNamesBySnoOneTime(result, function (error, data) { //获取所有排课记录中的学生姓名，将其添加到数据库返回的记录中
                    if (error)
                        reject(error);
                    else
                        resolve(data);
                })
            }).then(function (data) {
                return new Promise((resolve, reject) => {
                    getCourseNamesOneTime(result, function (error, data) {//获取所有排课记录中的课程名，将其添加到数据库返回记录中
                        if (error)
                            reject(error);
                        else
                            resolve(data);
                    })
                })
            }, function (error) {
                console.log("error in ./admin/courseArranged.js  70行");
                console.log(error);
                res.send("error");
            })
                .then(function (data) {
                    result = data;
                    res.send(result);
                }, function (error) {
                    console.log("error in ./admin/courseArranged.js  78行");
                    console.log(error);
                    res.send("error");
                })
        }
    });
}

CourseArrangedAPI.methods.findAuditingClass = function (req, res) {
    CourseArrangedModel.find({status: '审核中'}, function (error, result) {
        if (error) {
            console.log("error in getAuditTable");
            console.log(error);
            res.send(error);
        }
        else {
            for (var i = 0; i < result.length; i++) {
                var obj = {
                    workNumber: result[i].workNumber,
                    sno: result[i].sno,
                    courseNo: result[i].courseNo,
                    startTime: result[i].startTime,
                    endTime: result[i].endTime,
                    courseNumber: result[i].courseNumber,
                    courseHour: result[i].courseHour,
                    status: result[i].status,
                    realCourseTime: result[i].realCourseTime,
                    remark: result[i].remark,
                    reason: result[i].reason,
                    photoEvidencePath: result[i].photoEvidencePath,
                    returnVisitPath: result[i].returnVisitPath,
                    threeTimes: result[i].threeTimes
                }
                result[i] = obj;
            }
            new Promise((resolve, reject) => {
                getNamesBySnoOneTime(result, function (error, data) { //获取所有排课记录中的学生姓名，将其添加到数据库返回的记录中
                    if (error)
                        reject(error);
                    else
                        resolve(data);
                })
            }).then(function (data) {
                return new Promise((resolve, reject) => {
                    getCourseNamesOneTime(result, function (error, data) {//获取所有排课记录中的课程名，将其添加到数据库返回记录中
                        if (error)
                            reject(error);
                        else
                            resolve(data);
                    })
                })
            }, function (error) {
                console.log("error in getAuditTable");
                console.log(error);
                res.send(error);
            })
                .then(function (data) {
                    result = data;
                    getTeacherNamesOneTime(result, function (error, data) {
                        if (error) {
                            console.log("error in getTeacherNamesOneTime");
                            console.log(error);
                            res.send("error in getTeacherNamesOneTime")
                        } else {
                            res.send(data);
                        }
                    })
                }, function (error) {
                    console.log("error in getCourseNamesOneTime");
                    console.log(error);
                    res.send(error);
                })
        }
    });
}

CourseArrangedAPI.methods.refuseAudit = function (req, res) {  //不通过教师提交的审核记录
    var detail = req.body.detail;
    CourseArrangedModel.update(
        {
            workNumber: detail.workNumber,
            sno: detail.sno,
            startTime: detail.startTime,
        },
        {
            status: detail.status,
            reason: detail.reason
        },
        function (error, docs) {
            if (error)
                res.send(error);
            else {
                teacherModel.update(
                    {workNumber: detail.workNumber},
                    {'$inc': {'unpaidTime': -detail.realCourseTime}},
                    (error) => {
                        if (error) {
                            console.log("error in ./admin/courseArranged.js   176行")
                            res.send(error);
                        } else {
                            res.send("successful");
                        }
                    });
            }

        })
}

CourseArrangedAPI.methods.submitAudit = function (req, res) {      //教师在手机端提交审核
    let flag = req.body.threeTimes;
    CourseArrangedModel.update({
            workNumber: req.body.workNumber,
            sno: req.body.sno,
            startTime: req.body.startTime
        }, {
            $set: {
                realCourseTime: req.body.realCourseTime,//实际课时
                remark: req.body.remark,
                photoEvidencePath: req.body.photoEvidencePath,
                returnVisitPath: req.body.returnVisitPath,
                status: req.body.status,
                threeTimes: flag
            }
        },
        (error, rec) => {
            if (error)
                res.send(error);
            else {
                teacherModel.update(
                    {workNumber: req.body.workNumber},
                    {'$inc': {'unpaidTime': req.body.realCourseTime}},
                    (error) => {
                        if (error) {
                            console.log("error in ./admin/courseArranged.js   196行")
                            res.send(error);
                        } else {
                            res.send("successful");
                        }
                    });
            }
        }
    );
}

CourseArrangedAPI.methods.throughAudit = function (req, res) {
    var detail = req.body.detail;
    CourseArrangedModel.remove({
        workNumber: detail.workNumber,
        sno: detail.sno,
        startTime: detail.startTime
    }, function (error, doc) {
        if (error)
            res.send(error)
        else
            new historyListModel(detail).save((error) => {
                if (error) {
                    console.log("error in ./admin/courseArranged.js")
                    console.log(error);
                    res.send(error);
                }
                else {
                    teacherModel.update({
                        workNumber: detail.workNumber
                    }, {
                        '$inc': {
                            'unpaidTime': -detail.realCourseTime,
                            'paidTime': detail.realCourseTime
                        }
                    }, (error) => {
                        if (error) {
                            console.log("error in ./admin/courseArranged.js  249行");
                            console.log(error);
                            res.send(error);
                        } else {
                            let changeValue = detail.courseNumber - detail.realCourseTime;
                            StudentModel.update({
                                'sno': detail.sno
                            }, {
                                '$inc': {
                                    orderCourseNumber: changeValue
                                }
                            }, (error) => {
                                if (error) {
                                    console.log("error in ./admin/courseArranged.js   261行");
                                    console.log(error);
                                    res.send(error);
                                } else {
                                    res.send("successful");
                                }
                            })
                        }
                    });
                }

            });
    });
}

//筛选出能教课的老师
CourseArrangedAPI.methods.teacherOptions = function (req, res, next) {
    let query = req.query;
    console.log(query);
    let FindCourseNoPromise = CourseModel.findOne({courseName: query.courseName, gradeNo: query.gradeNo});  //找出课程号
    FindCourseNoPromise.then((result) => {
        if (result != null) {
            teacherModel.find({course: result.courseNo})  //找出能授课的老师 根据外键 course 为 该课程id
                .select("workNumber name")
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
                        console.log(documents)
                        let options = results.filter(function (el, index) {//根据在已经安排的课程中找到出来的老师 在开始的授课老师中过滤掉
                            let flag = true;    //标志 表示可以任课
                            for (let i = 0; i < documents[index].length; i++) {//循环 如果该教师存在 flag为false
                                if (documents[index][i] !== null) {
                                    console.log("is equai", documents[index][i].workNumber === el.workNumber);
                                    if (documents[index][i].workNumber === el.workNumber) {
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

//筛选出年级
CourseArrangedAPI.methods.findGrade = function (req, res, next) {
    let query = req.query;
    let findGradePromise = StudentModel.findOne({sno: query.sno});//根据学生学号找出他的年级
    findGradePromise.then((doc) => {
        if ($.isEmpty(doc))
            $.result(res, "error");
        res.send({
            status: 1,
            grade: doc.gradeNo
        })
    }, (err) => {
        console.log(err);
    })
}

//安排课程
CourseArrangedAPI.methods.courseArranged = function (req, res, next) {
    let query = req.query;
    //找出课程号
    let findCourseNoPromise = CourseModel.findOne({gradeNo: query.gradeNo, courseName: query.courseName});
    findCourseNoPromise.then((doc) => {
        delete query.gradeNo; //删除年级
        delete query.courseName;    //删除课程
        query.courseNo = doc.courseNo;//只记录课程号
        let ArrangedPromise = CourseArrangedModel.create(query);
        ArrangedPromise.then((doc) => {
            if (doc) {
                StudentModel.update({sno: query.sno},
                    {
                        '$inc': {'orderCourseNumber': -parseInt(doc.courseNumber)}
                    }).then((res)=>{
                    console.log(res)
                })
                $.result(res, doc);
            }
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
CourseArrangedAPI.methods.total = function (req, res, next) {
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
CourseArrangedAPI.methods.arrangedLists = async function (req, res, next) {
    let _this = this;
    let {limit = 10, start = 0} = req.query;
    try {
        let Courses = await CourseArrangedModel.find({}).limit(Number(limit)).skip(Number(limit * start));//已经安排的课程
        let results = [];
        for (let i = 0; i < Courses.length; i++) {
            //根据学号 在学生表中查找该学生姓名
            let StudentName = await StudentModel.findOne({sno: Courses[i].sno}, 'name');
            // //根据教师工号 找出教师名字
            let TeacherName = await teacherModel.findOne({workNumber: Courses[i].workNumber}, 'name');

            //根据课程号 找出年级
            let Course = await CourseModel.findOne({courseNo: Courses[i].courseNo}, 'courseName gradeNo');
            if (StudentName !== null && TeacherName !== null && Course !== null) {
                let dateformat = {  //对时间进行格式化
                    startTime: $.dateformat(Courses[i].startTime, 'YYYY-MM-DD HH:mm:ss'),
                    endTime: $.dateformat(Courses[i].endTime, 'YYYY-MM-DD HH:mm:ss')
                }
                let CourseArranged = {//组成一个前端数据需要的对象
                    ...Courses[i]._doc, ...{StudentName: StudentName.name}, ...{TeacherName: TeacherName.name}, ...{
                        courseName: Course.courseName,
                        gradeNo: Course.gradeNo
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

export default CourseArrangedAPI.methods;