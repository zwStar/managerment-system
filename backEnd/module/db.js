/**
 * Created by Administrator on 2017/7/31.
 */
var mongoose = require("mongoose");

// var db = mongoose.createConnection("mongodb://127.0.0.1:27017/managerment-system");
// var db = mongoose.createConnection("mongodb://zwVic:adgjmp123@119.29.82.47:27017/example")
// db.once('open',function (callback) {
//     console.log("mongodb connect successful");
// })
mongoose.Promise = global.Promise;
let options = {
    db: {native_parser: true},
    server: {poolSize: 5}
};


//127.0.0.1:27017/data
mongoose.connect("mongodb://zwVic:adgjmp123@119.29.82.47:27017/example", options).then(() => {
    console.log(`数据库连接成功`);
}, (err) => {
    console.log(err);
    process.exit(1);        //终止当前进程并返回给定的 code。如果省略了 code，退出是会默认返回成功的状态码('success' code) 也就是 0：
                            //参数1表示未捕获的致命异常
});
