<template>
    <div class="login">
        <el-form ref="loginForm" :rules="loginRules" :model="loginForm">
            <h3>登录系统</h3>
            <el-form-item label="用户名">
                <el-input v-model="loginForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input  type="password" v-model="loginForm.password" @keyup.enter.native="onSubmit()"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import * as api from '../../api'
    export default{
        name: 'login',
        data(){
            let validatePass = (rule, value, callback) => {
                console.log(value);
                if (value.length < 6) {
                    callback(new Error('密码不能小于6位'));
                } else {
                    callback();
                }
            };
            return {
                loginForm:{
                    name:"",
                    password:""
                },
                loginRules: {
                    password: [
                        { required: true, trigger: 'blur', validator: validatePass }
                    ]
                },
            }
        },
        methods:{
            onSubmit(){
                const _this = this;
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        api._post({
                            url:"user/login",           //请求登录接口
                            data:_this.loginForm
                        }).then((results)=>{
                            _this.$store.dispatch("LoginSuccess",results.data);
                            localStorage.setItem('name', _this.loginForm.name);   //把邮箱号保存到localStorage
                            _this.$router.push({path:"/"});    //路由跳转到首页
                        }).catch((err)=>{
                            console.log(err);
                            _this.$message.error("账号有误");
                        })
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.login{
    width: 100vw;
    height: 100vh;
    /*background-image: url('../../assets/loginbg.jpg');*/
    background-size: 100% 100%;
    .el-form{
        width: 500px;
        position:absolute;
        top:50%;
        left:50%;
        transform: translate(-50%,-50%);
        h3{
           text-align:center;
        }
        .el-form-item{

        }
    }
}
</style>
