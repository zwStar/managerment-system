<template>
    <div class="header">
        <el-dropdown>
            <span class="el-dropdown-link">{{user}}<i class="el-icon-caret-bottom el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                        <span @click="logout()">退出</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
    export default{
        data(){
            let user = localStorage.getItem("name");
            return {
                user
            }
        },
        methods:{
            logout(){
                console.log("logout")
                this.$store.dispatch("Logout");
                this.$router.push({path:"/login"});
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .header {
        float: right;
        width: calc(100% - 300px);
        height: 50px;
        background: #20a0ff;
        .el-dropdown {
            float: right;
        }
    }
</style>
