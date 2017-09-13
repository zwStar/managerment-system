/**
 * Created by admin on 2017/8/5.
 */
import Model from '../module'
import $ from '../utils'
import Base from './base'

import CourseModel from '../module/course'         //课程表
import TeacherModel from '../module/teacher'        //教师表
import CourseArrangedModel from '../module/courseArrange'//课程安排表
import StudentModel from '../module/student'        //学生表
let CourseAPI = new Base({
    model: CourseModel
});
//筛选出能教课的老师
CourseAPI.methods.teacherOptions = function (req, res, next) {
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

//筛选出年级
CourseAPI.methods.findGrade = function (req, res, next) {
    let query = req.query;
    let findGradePromise = StudentModel.findOne({sno: query.sno});//根据学生学号找出他的年级
    findGradePromise.then((doc) => {
        if ($.isEmpty(doc))
            $.result(res, "error");
        $.result(res, {grade: doc.grade});
    }, (err) => {
        console.log(err);
    })
};

//安排课程
CourseAPI.methods.courseArranged = function (req, res, next) {
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
CourseAPI.methods.total = function (req, res, next) {
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
CourseAPI.methods.arrangedLists = async function (req, res, next) {
    let {limit = 10, start = 0} = req.query;
    try {
        let Courses = await CourseArrangedModel.find({}).limit(Number(limit)).skip(Number(limit * start));
        let results = [];
        for (let i = 0; i < Courses.length; i++) {
            //根据学号 在学生表中查找该学生姓名
            let StudentName = await StudentModel.findOne({sno: Courses[i].sno}, 'name');
            //根据教师工号 找出教师名字
            let TeacherName = await TeacherModel.findOne({workNumber: Courses[i].workNumber}, 'name');
            //根据课程号 找出年级
            let Course = await CourseModel.findOne({courseNo: Courses[i].courseNo}, 'course grade');
            if (StudentName !== null && TeacherName !== null && Course !== null) {
                let dateformat = {  //对时间进行格式化
                    startTime: $.dateformat(Courses[i].startTime, 'YYYY-MM-DD HH:mm:ss'),
                    endTime: $.dateformat(Courses[i].endTime, 'YYYY-MM-DD HH:mm:ss')
                }
                let CourseArranged = {//组成一个前端数据需要的对象
                    ...Courses[i]._doc, ...{StudentName: StudentName.name}, ...{TeacherName: TeacherName.name}, ...{
                        course: Course.course,
                        grade: Course.grade
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
export default CourseAPI.methods;


/*忽略下面的课程添加程序*/

// CourseAPI.methods.createCourse=()=>{
//     let data = [
/**********小学*******/
// {courseNo:"0101",grade:"一年级",course:"语文"},
// {courseNo:"0102",grade:"一年级",course:"数学"},
// {courseNo:"0103",grade:"一年级",course:"英语"},
//
// {courseNo:"0201",grade:"二年级",course:"语文"},
// {courseNo:"0202",grade:"二年级",course:"数学"},
// {courseNo:"0203",grade:"二年级",course:"英语"},
//
// {courseNo:"0301",grade:"三年级",course:"语文"},
// {courseNo:"0302",grade:"三年级",course:"数学"},
// {courseNo:"0303",grade:"三年级",course:"英语"},
//
// {courseNo:"0401",grade:"四年级",course:"语文"},
// {courseNo:"0402",grade:"四年级",course:"数学"},
// {courseNo:"0403",grade:"四年级",course:"英语"},
//
// {courseNo:"0501",grade:"五年级",course:"语文"},
// {courseNo:"0502",grade:"五年级",course:"数学"},
// {courseNo:"0503",grade:"五年级",course:"英语"},
//
// {courseNo:"0601",grade:"六年级",course:"语文"},
// {courseNo:"0602",grade:"六年级",course:"数学"},
// {courseNo:"0603",grade:"六年级",course:"英语"}
/**********小学*******/

/**********初中**********/
//         {courseNo:"0701",grade:"初一",course:"语文"},
//         {courseNo:"0702",grade:"初一",course:"数学"},
//         {courseNo:"0703",grade:"初一",course:"英语"},
//         {courseNo:"0704",grade:"初一",course:"历史"},
//         {courseNo:"0705",grade:"初一",course:"地理"},
//         {courseNo:"0706",grade:"初一",course:"生物"},
//         {courseNo:"0707",grade:"初一",course:"政治"},
//
//         {courseNo:"0801",grade:"初二",course:"语文"},
//         {courseNo:"0802",grade:"初二",course:"数学"},
//         {courseNo:"0803",grade:"初二",course:"英语"},
//         {courseNo:"0804",grade:"初二",course:"历史"},
//         {courseNo:"0805",grade:"初二",course:"地理"},
//         {courseNo:"0806",grade:"初二",course:"生物"},
//         {courseNo:"0807",grade:"初二",course:"政治"},
//         {courseNo:"0808",grade:"初二",course:"物理"},
//
//         {courseNo:"0901",grade:"初三",course:"语文"},
//         {courseNo:"0902",grade:"初三",course:"数学"},
//         {courseNo:"0903",grade:"初三",course:"英语"},
//         {courseNo:"0904",grade:"初三",course:"历史"},
//         {courseNo:"0905",grade:"初三",course:"地理"},
//         {courseNo:"0906",grade:"初三",course:"生物"},
//         {courseNo:"0907",grade:"初三",course:"政治"},
//         {courseNo:"0908",grade:"初三",course:"物理"},
//         {courseNo:"0909",grade:"初三",course:"化学"},
//         /**********初中**********/
//
//         /*********高中*************/
//         {courseNo:"1001",grade:"高一",course:"语文"},
//         {courseNo:"1002",grade:"高一",course:"数学"},
//         {courseNo:"1003",grade:"高一",course:"英语"},
//         {courseNo:"1004",grade:"高一",course:"历史"},
//         {courseNo:"1005",grade:"高一",course:"地理"},
//         {courseNo:"1006",grade:"高一",course:"生物"},
//         {courseNo:"1007",grade:"高一",course:"政治"},
//         {courseNo:"1008",grade:"高一",course:"物理"},
//         {courseNo:"1009",grade:"高一",course:"化学"},
//
//         {courseNo:"1101",grade:"高二",course:"语文"},
//         {courseNo:"1102",grade:"高二",course:"数学"},
//         {courseNo:"1103",grade:"高二",course:"英语"},
//         {courseNo:"1104",grade:"高二",course:"历史"},
//         {courseNo:"1105",grade:"高二",course:"地理"},
//         {courseNo:"1106",grade:"高二",course:"生物"},
//         {courseNo:"1107",grade:"高二",course:"政治"},
//         {courseNo:"1108",grade:"高二",course:"物理"},
//         {courseNo:"1109",grade:"高二",course:"化学"},
//
//         {courseNo:"1201",grade:"高三",course:"语文"},
//         {courseNo:"1202",grade:"高三",course:"数学"},
//         {courseNo:"1203",grade:"高三",course:"英语"},
//         {courseNo:"1204",grade:"高三",course:"历史"},
//         {courseNo:"1205",grade:"高三",course:"地理"},
//         {courseNo:"1206",grade:"高三",course:"生物"},
//         {courseNo:"1207",grade:"高三",course:"政治"},
//         {courseNo:"1208",grade:"高三",course:"物理"},
//         {courseNo:"1209",grade:"高三",course:"化学"},
//         /*********高中*************/
//     ]
//
//     for(let i=0;i<data.length;i++){
//         CourseModel.create(data[i]).then((results)=>{
//             console.logs(results);
//         },(err)=>{
//             console.logs(err);
//         });
//     }
// }


