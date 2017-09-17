<template>
    <div id="teacherList">
        <div class="header">
            <el-input  icon="search" placeholder="请输入教师工号"  class="seach"></el-input>
            <el-button icon="plus" @click="showInputForm = true" class="add">新增教师</el-button>
            <el-dialog title="新增教师" :visible.sync="showInputForm">
                <el-form :model="form" ref="form" :rules="this.$store.state.rule.rules">
                    <el-form-item label="教师姓名" prop="name" :label-width="formLabelWidth" >
                        <el-row>
                            <el-col :span="14" :offset="1"><el-input v-model="form.name" auto-complete="off" ></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="教师年龄" prop="age" :label-width="formLabelWidth">
                        <el-row>
                            <el-col :span="14" :offset="1"><el-input v-model="form.age" auto-complete="off"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="教师性别" prop="sex" :label-width="formLabelWidth">
                        <el-row>
                            <el-col :span = '14' :offset="1">
                                <el-select v-model="form.sex" placeholder="请选择性别">
                                    <el-option
                                            v-for="item in sex"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="tel" :label-width="formLabelWidth">
                        <el-row>
                            <el-col :span="14" :offset="1"><el-input v-model="form.tel" auto-complete="off"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="入职日期" prop="date" :label-width="formLabelWidth">
                        <el-row>
                            <el-col :span="14" :offset="1">
                                <el-date-picker
                                    v-model="form.date"
                                    type="date"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="添加课程" :label-width="formLabelWidth">
                        <el-row>
                            <el-col :span = '6' :offset="1">
                                <el-select v-model="currentGrade" placeholder="请选择年级">
                                    <el-option
                                            v-for="item in grades"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :span = '6' :offset="2">
                                <el-select v-model="currentCourses" placeholder="请选择课程">
                                    <el-option
                                            v-for="item in courses"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="已选课程" prop="coursesTag" :label-width="formLabelWidth">
                        <el-row>
                            <el-col :span="16" :offset="1">
                                <el-tag
                                        v-for="(tag,index) in coursesTag"
                                        :key="tag.name"
                                        :closable="true"
                                        :type="tag.type"
                                        @close="removeCourse(index)"
                                >
                                    {{tag.name}}
                                </el-tag>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item>
                        <el-row :gutter = "12">
                            <el-col :span="3" :offset="8">
                                <el-button type="info" @click="confirm()">确认</el-button>
                            </el-col>
                            <el-col :span="3">
                                <el-button type="danger" @click="showInputForm=false;">取消</el-button>
                            </el-col>
                        </el-row>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
        <div class="teacherList">
            <el-table
                    strip="true"
                    :data="teacherList"
                    :default-sort = "{prop: 'workNumber', order: '1'}"
                    highlight-current-row
                    height = 242
                    @current-change="">
                <el-table-column property="workNumber" label="工号" width="120px"></el-table-column>
                <el-table-column property="name" label="姓名" width="120px"></el-table-column>
                <el-table-column property="sex" label="性别" width="120px"></el-table-column>
                <el-table-column property="age" label="年龄" width="120px"></el-table-column>
                <el-table-column property="date" label="入职日期" width="120px"></el-table-column>
                <el-table-column property="unpaidTime" label="未结课时" width="120px"></el-table-column>
                <el-table-column property="paidTime" label="已结课时" width="120px"></el-table-column>
                <el-table-column label="操作" width="150px">
                    <template scope="scope">
                        <el-button type="text" @click="showDetail(scope.row)">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                v-if ="teacherCount != 0"
                small
                layout="prev, pager, next"
                page-size=5
                current-page.sync='page'
                @current-change="changePage"
                :total="teacherCount">
          </el-pagination>
        </div>
    </div>

</template>
<script>
    import { _post,_get } from "../../api/index.js"

export default{
    data(){
        return{
            showInputForm:false,
            formLabelWidth:'140px',
            form:{
                name:'',
                age:'',
                date:"",
                sex:'',
                tel:""
            },
            currentGrade:"",
            currentCourses:"",
            grades:[
                    {
                        value:'小学',
                        label:'小学'
                    }, {
                        value:'初中',
                        label:'初中'
                    },{
                        value:'高中',
                        label:'高中'
                    },{
                        value:'初一',
                        label:'初一'
                    },{
                        value:'初二',
                        label:'初二'
                    },{
                        value:'初三',
                        label:'初三'
                    },{
                        value:'高一',
                        label:'高一'
                    },{
                        value:'高二',
                        label:'高二'
                    },{
                        value:'高三',
                        label:'高三'
                    }],
            coursesTag:[],
            sex:[{ value:'男' , label:'男' },{ value:'女',label:'女'}],
            teacherList:[],
            page:1,
            teacherCount:"",
        }
    },
    computed:{
        courses:function () {
            var currentCourses = [];
            if(this.currentGrade == '小学'){
                currentCourses = [{value:'语文',label:'语文'},{value:'数学',label:'数学'},{value:'英语',label:'英语'}];
            }else if(this.currentGrade == '初一'){
                currentCourses = [{value:'语文',label:'语文'},{value:'数学',label:'数学'},{value:'英语',label:'英语'},{value:'政治',label:'政治'},{value:'历史',label:'历史'},{value:'地理',label:'地理'},{value:'生物',label:'生物'}];
            }else if(this.currentGrade == '初二'){
                currentCourses = [{value:'语文',label:'语文'},{value:'数学',label:'数学'},{value:'英语',label:'英语'},{value:'政治',label:'政治'},{value:'历史',label:'历史'},{value:'地理',label:'地理'},{value:'生物',label:'生物'},{value:'物理',label:'物理'}];
            }else if(this.currentGrade != ""){
                currentCourses = [{value:'语文',label:'语文'},{value:'数学',label:'数学'},{value:'英语',label:'英语'},{value:'政治',label:'政治'},{value:'历史',label:'历史'},{value:'地理',label:'地理'},{value:'生物',label:'生物'},{value:'物理',label:'物理'},{value:'化学',label:'化学'}];
            }else{
                currentCourses = []
            }
            return currentCourses;
        }
    },
    watch:{
        currentCourses:function (newVal,oldVal) {
            if(!newVal)
                return;
            var temp = {
                name:this.currentGrade + newVal,
                type:'gray'
            };
            for( var i = 0 ; i < this.coursesTag.length ; i++){
                if(this.coursesTag[i].name == temp.name){
                    this.currentGrade = '';
                    this.currentCourses = '';
                    return
                }
            }
            this.coursesTag.push(temp);
            this.currentGrade = '';
            this.currentCourses = '';
        },
        showInputForm:function (newVal,oldVal) {
            if(!newVal){
                this.clearForm();
            }
        }
    },
    mounted(){
        this.getTeacherCount();
        this.updateTable();
        
    },
    methods:{
        removeCourse:function (index) {
            this.coursesTag.splice(index,1);
        },
        showDetail(content){
        },
        confirm(){
            var _this = this;
            this.$refs.form.validate(function (result) {
                //拼接工号
                let date = new Date(this.form.date);
                let month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : ("0" + (date.getMonth() + 1));
                let day = date.getDate() >= 10 ? date.getDate() : ("0" + date.getDate());
                let workNumber = date.getFullYear().toString() + month.toString() + day.toString();

                if(result){
                    _post({
                        url:'user/addTeacher',
                        data:{
                            workNumber:workNumber,
                            name:this.form.name,
                            age:this.form.age,
                            sex:this.form.sex,
                            inductionDate:this.form.date,
                            tel:this.form.tel,
                            coursesTag:this.coursesTag
                        }
                    })
                        .then(function (response) {
                            if(response.data == "successful"){
                                _this.$message({
                                    message: '教师添加成功',
                                    type: 'success'
                                });
                                _this.updateTable();
                            }else{
                                _this.$message.error('教师添加失败');
                            }
                            _this.showInputForm = false;
                        })
                        .catch(function (error) {
                            console.log(error);
                            _this.$message.error('教师添加失败');
                        })
                }
            }.bind(this))

        },
        updateTable(){
            var _this = this;
            _get({
                url:'user/getTeacherList',
                data:{
                    page:this.page
                }
            }).then(function(teacher){
                _this.teacherList = teacher.data;
                for( var i = 0 ; i < _this.teacherList.length ; i++ ){
                    let date = new Date(_this.teacherList[i].inductionDate);
                    _this.teacherList[i].course = _this.teacherList[i].course.join(",");
                    _this.teacherList[i].date = date.getFullYear() + '-' + (date.getMonth() + 1) + "-" + date.getDate();
                }
            }).catch(function(err){
                console.log(err);
                _this.$message.error('获取教师信息失败');
            })
        },
        clearForm(){
            this.form.name = "";
            this.form.age = "";
            this.form.sex = "";
            this.form.date = "";
            this.form.tel = "";
            this.coursesTag = "";
            this.currentGrade = "",
            this.currentCourses = "",
            this.coursesTag.splice(0,this.coursesTag.length);
        },
        getTeacherCount(){
            var _this = this;
            _get({
                url:"user/getTeacherCount"
            })
            .then(function(response){
                _this.teacherCount = response.data.count;
            })
            .catch(function(error){
                console.log(error);
            })
        },
        changePage(page){
            this.page = page;
            this.updateTable();
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
#teacherList{
    .header{
        text-align: center;
        margin-top: 20px;
        .seach{
            display: inline-block;
            width: 250px;
        }
        .add{
            margin-left:20px;
        }
        .el-dialog{
            width: 700px;
            .el-form-item{
                .el-input{
                    width: 100%;
                }
                .el-select{
                    width: 100%;
                }
            }
        }
    }
    .teacherList{
        width: 992px;
        margin: 50px auto;
    }
}
</style>
