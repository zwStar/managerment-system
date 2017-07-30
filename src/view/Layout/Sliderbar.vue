<template>
    <div class="sliderbar">
        <el-row class="tac">
            <el-col :span="24">
                <el-menu @open="handleOpen" @close="handleClose" theme="dark">
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>合同管理</template>
                        <el-menu-item index="1-1">合同列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-message"></i>学生管理</template>
                        <el-menu-item index="2-1">学生列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-message"></i>课程管理</template>
                        <el-menu-item index="3-1">1对1课程</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-message"></i>教师管理</template>
                        <el-menu-item index="2-1">教师列表</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>

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
