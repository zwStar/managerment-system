<template>
    <div class="teacher-info">
        <header>
            <el-input   icon="search"  placeholder="请输入学生名字"></el-input>
            <span class="addStudnet" @click="dialogVisible=true">新增学生</span>
        </header>
        <v-table></v-table>
        <el-dialog title="新增学生" :visible.sync="dialogVisible" size="tiny">
            <el-form :model="studentForm" label-width="80px">
                <el-form-item label="学号">
                    <el-input v-model="studentForm.sno"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="studentForm.name"></el-input>
                </el-form-item>
                <el-form-item label="家长姓名">
                    <el-input v-model="studentForm.parentName"></el-input>
                </el-form-item>
                <el-form-item label="电话号码">
                    <el-input v-model="studentForm.tel"></el-input>
                </el-form-item>
                <el-form-item label="所读学校">
                    <el-input v-model="studentForm.school"></el-input>
                </el-form-item>
                <el-form-item label="学管师">
                    <el-input v-model="studentForm.managerTeacher"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import vTable from './table.vue'
    export default{
        components:{
          vTable
        },
        data(){
            return {
                dialogVisible: false,
                studentForm:{
                    sno:"",
                    name:"",
                    parentName:"",
                    tel:"",
                    school:"",
                    managerTeacher:""
                }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
header {
    width: 600px;
    margin:0 auto;
    .el-input{
        width: 500px;
    }
    span{
        color:#20a0ff;
        cursor: pointer;
    }
}

</style>
