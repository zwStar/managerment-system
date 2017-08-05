<template>
    <div class="teacher-info">
        <header>
          <el-row>
              <el-col :span="18">
                  <el-input   icon="search"  placeholder="请输入学生名字"></el-input>
              </el-col>
              <el-col :offset="1" :span="4">
                  <span class="addStudnet" @click="dialogVisible=true">新增学生</span>
              </el-col>
          </el-row>
        </header>
        <v-table></v-table>
        <el-dialog title="新增学生" :visible.sync="dialogVisible">
            <el-form :model="studentForm" :label-width="formLabelWidth" :rules="formRules">
                <el-form-item label="学号" prop="sno">
                    <el-row>
                        <el-col :span="16">
                            <el-input v-model="studentForm.sno"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="姓名">
                 <el-row>
                     <el-col :span="16">
                         <el-input v-model="studentForm.name"></el-input>
                     </el-col>
                 </el-row>
                </el-form-item>
                <el-form-item label="家长姓名">
                 <el-row>
                     <el-col :span="16">
                         <el-input v-model="studentForm.parentName"></el-input>
                     </el-col>
                 </el-row>
                </el-form-item>
                <el-form-item label="电话号码">
                   <el-row>
                       <el-col :span="16">
                           <el-input v-model="studentForm.tel"></el-input>
                       </el-col>
                   </el-row>
                </el-form-item>
                <el-form-item label="所读学校">
                 <el-row>
                     <el-col :span="16">
                         <el-input v-model="studentForm.school"></el-input>
                     </el-col>
                 </el-row>
                </el-form-item>
                <el-form-item label="学管师">
                  <el-row>
                      <el-col :span="16">
                          <el-input v-model="studentForm.managerTeacher"></el-input>
                      </el-col>
                  </el-row>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit(); dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import * as api from '../../api/index.js'
    import vTable from './table.vue'
    export default{
        components:{
          vTable
        },
        data(){
            let validateSno = (rules,value,callback)=>{
               value = value.trim();
                !isNaN(value) && value.length>=6 && value.length<=12?callback():callback(new Error("请输入6-12位数字"));
            }
            return {
                dialogVisible: false,
                studentForm:{
                    sno:"",
                    name:"",
                    parentName:"",
                    tel:"",
                    school:"",
                    managerTeacher:""
                },
                formLabelWidth:'80px',
                formRules:{
                    sno:[
                        {required:true,trigger:'blur',validator:validateSno}
                    ]
                }
            }
        },
        methods:{
            onSubmit(){
                const _this = this;
                api._get({
                    url:'/user/addStudent',
                    data:_this.studentForm
                }).then((results)=>{
                    console.log(results);
                    _this.successMessage();
                    _this.$router.push({path:'/'});
                },(err)=>{
                    console.log(err);
                })
            },
            successMessage() {
                this.$message({
                    message: '学生添加成功',
                    type: 'success'
                });
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
header {
    width: 600px;
    margin:0 auto;
    span{
        color:#20a0ff;
        cursor: pointer;
    }
}

</style>
