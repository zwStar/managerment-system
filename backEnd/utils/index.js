/**
 * Created by 郭泽伟 on 2017/7/31.
 */
import config from './config'
import joi from 'joi'
import md5 from 'blueimp-md5'
import jwt from 'jsonwebtoken'
import moment from 'moment'
module.exports.config    = config;
module.exports.md5 = str=>md5(str);
module.exports.paramter = joi;

function createToken(name){     //创建token
    const token = jwt.sign({
            name
        },
        config.secret, {
            expiresIn: '24h' // 过期时间 这里只设置10s
        });
    return token;
}
module.exports.createToken =  createToken;      //创建token

function result(res, data, msg, status) {   //返回结果
    let redata = {};
    if (typeof data === 'string' ||
        data === 'null' ||
        data === undefined ||
        data === null || msg) {
        status = status || 400;
        redata = {
            msg: data,
        };
    } else {
        status = status || 200;
        redata = data;
    }
    res.status(status).send(redata);
};


//用于返回到前端结果函数
module.exports.result = result;

module.exports.checkToken = function (req, res, next) { //从请求cookie中 检查token的状态信息
    let token = req.cookies["Admin-Token"]?req.cookies["Admin-Token"] : undefined;    //从cookie中提取出token
    if(token){
        let decoded = jwt.verify(token, config.secret, function (err, decoded) { //token解析
            if (err) {
                console.log(err);
                if (err.message === "jwt expired") {
                    res.send({
                        status:"-1",
                        message:"token过期，请重新登录"
                    })
                }
            }else{
                req.user = decoded.name;
                next();
            }
        });
    }else{
        res.send({
            status:"-1",
            message:"token过期，请重新登录"
        })
    }

};

module.exports.isEmpty = function (value) { //判断是否为空
    if (typeof value == 'string') {
        return value.trim() === '';
    } else if (typeof value == 'number') {
        return value === 0;
    } else {
        return value === null || value === undefined;
    }
};

module.exports.dateformat = function (obj, format) {    //时间格式化
    format = format || 'YYYY-MM-DD';
    return moment(obj).format(format);
};

//检测验证码
module.exports.checkCap = function(req,res,captcha_code){
    const cap = req.cookies.cap;
    if (!cap) {
        console.log('验证码失效')
        res.send({
            status: 0,
            type: 'ERROR_CAPTCHA',
            message: '验证码失效',
        })
        return
    }
    if (cap.toString() !== captcha_code.toString()) {
        res.send({
            status: 0,
            type: 'ERROR_CAPTCHA',
            message: '验证码不正确',
        })
        return
    }else{
        return true;
    }
}

//获得今天0时和明天0时的Date数据
module.exports.todayAndTomorrow = function (date) {
    let time = moment(date).format('YYYY-MM-DD');
    time = time.replace(/-/g, '/')   //转换 如2017-08-29 转为 2017/08/29
    let today = new Date(time);     //转为 Tue Aug 29 2017 00:00:00 GMT+0800 (中国标准时间) 完整的时间
    let nextDay = new Date(today.getTime() + 24 * 60 * 60 * 1000);  //第二天
    return {today,nextDay};
}