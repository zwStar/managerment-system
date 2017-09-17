<template>
    <div class="home">
        <header>数据统计</header>
        <el-row :gutter="40" style="margin-bottom: 10px;">
            <el-col :span="4" :offset="4">
                <div class="data_list today_head"><span class="data_num head">当日数据：</span></div>
            </el-col>
            <el-col :span="4">
                <div class="data_list"><span class="data_num">{{studentCount}}</span> 新增学员</div>
            </el-col>
            <el-col :span="4">
                <div class="data_list"><span class="data_num">{{teacherCount}}</span> 新增教师</div>
            </el-col>
            <el-col :span="4">
                <div class="data_list"><span class="data_num">{{courseCount}}</span> 新增排课量</div>
            </el-col>
        </el-row>
        <el-row :gutter="40">
            <el-col :span="4" :offset="4">
                <div class="data_list all_head"><span class="data_num head">总数据：</span></div>
            </el-col>

            <el-col :span="4">
                <div class="data_list"><span class="data_num">{{allStudentCount}}</span> 学员数量</div>
            </el-col>
            <el-col :span="4">
                <div class="data_list"><span class="data_num">{{allTeacherCount}}</span> 教师数量</div>
            </el-col>
            <el-col :span="4">
                <div class="data_list"><span class="data_num">{{allCourseCount}}</span> 排课数量</div>
            </el-col>
        </el-row>
        <tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>
    </div>
</template>

<script>
    import tendency from '../../components/tendency.vue'
    import * as api from '../../api'

    export default {
        components: {
            tendency
        },
        data() {
            return {
                studentCount: 0,
                teacherCount: 0,
                courseCount: 0,
                allStudentCount: 0,
                allTeacherCount: 0,
                allCourseCount: 0,
                sevenDay: [],
                sevenDate: [[], [], []],
            }
        },
        methods: {
            initGetData() {
                let _this = this;
                let PromiseArr = [];
                PromiseArr.push(api._get({url: "/user/studentsCount"}));//获取学生总数
                PromiseArr.push(api._get({url: "/user/teachersCount"}));//获取教师总数
                PromiseArr.push(api._get({url: "/course/ArrangedCount"}));//获取排课总数
                PromiseArr.push(api._get({url: "/statis/studentCount", data: {date: new Date()}}));//获取当天学生数量
                PromiseArr.push(api._get({url: "/statis/teacherCount", data: {date: new Date()}}));//获取当天教师数量
                PromiseArr.push(api._get({url: "/statis/orderCount", data: {date: new Date()}}));//获取订单数量
                Promise.all(PromiseArr).then(res => {
                    console.log("all Count",res)
                    _this.allStudentCount = res[0].data.count;
                    _this.allTeacherCount = res[1].data.count;
                    _this.allCourseCount = res[2].data.count;
                    _this.studentCount = res[3].data.count;
                    _this.teacherCount = res[4].data.count;
                    _this.courseCount = res[5].data.count;
                })
            },
            getSevenData() {
                let nowWeek = new Date().getDay();      //获取当天是星期几 0表示星期日 是一个星期的开始
                let now = new Date().getTime();   //获取当前时间戳

                let millisecond = 1000 * 60 * 60 * 24;   //一天毫秒数
                for (let i = nowWeek; i >=0; i--) {//从周一到当前日期
                    this.sevenDay.push(new Date(now - millisecond * i))
                }
                for (let i = 1; i <= 6 - nowWeek; i++) {//从当前日期到周末
                    this.sevenDay.push(new Date(now + millisecond * i))
                }
                const apiArr = [[], [], []];
                this.sevenDay.forEach(item => {
                    console.log(item)
                    apiArr[0].push(api._get({url: "/statis/studentCount", data: {date: item}}))
                    apiArr[1].push(api._get({url: "/statis/teacherCount", data: {date: item}}))
                    apiArr[2].push(api._get({url: "/statis/orderCount", data: {date: item}}))
                })
                const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]]
                Promise.all(promiseArr).then(res => {
                    const resArr = [[], [], []];
                    res.forEach((item, index) => {
                        if (item.data.status == 1) {
                            resArr[Math.floor(index / 7)].push(item.data.count)
                        }
                    })
                    this.sevenDate = resArr;
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        mounted() {
            this.initGetData();

            this.getSevenData();
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .home {

    }

    header {
        font-size: 35px;
        text-align: center;
        margin: 20px 0;
        font-weight: bold;
    }

    .data_list {
        color: #666;
        border-radius: 6px;
        background: #E5E9F2;
        text-align: center;
        line-height: 30px;
        .data_num {
            color: #333;
            font-size: 26px;
        }
    }
</style>