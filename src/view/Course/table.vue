<template>
    <div class="course-content">
        <el-table :data="data" border width="100%">
            <el-table-column label="学号" width="150">
                <template scope="scope">
                    <span>{{scope.row.sno}}</span>
                </template>
            </el-table-column>

            <el-table-column label="姓名" width="120">
                <template scope="scope">
                    <span>{{scope.row.StudentName}}</span>
                </template>
            </el-table-column>

            <el-table-column label="课程名字" width="150">
                <template scope="scope">
                    <span>{{scope.row.grade}}-{{scope.row.course}}</span>
                </template>
            </el-table-column>

            <el-table-column label="课节数" width="120">
                <template scope="scope">
                    <span>{{scope.row.courseNumber}}</span>
                </template>
            </el-table-column>

            <el-table-column label="开始时间" width="220">
                <template scope="scope">
                    <span>{{scope.row.startTime}}</span>
                </template>
            </el-table-column>

            <el-table-column label="结束时间" width="220">
                <template scope="scope">
                    <span>{{scope.row.endTime}}</span>
                </template>
            </el-table-column>

            <el-table-column label="授课老师" width="150">
                <template scope="scope">
                    <span>{{scope.row.TeacherName}}</span>
                </template>
            </el-table-column>

            <el-table-column label="上课状态" min-width="120">
                <template scope="scope">
                    <span>{{scope.row.status}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import * as api from '../../api'
    export default{
        props: ["data"],
        beforeMount(){
            let _this = this;
            api._get({
                url:"course/arrangedLists",
                data:{}
            }).then((results)=>{
                console.log(results.data);
                _this.$store.commit("SET_ITEM",{key: 'adminItems', val: results.data });
            })
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .course-content{
        padding:0 100px;
        margin:50px auto;
    }
</style> 