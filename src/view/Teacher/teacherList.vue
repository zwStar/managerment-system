<template>
    <div class="teacherList">
        <el-input icon="search" placeholder="请输入教师工号"></el-input>
        <el-button icon="plus" @click="addTeacherForm = true">新增教师</el-button>
        <el-dialog title="新增教师" :visible.sync="addTeacherForm">
            <el-form :model="form">

            </el-form>
        </el-dialog>
    </div>
</template>
<script>
export default{
    data(){
        return{
            addTeacherForm:false,
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">

</style>
