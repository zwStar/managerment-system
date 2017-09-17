<template>
    <div class="course-info">
        <header>
            <el-row>
                <el-col :span="18">
                    <!--输入名字搜索 授课老师 或学生姓名-->
                    <vsearch model='Course' searchKey='name'></vsearch>
                </el-col>
                <el-col :offset="1" :span="4">
                    <span @click="dialogVisible=true" class="addCourse">新增排课</span>
                </el-col>
            </el-row>
        </header>
        <v-table :data="items"></v-table>
        <el-dialog title="新增排课" :visible.sync="dialogVisible" size="small">
            <el-form :label-width="formLabelWidth">
                <el-form-item label="学号">
                    <el-row>
                        <el-col :span="16">
                            <el-input v-model="sno" @blur="getGrade()" placeholder="请输入学号"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="年级">
                    <el-row>
                        <el-col :span="16">
                            <el-select v-model="gradeNo" placeholder="请选择年级">
                                <el-option v-for="item in gradeOptions" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="课程">
                    <el-row>
                        <el-col :span="16">
                            <el-select v-model="courseName" placeholder="请选择课程">
                                <el-option v-for="item in courseOptions" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="时间">
                    <el-row>
                        <el-col :span="16">
                            <el-date-picker v-model='startTime' type="datetime" placeholder="选择日期时间">
                            </el-date-picker>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="课时数">
                    <el-row>
                        <el-col :span="16">
                            <el-select v-model="courseNumber" placeholder="请选择课时数">
                                <el-option v-for="item in courseNumberOptions" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="教师">
                    <el-row>
                        <el-col :span="16">
                            <el-select v-model="teacher" placeholder="请选择教师">
                                <el-option v-for="item in teacherOptions" :key="item.workNumber" :label="item.name"
                                           :value="item.workNumber">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="onSubmit(); dialogVisible = false">确 定</el-button>
                    </span>
        </el-dialog>
        <!--分页器-->
        <div class="pagination">
            <el-pagination
                    layout="prev, pager, next"
                    :total="Count"
                    :page-size="pageSize"
                    @current-change="handleCurrentChange"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import * as api from '../../api'
    import courseList from '../../assets/json/course.json'
    import vTable from './table.vue'

    export default {
        data() {
            return {
                gradeOptions: [],
                gradeNo: '',
                courseName: "",
                teacherOptions: [
                    {
                        name: "请先填写前面信息",
                        workNumber: ""
                    }
                ],
                sno: "",        //学生学号
                teacher: "",    //老师工号
                startTime: "",  //开始时间
                courseNumberOptions: [1, 2, 3, 4, 5],//课节数可选
                courseNumber: "",       //课节数
                courseHour: 45,         //每节课多少分钟
                dialogVisible: false,   //对话框显示
                formLabelWidth: '80px', //lebel宽度
                Count: 0,       //总数量
                pageSize: 10,   //每页多少条
            }
        },
        components: {
            vTable
        },
        computed: {
            courseOptions() {   //根据年级  选出可选课程
                if (this.gradeNo)
                    return courseList[this.gradeNo];
                else
                    return "";
            },
            endTime() { //根据开始时间 和 课程数 和 课程时长 计算结束时间
                let date = this.startTime.getTime();    //getTime()转为时间戳
                let add = this.courseNumber * this.courseHour * 60 * 1000;//课程时长
                return new Date(date + add);    //返回结束时间
            },
            items() {   //当vuex里面的数据变化 利用计算属性  自动改变table中的视图
                let lists = this.$store.state.user.adminItems;
                return lists;
            }
        },
        watch: {
            courseNumber() {    //对课程数进行监听 因为课程数是选择教师的前一个选项 选择完该选项就需要动态获取教师可选列表
                if (this.courseNumber !== "" && this.courseName !== "" && this.gradeNo !== "" && this.startTime !== "") {
                    const _this = this;
                    api._get({
                        url: "course/teacherOptions",
                        data: {//根据年级 课程 开始时间 结束时间去推出可选教师
                            gradeNo: _this.gradeNo,
                            courseName: _this.courseName,
                            startTime: _this.startTime,
                            endTime: _this.endTime
                        }
                    }).then((results) => {
                        let result = results.data;
                        _this.teacherOptions = [];
                        if(!result.data.length){
                            _this.teacherOptions.push({name:"该课程暂无可授课老师",workNumber:""})
                        }else{
                            let list = {};
                            result.data.forEach((el) => {
                                list = {};
                                list.name = el.name;
                                list.workNumber = el.workNumber;
                                _this.teacherOptions.push(list);
                            })
                        }
                    }, (error) => {
                        console.log(error)
                    })
                }
            }
        },
        methods: {
            onSubmit() { //提交
                let _this = this;
                if(_this.sno && _this.gradeNo && _this.courseName && _this.startTime && _this.endTime && _this.courseNumber && _this.courseHour && _this.teacher){
                    api._get({
                        url: 'course/courseArranged',
                        data: {
                            sno: _this.sno,
                            gradeNo: _this.gradeNo,
                            courseName: _this.courseName,
                            startTime: _this.startTime,
                            endTime: _this.endTime,
                            courseNumber: _this.courseNumber,
                            courseHour: _this.courseHour,
                            workNumber: _this.teacher
                        }
                    }).then((result) => {
                        console.log(result)
                        if (result.status === 200) {  //添加成功
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            _this.fetch();
                        } else {      //添加失败
                            this.$message({
                                message: '添加失败',
                                type: 'error'
                            });
                        }
                    }, (err) => {
                        console.log(err);
                    })
                }else{
                    this.$message({
                        message: '请完整填写信息',
                        type: 'error'
                    });
                }

            },
            resetForm(formName) {   //表单重置
                this.$refs[formName].resetFields();
            },
            getGrade() {     //根据学号找年级
                let _this = this;
                api._get({
                    url: "course/findGrade",
                    data: {
                        sno: _this.sno
                    }
                }).then((results) => {
                    let result = results.data;
                    _this.gradeOptions = [];
                    _this.gradeOptions.push(result.grade);
                }, (error) => {
                    console.log(error)
                })
            },
            handleCurrentChange(CurrentPage) {  //分页器切换
                this.fetch(CurrentPage- 1);
            },
            fetch(start = 0, limit = this.pageSize) {   //抓取数据
                let _this = this;
                api._get({
                    url: "course/ArrangedLists",
                    data: {
                        start,
                        limit
                    }
                }).then((results) => {  //用vuex管理数据
                    _this.$store.commit("SET_ITEM", {key: 'adminItems', val: results.data});
                })
            },
            count() {   //计算总数量
                let _this = this;
                api._get({
                    url: "course/ArrangedCount",
                    data: {}
                }).then((results) => {
                    _this.Count = results.data.count;
                })
            }
        },
        mounted() {//页面加载后获取总数量 和 抓取限量内容
            this.count();
            this.fetch();
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    header {
        width: 600px;
        margin: 0 auto;
        span {
            color: #20a0ff;
            cursor: pointer;
        }
    }

    .pagination {
        text-align: center;
    }

    .addCourse {
        display: inline-block;
        margin-top: 10px;
    }
</style> 