<template>
    <div class="login">
        <el-form>
            <h3>登录系统</h3>
            <el-form-item label="用户名">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                form:{
                    name:"",
                    password:""
                }
            }
        },
        methods:{
            onSubmit(){

            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
