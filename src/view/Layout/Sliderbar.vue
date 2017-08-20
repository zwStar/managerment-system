<template>
    <div class="sliderbar">
        <el-row class="tac">
            <el-col :span="24">
                <el-menu @open="handleOpen" @close="handleClose" theme="dark" router>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>合同管理</template>
                        <el-menu-item index="/lists">合同列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-message"></i>学生管理</template>
                        <el-menu-item index="/student">学生列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-message"></i>课程管理</template>
                        <el-menu-item index="/course">1对1课程</el-menu-item>
                        <el-menu-item index="/audit">上课审核</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-message"></i>教师管理</template>
                        <el-menu-item index="/teacher">教师列表</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default{
    methods:{
        handleOpen(){
            console.log("open");
        },
        handleClose(){
            console.log("close");
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .sliderbar {
        width: 300px;

        float: left;
        .el-menu {
            min-height: 100vh;
        }
    }
</style>
