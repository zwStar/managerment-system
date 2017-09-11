var express = require("express");
var router = express.Router();
var courseArranged = require("../module/courseArrange.js");
var historyList = require("../module/historyList");
var teacher = require("../module/teacher");

router.post("/", function (req, res) {//通过审核
    var detail = req.body.detail;
    courseArranged.remove({
        workNumber: detail.workNumber,
        sno: detail.sno,
        startTime: detail.startTime
    }, function (error, doc) {
        if (error)
            res.send(error)
        else
            new historyList(detail).save((error) => {
                if (error) {
                    console.log("error in ./router/throughAudit.js")
                    console.log(error);
                    res.send(error);
                }
                else
                    teacher.update({
                        workNumber: detail.workNumber
                    }, {
                        '$inc': {
                            'unpaidTime': -detail.realCourseTime,
                            'paidTime': detail.realCourseTime
                        }
                    }, (error) => {
                        if (error) {
                            console.log("error in ./router/thoughAudit.js");
                            console.log(error);
                            res.send(error);
                        } else {
                            res.send("successful");
                        }
                    });
            });
    });
});

module.exports = router;