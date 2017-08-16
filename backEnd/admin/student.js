/**
 * Created by admin on 2017/8/5.
 */
import Model from '../module'

import Base from './base'

/* let StudentModel = Model.admin.StudentModel; */
let StudentModel = require("../module/student")

let StudentAPI = new Base({
   model:StudentModel
});

StudentAPI.methods.getNamesBySnoOneTime = function (data,callback) {//通过多个学号一次获取多个学生姓名
    var promises = [];
    for( var i = 0 ; i < data.length ; i++ ){
        promises.push(new Promise(function (resolve,reject) {
            StudentModel.findOne({sno:data[i].sno},"name",function (error,student) {
                if(error)
                    reject(error);
                else
                    resolve(student.name)
            })
        }))
    }
    Promise.all(promises).then(function (student) {
        for(var i = 0 ; i < student.length ; i++ ){
            data[i].sno = student[i];
        }
        callback(null,data);
    },function (error) {
        callback(error,null);
    })
}

export default StudentAPI.methods;