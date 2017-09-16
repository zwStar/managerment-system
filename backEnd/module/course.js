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


var courseModel = mongoose.model("course", courseSchema);

module.exports = courseModel