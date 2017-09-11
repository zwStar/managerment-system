/**
 * Created by 郭泽伟 on 2017/8/1.
 */
import Base from '../base'
var db =require("../db.js")
const Student = new Base("Student1",{
    sno:String,
    name:String,
    parentName:String,
    tel:String,
    sendAt:    { type: Date, default: Date.now },
    school:String,
    managerTeacher:String,
    grade:String,
    orderCourseNumber:String
})



export default Student.model
