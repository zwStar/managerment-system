/**
 * Created by 郭泽伟 on 2017/8/16.
 */
import StudentModel from '../module/student'
import TeacherModel from '../module/teacher'
import CourseArrangedModel from '../module/courseArrange'
import CourseModel from '../module/course'
import $ from '../utils'

let ModelArr ={StudentModel,TeacherModel,CourseArrangedModel,CourseModel};

async function courseArrangedSearch(res, val) {//如果是课程列表查询 走这个函数
    let model = CourseArrangedModel;
    let results = [];
    let promiseAll = [];
    try {
        //根据输入内容在学生表中模糊查找对应的学生姓名
        let Students = await StudentModel.find({name: {$regex: val, $options: 'i'}});
        //根据输入内容在教师表中模糊查找对应的教师姓名
        let Teachers = await TeacherModel.find({name: {$regex: val, $options: 'i'}});
        let results = [];
        if (Students.length) {  //如果查找到的内容不为空
            Students.forEach(student => {   //在已经安排的课表中根据学号找对应的document
                promiseAll.push(model.findOne({sno: student.sno}));
            })
        }
        if (Teachers.length) { //如果查找到的内容不为空
            Teachers.forEach(teacher => { //在已经安排的课表中根据工号找对应的document
                promiseAll.push(model.findOne({workNumber: teacher.workNumber}));
            })
        }
        if (promiseAll.length) {
            Promise.all(promiseAll).then(async (Courses) => {
                for (let i = 0; i < Courses.length; i++) {
                    if (Courses[i] !== null) {
                        let StudentName = await StudentModel.findOne({sno: Courses[i].sno}, 'name');
                        let TeacherName = await TeacherModel.findOne({workNumber: Courses[i].workNumber}, 'name');
                        let Course = await CourseModel.findOne({courseNo: Courses[i].courseNo}, 'course grade');
                        if (StudentName !== null && TeacherName !== null && Course !== null) {
                            let dateformat = {
                                startTime: $.dateformat(Courses[i].startTime, 'YYYY-MM-DD HH:mm:ss'),
                                endTime: $.dateformat(Courses[i].endTime, 'YYYY-MM-DD HH:mm:ss')
                            };
                            let CourseArranged = {
                                ...Courses[i]._doc, ...{StudentName: StudentName.name}, ...{TeacherName: TeacherName.name}, ...{
                                    courseName: Course.courseName,
                                    gradeNo: Course.gradeNo
                                }, ...dateformat
                            };
                            results.push(CourseArranged);
                        }
                    }
                }
                $.result(res, results);
            }, (err) => {
                console.log(err);
            })
        } else {
            $.result(res, results);
        }

    } catch (err) {
        res.send({
            status: 0,
            type: 'ERROR_PARAMS',
            message: "查询失败!"
        })
    }

}

export default function (req, res, next) {
    let query = {};
    try {
        if (req.query.model !== 'Course') {//如果不是查找排课表
            query[req.query.searchKey] = {$regex: req.query.searchVal, $options: 'i'}; //$regex 正则部分  i是全局匹配
            let model = ModelArr[`${req.query.model}Model`];
            if ($.isEmpty(model)) {
                return $.result(res, 'error');
            }
            const searchPrimose = model.find(query);
            searchPrimose.then((docs) => {
                $.result(res, docs);
            }, (err) => {
                console.log(err);
            })
        } else {    //查找排课表
            courseArrangedSearch(res, req.query.searchVal);
        }
    } catch (err) {
        console.log(err);
    }


}