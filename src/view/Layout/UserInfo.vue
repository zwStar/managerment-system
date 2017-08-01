<template>
    <div class="userInfo">
        <el-form :model="form" label-width="80px" :rules="rules">
            <el-form-item label="用户名" prop="name">
                <el-input v-model="form.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="原密码" prop="old">
                <el-input v-model="form.oldPass" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="new">
                <el-input v-model="form.newPass" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password">
                <el-input v-model="form.confirm" type="password" @keyup.enter.native="changeInfo();"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="changeInfo();">确认</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import * as api from '../../api'
    export default{
        data(){
            let validateConfirm = (value,rules,callback)=>{
                console.log(value);
            }
            return {
                form: {
                    name: localStorage.getItem("name"),
                    oldPass: "",
                    newPass: "",
                    confirm: ""
                },
                rules: {
                    password: [
                        {
                            required: true, message: '请输入新密码', trigger: blur
                        }
                    ],
                    confirm: [
                        {required: true, trigger: 'blur', validator: validateConfirm}
                    ]
                }
            }
        },
        methods: {
            changeInfo(){
                const _this = this;
                api._post({
                    url: 'user/changeInfo',
                    data: _this.form
                }).then((results) => {
                    this.$message({
                        message: '修改成功，请重新登录！',
                        type: 'success'
                    });
                    _this.$store.dispatch("ChangeInfo");
                    localStorage.clear("name");
                    _this.$router.push({path: "/login"});
                })
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .el-form {
        width: 500px;
        margin: 50px auto 0;
    }
</style>
