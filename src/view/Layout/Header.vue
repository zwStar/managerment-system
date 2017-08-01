<template>
    <div class="header">
        <el-dropdown>
            <span class="el-dropdown-link">{{user}}<i class="el-icon-caret-bottom el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                    <router-link to="userInfo">修改信息</router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                        <span @click="logout()">退出系统</span>
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
        .el-dropdown-link{
            display: inline-block;
            cursor: pointer;
            font-size:20px;
            margin-top:10px;
            margin-right:20px;
        }
    }
</style>
