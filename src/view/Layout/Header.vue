<template>
 <div class="header">
     <el-dropdown>
         <span class="el-dropdown-link">下拉菜单<i class="el-icon-caret-bottom el-icon--right"></i></span>
         <el-dropdown-menu slot="dropdown">
             <el-dropdown-item>退出</el-dropdown-item>
         </el-dropdown-menu>
     </el-dropdown>
 </div>
</template>

<script>

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.header{
    float:right;
    width:calc(100% - 300px);
    height:50px;
    background: #20a0ff;
    .el-dropdown{
        float:right;
    }
}
</style>
