<template>
    <div id="audit">
        <el-table
        :data="auditList"
        height="250"
        border
        stripe
        style="width: 997px;margin:auto">
            <el-table-column
                prop="date"
                label="工号"
                width="166">
            </el-table-column>
            <el-table-column
                prop="name"
                label="姓名"
                width="166">
            </el-table-column>
            <el-table-column
                prop="address"
                label="时间"
                width="166">
            </el-table-column>
            <el-table-column
                prop="address"
                label="计划课时"
                width="166">
            </el-table-column>
            <el-table-column
                prop="address"
                label="实际课时"
                width="166">
            </el-table-column>
            <el-table-column
                prop="address"
                label="操作"
                width="166">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import { _get } from "../../api/index.js"
    export default{
        data(){
            return {
                auditList:[],
            }
        },
        mounted(){
            var _this = this;
            _get({
                url:"getAuditTable",
            })
            .then(function(response){
                _this.auditList = response.data;
            })
            .catch(function(error){
                console.log(error);
            })
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
</style>