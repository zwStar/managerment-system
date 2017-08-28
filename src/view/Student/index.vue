<template>
    <div class="teacher-info">
        <header>
            <el-row>
                <el-col :span="18">
                    <vsearch model='Student' searchKey='name'></vsearch>
                </el-col>
                <el-col :offset="1" :span="4">
                    <span class="addStudnet" @click="dialogVisible=true">新增学生</span>
                </el-col>
            </el-row>
        </header>
        <v-table :data="items"></v-table>
        <el-dialog title="新增学生" :visible.sync="dialogVisible" size="tiny">
            <el-form :model="studentForm" :label-width="formLabelWidth" :rules="formRules">
                <el-form-item label="学号" prop="sno">
                    <el-row>
                        <el-col :span="16">
                            <el-input v-model="studentForm.sno"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="姓名" required>
                    <el-row>
                        <el-col :span="16">
                            <el-input v-model="studentForm.name"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="年级" required>
                    <el-row>
                        <el-col :span="16">
                            <el-select v-model="studentForm.grade" placeholder="请选择年级" required>
                                <el-option v-for="item in gradeOptions" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="家长姓名" required>
                    <el-row>
                        <el-col :span="16">
                            <el-input v-model="studentForm.parentName"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="电话号码" prop="tel">
                    <el-row>
                        <el-col :span="16">
                            <el-input v-model="studentForm.tel"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="购买课时数" prop="orderCourseNumber">
                    <el-row>
                        <el-col :span="16">
                            <el-input v-model="studentForm.orderCourseNumber"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="所读学校" required>
                    <el-row>
                        <el-col :span="16">
                            <el-input v-model="studentForm.school"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="学管师" required>
                    <el-row>
                        <el-col :span="16">
                            <el-input v-model="studentForm.managerTeacher" @keyup.enter.native="onSubmit()"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit(); dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
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
    import * as api from '../../api/index.js'
    import vTable from './table.vue'

    export default {
        components: {
            vTable
        },
        data() {
            let validateSno = (rules, value, callback) => {//验证学号
                value = value.trim();
                !isNaN(value) && value.length >= 6 && value.length <= 12 ? callback() : callback(new Error("请输入6-12位数字"));
            };
            return {
                dialogVisible: false,   //对话框显示
                studentForm: {
                    sno: "",    //学号
                    name: "",   //姓名
                    parentName: "", //父母姓名
                    tel: "",    //电话号码
                    school: "", //学校
                    managerTeacher: "", //学管师
                    grade: "",      //年级
                    orderCourseNumber: ""   //购买课程
                },
                gradeOptions: ["小学", "初一", "初二", "初三", "高一", "高二", "高三"],//年级可选
                Count: 0,   //总数量
                pageSize:10,    //每页多少条
                formLabelWidth: '100px',    //label宽度
                formRules: {//表单规则
                    sno: [  //学号
                        {required: true, trigger: 'blur', validator: validateSno}
                    ],
                    tel: [  //电话号码
                        {required: true, message: "请输入正确的家长电话", pattern: /^1[3|4|5|8][0-9]\d{4,8}$/, trigger: 'blur'}
                    ],
                    orderCourseNumber: [    //购买的数量 必须是数字
                        {required: true, message: "请输入该学生购买的课程时数量", pattern: /^\d+$/, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            onSubmit() {    //提交 添加学生
                const _this = this;
                api._get({
                    url: '/user/addStudent',
                    data: _this.studentForm
                }).then((results) => {
                    if (results.data.status === 0)
                        _this.errorMessage(results.data.message);
                    else {
                        _this.successMessage(); //显示成功信息
                        _this.fetch();      //抓取数据
                    }
                }, (err) => {
                    console.log(err);
                })
            },
            successMessage() {  //显示成功信息
                this.$message({
                    message: '学生添加成功',
                    type: 'success'
                });
            },
            errorMessage(message) { //显示错误信息
                this.$message({
                    message: message,
                    type: 'error'
                });
            },
            fetch(start=0,limit=this.pageSize) {    //抓取数据 默认从第0页开始
                let _this = this;
                api._get({
                    url: "user/students",
                    data: {
                        start,
                        limit
                    }
                }).then((results) => {
                    _this.$store.commit("SET_ITEM", {key: 'adminItems', val: results.data});
                })
            },
            count() {   //学生总数量
                let _this = this;
                api._get({
                    url: "user/studentsCount",
                    data: {}
                }).then((results) => {
                    _this.Count = results.data.count;
                })
            },
            handleCurrentChange(currentPage) {  //分页器切换
                this.fetch(currentPage-1)
            }
        },
        computed: {
            items() {
                let lists = this.$store.state.user.adminItems;
                return lists;
            }
        },
        mounted() {
            this.count();
            this.fetch();

        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    header {
        width: 600px;
        margin: 0 auto;
        span {
            color: #20a0ff;
            cursor: pointer;
        }
    }

    .addStudnet {
        display: inline-block;
        margin-top: 10px;
    }
    .pagination{
        text-align: center;
    }

</style>
