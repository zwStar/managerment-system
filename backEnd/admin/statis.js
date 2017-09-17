import $ from '../utils'
import StudentModel from '../module/student'
import TeacherModel from '../module/teacher'
import CourseArrangedModel from '../module/courseArrange'


class Statis {
    constructor() {
    }
    async studentCount(req, res, next) {
        let date = req.query.date;
        if (!date) {
            console.log('参数错误')
            res.send({
                status: 0,
                type: 'ERROR_PARAMS',
                message: '参数错误'
            })
            return
        }
        try {
            let obj = $.todayAndTomorrow(date);
            const count = await StudentModel.find({$and: [{sendAt: {$gte: obj.today}}, {sendAt: {$lt: obj.nextDay}}]}).count();
            res.send({
                status: 1,
                count,
            })
        } catch (err) {
            console.log(err)
            console.log('获取当天新增学生人数失败');
            res.send({
                status: 0,
                type: 'ERROR_GET_USER_REGISTE_COUNT',
                message: '获取当天新增学生人数失败'
            })
        }

    }


    async teacherCount(req, res, next) {
        const date = req.query.date;
        if (!date) {
            console.log('参数错误')
            res.send({
                status: 0,
                type: 'ERROR_PARAMS',
                message: '参数错误'
            })
            return
        }
        try {
            let obj = $.todayAndTomorrow(date);
            const count = await TeacherModel.find({$and: [{inductionDate: {$gte: obj.today}}, {inductionDate: {$lt: obj.nextDay}}]}).count();
            res.send({
                status: 1,
                count,
            })
        } catch (err) {
            console.log('获取当天新增教师人数失败');
            res.send({
                status: 0,
                type: 'ERROR_GET_USER_REGISTE_COUNT',
                message: '获取当天新增教师人数失败'
            })
        }

    }

    async orderCount(req, res, next) {
        const date = req.query.date;
        if (!date) {
            console.log('参数错误')
            res.send({
                status: 0,
                type: 'ERROR_PARAMS',
                message: '参数错误'
            })
            return
        }
        try {
            let obj = $.todayAndTomorrow(date);
            const count = await CourseArrangedModel.find({$and: [{startTime: {$gte: obj.today}}, {startTime: {$lt: obj.nextDay}}]}).count();
            res.send({
                status: 1,
                count,
            })
        } catch (err) {
            console.log(err)
            console.log('获取当天排课数量失败');
            res.send({
                status: 0,
                type: 'ERROR_GET_USER_REGISTE_COUNT',
                message: '获取当天排课数量失败'
            })
        }
    }
}

export default new Statis()