<template>
    <div class="table-content">
        <el-table :data="StudentTableData" border width="800">
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

            <el-table-column label="一对一剩余课时" width="180">
                <template scope="scope" >
                    <span>{{scope.row.courseTime}}</span>
                </template>
            </el-table-column>

            <el-table-column width="180" label="日期" >
                <template scope="scope" >
                    <el-icon name="time"></el-icon>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default{
    data(){
        return {
            StudentTableData:[
                {
                    sno:"2017082001",
                    name:"苏枫泳",
                    parentName:"郭泽伟",
                    tel:"17727705182",
                    school:"华侨中学",
                    grade:"初三",
                    courseTime:"50",
                    date:"2017-08-20"
                },
                {
                    sno:"2017082001",
                    name:"苏枫泳",
                    parentName:"郭泽伟",
                    tel:"17727705182",
                    school:"华侨中学",
                    grade:"初三",
                    courseTime:"50",
                    date:"2017-08-20"
                },
                {
                    sno:"2017082001",
                    name:"温文杰",
                    parentName:"郭泽伟",
                    tel:"17727705182",
                    school:"华侨中学",
                    grade:"初三",
                    courseTime:"50",
                    date:"2017-08-20"
                },
                {
                    sno:"2017082001",
                    name:"温文杰",
                    parentName:"郭泽伟",
                    tel:"17727705182",
                    school:"华侨中学",
                    grade:"初三",
                    courseTime:"50",
                    date:"2017-08-20"
                }
            ]
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.table-content{
    width: 1120px;
    margin:0 auto;
    margin-top:50px;
}
</style>
