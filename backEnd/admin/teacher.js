/**
 * Created by admin on 2017/8/5.
 */
import Base from './base'
import $ from '../utils'
import Models from '../module'

let TeacherModel = Models.admin.TeacherModel;
let CourseModel = Models.admin.CourseModel;

let TeacherAPI = new Base({
    model: TeacherModel
});


TeacherAPI.methods.create = function (req, res, next) {
    let query = req.body;
    let courseOptions = query.course.split(",")

    let promiseArr = [];

    courseOptions.forEach(el => {
        promiseArr.push(CourseModel.find({
                grade: el.slice(0, 2),
                course: el.slice(2)
            })
        )
    });
    Promise.all(promiseArr).then(values => {
        courseOptions = [];
        values.forEach(el=>{
            courseOptions.push(el._id);
        })
        query.course = courseOptions;
        TeacherModel.create(query).then((doc)=>{
            console.log(doc);
            $.result(res,doc);
        },(err)=>{
            console.log(err);
        })
    });
}

TeacherAPI.methods.teacherLists = async function (req,res,next) {
    let {limit = 10 ,start = 0} = req.query;
    let Teachers = await TeacherModel.find({},'-password -id').limit(Number(limit)).skip(Number(limit * start));
    let arr = [];
    for(let i=0;i<Students.length;i++){
        let CourseArrangeds = await CourseArrangedModel.find({workNumber:Teachers[i].workNumber,status:"审核中"});
        let  unpaidTime = 0;
        CourseArrangeds.forEach(course=>{
            unpaidTime += course.courseNumber;
        })

        let Teacher = {...Students[i]._doc,...{unpaidTime:unpaidTime},...{date:$.dateformat(Students[i].sendAt)}};
        arr.push(Teacher)
    }
    $.result(res,arr);
}

export default TeacherAPI.methods;

