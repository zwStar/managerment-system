import $ from '../utils'
export default class Base {
    constructor(options) {
        this.model = options.model || {};
        this.search = options.search || {};
        this.methods = addMethods(this);
    }
}
function addMethods(_this) {
    let methods = {};
    methods.create = function (req, res, next) {
        let params = req.method === 'POST' ? req.body : req.query;
        let createPromise = _this.model.create(params);
        createPromise.then((results) => {
            $.result(res, {success: true, message: "添加成功！"});
        }, (error) => {
            console.log(error);
        })
    };

    methods.total = async function (req, res, next) {
        try{
            let count = await _this.model.count({});
            console.log(count)
            res.send({
                status: 1,
                success: '获取总数成功',
                count: count
            })
        }catch (err){
            console.log(err);
            res.send({
                status:0,
                message: '获取总数失败'
            })
        }
    }

    methods.all = function (req, res, next) {
        let allInfoPromise = _this.model.find({});
        allInfoPromise.then((docs) => {
            console.log(docs);
            $.result(res, docs);
        }, (err) => {
            console.log(err);
        })
    };
    return methods;
}