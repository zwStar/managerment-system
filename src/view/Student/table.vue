<template>
    <div class="table-content">
        <el-table :data="data" border width="100%">
            <el-table-column label="学号" width="120">
                <template scope="scope" >
                    <span>{{scope.row.sno}}</span>
                </template>
            </el-table-column >

            <el-table-column label="姓名" width="120">
                <template scope="scope" >
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>

            <el-table-column label="家长姓名" width="120">
                <template scope="scope" >
                    <span>{{scope.row.parentName}}</span>
                </template>
            </el-table-column>

            <el-table-column label="电话号码" width="150">
                <template scope="scope" >
                    <span>{{scope.row.tel}}</span>
                </template>
            </el-table-column>

            <el-table-column label="所读学校" width="120">
                <template scope="scope" >
                    <span>{{scope.row.school}}</span>
                </template>
            </el-table-column>

            <el-table-column label="年级" width="120">
                <template scope="scope" >
                    <span>{{scope.row.grade}}</span>
                </template>
            </el-table-column>

            <el-table-column label="一对一剩余课时" width="180px">
                <template scope="scope" >
                    <span>{{scope.row.remainCourse}}</span>
                </template>
            </el-table-column>

            <el-table-column width="180" label="学管理师" >
                <template scope="scope" >
                    <span style="margin-left: 10px">{{ scope.row.managerTeacher }}</span>
                </template>
            </el-table-column>

            <el-table-column min-width="220" label="日期" >
                <template scope="scope" >
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import * as api from '../../api'
export default{
    data(){
        return {
        }
    },
    props:["data"],
    beforeMount(){

    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.table-content{
   padding:50px;
}
</style>
