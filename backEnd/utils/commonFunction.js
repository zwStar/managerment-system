var courseModel = require("../module/course");
var teacherModel = require("../module/teacher");
var studentModel = require("../module/student");
var historyListModel = require("../module/historyList");
var courseArrangeModel = require("../module/courseArrange");

export const getNamesBySnoOneTime = function (data,callback) {//通过多个学号一次获取多个学生姓名
    var promises = [];
    for( var i = 0 ; i < data.length ; i++ ){
        promises.push(new Promise(function (resolve,reject) {
            studentModel.findOne({sno:data[i].sno},"name",function (error,student) {
                if(error)
                    reject(error);
                else
                    resolve(student.name)
            })
        }))
    }
    Promise.all(promises).then(function (student) {
        for(var i = 0 ; i < student.length ; i++ ){
            data[i].studentName = student[i];
        }
        callback(null,data);
    },function (error) {
        callback(error,null);
    })
}

export const getCourseNamesOneTime = function (data, callback) { //通过多个课程号一次获取多个课程名
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
}

export const dealWithData = function (data, callback) {

    var PRIMARY_REG = /(小学)([\u4e00-\u9fa5]{2})/
    var JUNIOR_REG = /(初中)([\u4e00-\u9fa5]{2})/
    var HIGH_REG = /(高中)([\u4e00-\u9fa5]{2})/
    var CONVENTIONAL_REG = /([\u4e00-\u9fa5]{2})([\u4e00-\u9fa5]{2})/

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
            courseModel.findOne({gradeNo: result[1], courseName: result[2]}, function (err, course) {
                if (err) {
                    reject(err);
                } else {
                    resolve(course.courseNo);
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

export const getTeacherNamesOneTime = function(data,callback){//找出教师名字
    var promises = [];
    for( var i = 0 ; i < data.length ; i++ ){
        promises.push(new Promise(function(resolve,reject){
            teacherModel.findOne({workNumber:data[i].workNumber},'name',function(error,teacher){
                if(error){
                    console.log("error in module teacher.js")
                    reject(error);
                }
                else
                    resolve(teacher.name);
            })
        }))
    }
    Promise.all(promises).then(function(teacher){
        for( var i = 0 ; i < teacher.length ; i++ ){
            data[i].teacherName = teacher[i];
        }
        callback(null,data);
    },function(error){
        callback(error,null);
    })
};

export const getClassCount = function(req,res){    //获取老师上课的次数
    var promises = [];
    promises.push(new Promise(function(resolve,reject){
        historyListModel.count(req.query,function(error,result){
            if(error)
                reject(error);
            else
                resolve(result);
        })
    }))
    promises.push(new Promise(function(resolve,reject){
        courseArrangeModel.count({ ...req.body.data,$or:[{status:'未通过'},{status:'审核中'}]},(error,result)=>{
            if(error)
                reject(error);
            else{
                resolve(result);
            }
                
        })
    }))

    Promise.all(promises).then((result)=>{
        res.send({count:result[0]+result[1]});
    },(error)=>{
        res.send("error");
    })
}


var fs = require('fs');
export const savePhoto = function(req,res,path){
    var base64 = req.body.base64.replace(/^data:image\/\w+;base64,/, "");//去掉图片base64码前面部分data:image/png;base64
    var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
    var name = Date.now();
    var path = "./photo/"+path+"/"+ name +'.'+ req.body.type;
    fs.writeFile(path,dataBuffer,function(err){//用fs写入文件
        if(err){
            console.log(err);
        }else{
            res.send({name:name+"."+req.body.type});
        }
    })
}