<template>
    <div class="course-info">
        <header>
            <el-row>
                <el-col :span="18">
                    <vsearch model='Course' searchKey='name'></vsearch>
                    <div class="addCourse">
                        <el-form>
                            <el-row :gutter="20">
                                <el-col :span="3">
                                    <el-form-item>
                                        <el-input v-model="sno" @blur="getGrade()" placeholder="请输入学号"></el-input>
                                    </el-form-item>

                                </el-col>
                                <el-col :offset="1" :span="4">
                                    <span @click="dialogVisible=true">新增排课</span>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
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
                            <el-select v-model="grade" placeholder="请选择年级">
                                <el-option v-for="item in gradeOptions" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-form-item>

                <el-form-item label="课程">
                    <el-row>
                        <el-col :span="16">
                            <el-select v-model="course" placeholder="请选择课程">
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
                                <el-option v-for="item in teacherOptions" :key="item.workNumber" :label="item.name" :value="item.workNumber">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="onSubmit(); dialogVisible = false" >确 定</el-button>
                    </span>
        </el-dialog>
        </div>
            <!--<div class="addCourse">-->
                <!--<el-form>-->
                    <!--<el-row :gutter="20">-->
                        <!--<el-col :span="3">-->
                            <!--<el-form-item >-->
                                <!--<el-input v-model="sno" @blur="getGrade()" placeholder="请输入学号"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->

                        <!--<el-col :span="3">-->
                            <!--<el-form-item>-->
                                <!--<el-select v-model="grade" placeholder="请选择年级">-->
                                    <!--<el-option v-for="item in gradeOptions" :key="item" :label="item" :value="item">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->

                        <!--<el-col :span="3">-->
                            <!--<el-form-item>-->
                                <!--<el-select v-model="course" placeholder="请选择课程">-->
                                    <!--<el-option v-for="item in courseOptions" :key="item" :label="item" :value="item">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->

                        <!--<el-col :span="5">-->
                            <!--<el-form-item>-->
                                <!--<el-date-picker v-model='startTime' type="datetime" placeholder="选择日期时间">-->
                                <!--</el-date-picker>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->

                        <!--<el-col :span="3">-->
                            <!--<el-form-item>-->
                                <!--<el-select v-model="courseNumber" placeholder="请选择课时数">-->
                                    <!--<el-option v-for="item in courseNumberOptions" :key="item" :label="item" :value="item">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->

                        <!--<el-col :span="3">-->
                            <!--<el-form-item>-->
                                <!--<el-select v-model="teacher" placeholder="请选择教师">-->
                                    <!--<el-option v-for="item in teacherOptions" :key="item.workNumber" :label="item.name"-->
                                            <!--:value="item.workNumber">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->

                        <!--<el-col :span="3">-->
                            <!--<el-form-item>-->
                                <!--<el-button type="info" @click="onSubmit()">提交</el-button>-->
                            <!--</el-form-item>-->
                        <!--</el-col>-->
                    <!--</el-row>-->
                <!--</el-form>-->
                <!---->
            <!--</div>-->
</template>

<script>
    import * as api from '../../api'
    import courseList from '../../assets/json/course.json'
    import vTable from './table.vue'
    export default{
        data(){
            return {
                gradeOptions: [],
                grade: '',
                course: "",
                teacherOptions: [
                    {
                        name: "请先填写前面信息",
                        workNumber: ""
                    }
                ],
                sno: "",
                teacher: "",
                startTime: "",
                courseNumberOptions: [1, 2, 3, 4, 5],
                courseNumber: "",
                courseHour: 45,
                dialogVisible:false,
                formLabelWidth:'80px'
            }
        },
        components: {
            vTable
        },
        computed: {
            courseOptions(){
                if (this.grade)
                    return courseList[this.grade];
                else
                    return "";
            },
            endTime(){
                let date = this.startTime.getTime();
                let add = this.courseNumber * this.courseHour * 60 * 1000;
                return new Date(date + add);
            },
            items(){
                let lists = this.$store.state.user.adminItems;
                return lists;
            }
        },
        watch: {
            courseNumber(){
                if (this.courseNumber !== "" && this.course !== "" && this.grade !== "" && this.startTime !== "") {
                    const _this = this;
                    api._get({
                        url: "course/teacherOptions",
                        data: {
                            grade: _this.grade,
                            course: _this.course,
                            startTime: _this.startTime,
                            endTime: _this.endTime
                        }
                    }).then((results) => {
                        console.log(results)
                        let result = results.data;
                        _this.teacherOptions = [];
                        let list = {};
                        result.data.forEach((el) => {
                            list = {};
                            list.name = el.name;
                            list.workNumber = el.workNumber;
                            _this.teacherOptions.push(list);
                            console.log(_this.teacherOptions)
                        })
                    }, (error) => {
                        console.log(error)
                    })
                }
            }
        },
        methods: {
            onSubmit(){ //提交
                let _this = this;
                api._get({
                    url: 'course/courseArranged',
                    data: {
                        sno: _this.sno,
                        grade: _this.grade,
                        course: _this.course,
                        startTime: _this.startTime,
                        endTime: _this.endTime,
                        courseNumber: _this.courseNumber,
                        courseHour: _this.courseHour,
                        workNumber: _this.teacher
                    }
                }).then((result)=>{
                    console.log(result)
                    if(result.status === 200){  //添加成功
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                    }else{      //添加失败
                        this.$message({
                            message: '添加失败',
                            type: 'error'
                        });
                    }
                },(err)=>{
                    console.log(err);
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getGrade(){     //根据学号找年级
                let _this = this;
                api._get({
                    url: "course/findGrade",
                    data: {
                        sno: _this.sno
                    }
                }).then((results) => {
                    console.log(results)
                    let result = results.data;
                    _this.gradeOptions = [];
                    _this.gradeOptions.push(result.grade);
                }, (error) => {
                    console.log(error)
                })
            }
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
</style> 