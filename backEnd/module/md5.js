/**
 * Created by Administrator on 2017/7/31.
 */
var crypto = require("crypto");
module.exports = function (password) {
    var md5 = crypto.createHash('md5');
    password = md5.update(password).digest('base64');
    return password;
}