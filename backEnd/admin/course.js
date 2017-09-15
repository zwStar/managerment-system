import Base from './base'

let courseModel = require("../module/course");
let courseAPI = new Base({
    model:courseModel
 });


courseAPI.methods.findCourseNo = function (data, callback) {
    courseModel.find(data, callback)
}

/* courseAPI.methods.getCourseNamesOneTime = function (data, callback) { //通过多个课程号一次获取多个课程名
    var promises = [];
    for (var i = 0; i < data.length; i++) {
        promises.push(new Promise(function (resolve, reject) {
            courseModel.findOne({courseNo: data[i].courseNo}, function (error, course) {
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
} */
/* courseAPI.methods.dealWithData = function (data, callback) {
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
        }else if(result[1] == "小学"){
            data.push({name: "小一" + result[2]});
            data.push({name: "小二" + result[2]});
            data.push({name: "小三" + result[2]});
            data.push({name: "小四" + result[2]});
            data.push({name: "小五" + result[2]});
            data.push({name: "小六" + result[2]});
            continue;
        }
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            courseModel.find({gradeNo: result[1], courseName: result[2]}, function (err, course) {
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

} */


 export default courseAPI.methods;