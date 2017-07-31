<template>
    <div class="teacherList">
        <div class="header">
            <el-input  icon="search" placeholder="请输入教师工号"  class="seach"></el-input>
            <el-button icon="plus" @click="addTeacherForm = true" class="add">新增教师</el-button>
            <el-dialog title="新增教师" :visible.sync="addTeacherForm">
                <el-form :model="form">
                    <el-form-item label="教师姓名" :label-width="formLabelWidth">
                        <el-row>
                            <el-col :span="14" :offset="1"><el-input v-model="form.name" auto-complete="off"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="教师年龄" :label-width="formLabelWidth">
                        <el-row>
                            <el-col :span="14" :offset="1"><el-input v-model="form.age" auto-complete="off"></el-input></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="入职日期" :label-width="formLabelWidth">
                        <el-row>
                            <el-col :span="14" :offset="1"><el-date-picker
                                    v-model="form.date"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="添加课程" :label-width="formLabelWidth">
                        <el-row>
                            <el-col :span = '6' :offset="1"><el-select v-model="currentGrade" placeholder="请选择年级">
                                <el-option
                                        v-for="item in grades"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select></el-col>
                            <el-col :span = '6' :offset="2"><el-select v-model="currentCourses" placeholder="请选择课程">
                                <el-option
                                        v-for="item in courses"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select></el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="已选课程"  :label-width="formLabelWidth">
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
                                <el-button type="info">确认</el-button>
                            </el-col>
                            <el-col :span="3">
                                <el-button type="danger">取消</el-button>
                            </el-col>
                        </el-row>

                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{
            addTeacherForm:false,
            formLabelWidth:'140px',
            form:{
                name:'',
                age:'',
                date:""
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
            coursesTag:[]
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
                return
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
        }
    },
    methods:{
        removeCourse:function (index) {
            this.coursesTag.splice(index,1);
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.teacherList{
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
            }
        }
    }
}
</style>
