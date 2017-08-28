<template>
    <div class="login">
        <el-form ref="loginForm" :rules="loginRules" :model="loginForm">
            <h3>登录系统</h3>
            <el-form-item label="用户名" required>
                <el-input v-model="loginForm.name"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item prop="code">
                <el-row>
                    <el-col :span="15">
                        <el-input type="password" placeholder="请输入验证码" v-model="loginForm.code" @keyup.enter.native="onSubmit()"></el-input>
                    </el-col>
                    <el-col :span="6" offset="3">
                       <div class="Code" @click="reloadCode">
                           <img :src="imgCode">
                       </div>
                    </el-col>
                </el-row>

            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import * as api from '../../api'

    export default {
        name: 'login',
        data() {
            let validatePass = (rule, value, callback) => {
                if (value.length < 6) {
                    callback(new Error('密码不能小于6位'));
                } else {
                    callback();
                }
            };

            let validateCode = (rule, value, callback) => {
                if (!(value.length === 4)) {
                    callback(new Error('验证码不正确'));
                } else {
                    callback();
                }
            };
            return {
                loginForm: {
                    name: "",
                    password: "",
                    code: ""
                },
                imgCode:"",
                cap:"",
                loginRules: {
                    password: [
                        {required: true, trigger: 'blur', validator: validatePass}
                    ],
                    code:[
                        {required:true,trigger:'blur',validator:validateCode}
                    ]
                },
            }
        },
        methods: {
            onSubmit() {
                const _this = this;
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                       if(_this.cap === _this.imgCode){
                           api._post({
                               url: "user/login",           //请求登录接口
                               data: _this.loginForm
                           }).then((results) => {
                               localStorage.setItem('name', _this.loginForm.name);   //把邮箱号保存到localStorage
                               _this.$store.dispatch("LoginSuccess", results.data);
                               _this.$router.push({path: "/"});    //路由跳转到首页
                           }).catch((err) => {
                               console.log(err);
                               _this.$message.error("账号有误");
                           })
                       }else{
                           _this.$message.error("验证码有误");
                           _this.imgCode = "";
                           _this.getImgCode();
                       }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            },
            getImgCode(){
                let _this = this;
                api._post({
                    url:"user/captchas",
                    data:{}
                }).then(result=>{
                    console.log(result);
                    _this.imgCode = result.data.code;
                    _this.cap = result.data.cap;
                })
            },
            reloadCode(){
                let _this =this;
                _this.getImgCode();
            }
        },
        mounted(){
            this.getImgCode();
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .login {
        width: 100vw;
        height: 100vh;
        /*background-image: url('../../assets/loginbg.jpg');*/
        background-size: 100% 100%;
        .el-form {
            width: 500px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            h3 {
                text-align: center;
            }
            .el-form-item {

            }
        }
        .Code{
            margin-top:6px;
            cursor: pointer;
        }
    }
</style>
