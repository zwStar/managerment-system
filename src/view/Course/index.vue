<template>
    <div class="addCourse">
        <el-form>
            <el-row :gutter="20">
                <el-col :span="3">
                    <el-form-item  >
                        <el-input v-model="sno" placeholder="请输入学号" @blur="getGrade()"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="3">
                    <el-form-item>
                        <el-select v-model="grade" placeholder="请选择年级">
                            <el-option v-for="item in gradeOptions" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="3">
                    <el-form-item>
                        <el-select v-model="course" placeholder="请选择课程">
                            <el-option v-for="item in courseOptions" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="5">
                    <el-form-item>
                        <el-date-picker v-model='startTime' type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>

                <el-col :span="3">
                    <el-form-item>
                        <el-select v-model="courseNumber" placeholder="请选择课时数">
                            <el-option v-for="item in courseNumberOptions" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="3">
                    <el-form-item>
                        <el-select v-model="teacher" placeholder="请选择教师">
                            <el-option v-for="item in teacherOptions" :key="item.workNumber" :label="item.name" :value="item.workNumber">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="3">
                    <el-form-item>
                        <el-button type="info" @click="onSubmit()">提交</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    import * as api from '../../api'
    import courseList from '../../assets/json/course.json'
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
                sno:"",
                teacher: "",
                startTime: "",
                courseNumberOptions: [1, 2, 3, 4, 5],
                courseNumber: "",
                courseHour: 45
            }
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
                        result.data.forEach((el)=>{
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
        methods:{
            onSubmit(){
                let _this = this;
                api._get({
                    url:'course/courseArranged',
                    data:{
                        sno:_this.sno,
                        grade:_this.grade,
                        course:_this.course,
                        startTime:_this.startTime,
                        endTime:_this.endTime,
                        courseNumber:_this.courseNumber,
                        courseHour:_this.courseHour,
                        workNumber:_this.teacher
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getGrade(){
                let _this = this;
                api._get({
                    url: "course/findGrade",
                    data: {
                        sno:_this.sno
                    }
                }).then((results) => {
                    console.log(results)
                    let result = results.data;
                    _this.gradeOptions = result.grade;

                }, (error) => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style> 