<template>
    <div id="audit">
        <el-table
            :data="auditList"
            height="250"
            border
            stripe
            style="width: 989px;margin:auto">
                <el-table-column
                    prop="workNumber"
                    label="工号"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="teacherName"
                    label="姓名"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="时间"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="courseNumber"
                    label="计划课时"
                    width="160">
                </el-table-column>
                <el-table-column
                    prop="realCourseTime"
                    label="实际课时"
                    width="160">
                </el-table-column>
                <el-table-column
                    label="操作"
                    width="170">
                    <template scope="scope">
                        <el-button class='viewDetail' :plain="true" type="text" @click="review(scope.$index,scope.row)">查看详情</el-button>
                    </template>
                </el-table-column>
        </el-table>
        <el-dialog title="课程详情" :visible.sync="detailShow" size="small" :close-on-click-modal="false">
            <div class="left">
                <div>
                    <span class="title"><i class="iconfont">&#xe604;</i>工号</span>
                    <span class="content">{{detail.workNumber}}</span>
                </div>
                <div>
                    <span class="title"><i class="iconfont">&#xe603;</i>教师姓名</span>
                    <span class="content">{{detail.teacherName}}</span>
                </div>
                <div>
                    <span class="title"><i class="iconfont">&#xe639;</i>学生学号</span>
                    <span class="content">{{detail.sno}}</span>
                </div>
                <div>
                    <span class="title"><i class="iconfont">&#xe63f;</i>学生姓名</span>
                    <span class="content">{{detail.studentName}}</span>
                </div>
                <div>
                    <span class="title"><i class="iconfont">&#xe637;</i>课程名称</span>
                    <span class="content">{{detail.courseName}}</span>
                </div>
                <div>
                    <span class="title"><i class="iconfont">&#xe621;</i>预计时间</span>
                    <span class="content">{{detail.startTime}}</span>
                </div>
                <div>
                    <span class="title"><i class="iconfont">&#xe663;</i>课时数</span>
                    <span class="content">{{detail.courseNumber}}</span>
                </div>
                <div>
                    <span class="title"><i class="iconfont">&#xe655;</i>课时长度</span>
                    <span class="content">{{detail.courseHour}}</span>
                </div>
                <div>
                    <span class="title"><i class="iconfont">&#xe663;</i>实际课时</span>
                    <span class="content">{{detail.realCourseTime}}</span>
                </div>
                <div>
                    <span class="title"><i class="iconfont">&#xe610;</i>备注</span>
                    <span class="content">{{detail.remark}}</span>
                </div>
            </div><!-- 
         --><div class="right">
                <div class="title">拍照取证</div>
                <div class="photo">
                    <img :src="img[0]" alt="" @click="amplification(0)">
                </div>
                <div class="title">{{returnWay}}</div>
                <div class="photo">
                    <img :src="img[1]" alt="" @click="amplification(1)">
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-popover ref="reason" placement="top" width="180" v-model="inputReason">
                    <el-input v-model="reason" icon="edit" placeholder="告诉他/她错在哪吧" @click="refuse()"></el-input>
                    <div style="text-align: right; margin-top: 10px">
                        <el-button size="mini" type="text" @click="cancelInput()">取消</el-button>
                        <el-button type="text" size="mini" @click="refuse()">退回</el-button>
                    </div>
                </el-popover>
                <el-button type="danger" v-popover:reason>退回重交</el-button>
                <el-button type="primary" @click="through()">通过审核</el-button>
            </span>
        </el-dialog>
        <el-dialog :visible.sync='showBigPicture' size="tiny" :show-close="false" custom-class="bigPhoto">
            <el-carousel  ref="carousel" :interval="5000" height="550px" arrow="always" :autoplay="false" :initial-index="initialIndex" indicator-position="none">
                <el-carousel-item v-for="item in 2" :key="item">
                    <img :src="img[item-1]" alt="">
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
    </div>
</template>
<script>
    import { _get ,_post } from "../../api/index.js"
    export default{
        data(){
            return {
                auditList:[],
                returnWay:"",               //回访方式，查看详情页时，当某位老师为某位学生上课是3的倍数时，微信回访改为电话回访
                detailShow:false,           //详情页显示
                detail:"",                  //当前显示的详情页的具体信息
                img:[],                     //详情页显示的两张图片
                showBigPicture:false,       //回访图片大图显示
                initialIndex:-1,            //回访大图显示的卡片的初始index
                reason:"",                  //退回重新审核的原因
                inputReason:false           //是否显示输入退出原因的输入框
            }
        },
        watch:{
            detailShow:function(newValue,oldValue){
                var _this = this;
                if(newValue){
                    _get({
                        url:"getClassCount",
                        data:{
                            workNumber:this.detail.workNumber,
                            sno:this.detail.sno
                        }
                    })
                    .then(function(response){
                        if(typeof response.data.count == 'number'){
                            if( (response.data.count+1)%3 == 0 ){
                                _this.returnWay = "电话回访";
                                _this.$notify.info({
                                    title: '提示',
                                    message: '此次'+_this.detail.teacherName+'老师需要提交电话回访记录哦~~'
                                });
                            }else{
                                _this.returnWay = "微信回访";
                            }
                        }else{
                            _this.$message.error('未知错误，请重试');
                            _this.detailShow = false;
                        }
                    })
                    .catch(function(){
                        _this.$message.error('未知错误，请重试');
                        _this.detailShow = false;
                    })
                }
            }
        },
        mounted(){
            var _this = this;
            _get({
                url:"getAuditTable",
            })
            .then(function(response){
                response.data.forEach(function(el){
                    var startTime = new Date(el.startTime);
                    var endTime = new Date(el.endTime);
                    el.time = startTime.toLocaleTimeString() + "~" + endTime.toLocaleTimeString();
                    /* el.time = startTime.getHours() + ":"+startTime.getMinutes() + "~" + endTime.getHours() + ":" + endTime.getMinutes(); */
                })
                _this.auditList = response.data;
            })
            .catch(function(error){
                console.log(error);
            })
        },
        methods:{
            refuse(){
                this.detail.status = "未通过";
                this.detail.reason = this.reason;
                var _this = this;
                _post({
                    url:"refuseAudit",
                    data:{
                        detail:this.detail
                    }
                })
                .then(function(response){
                    if(response.data == 'successful'){
                        _this.$message({
                            message: '退回审核成功',
                            type: 'success'
                        });
                        _this.reason = "";
                        _this.inputReason = false;
                        _this.detailShow = false;
                    }else{
                        _this.$message.error('退回审核失败，请检查输入或稍后重试');
                    }
                })
                .catch(function(error){
                    _this.$message.error('退回审核失败，请检查输入或稍后重试');
                })
            },
            through(){
                this.detail.status = "已审核";
                var _this = this;
                _post({
                    url:"throughAudit",
                    data:{
                        detail:this.detail
                    }
                })
                .then(function(response){
                    if(response.data == "successful"){
                        _this.$message({
                            message:"审批成功",
                            type:'success'
                        });
                        _this.reason = "";
                        _this.inputReason = false;
                        _this.detailShow = false;
                    }else{
                        _this.$message.error("提交失败，请重试");
                    }
                })
                .catch(function(){
                    _this.$message.error("提交失败，请重试");
                })
            },
            review(rowIndex,info){
                this.detail = info;
                this.showPhoto(info);
                this.detailShow = true;
            },
            showPhoto(info){
                var _this = this;
                _get({
                    url:"getPhoto",
                    data:{
                        photoEvidence:info.photoEvidencePath,
                        returnVisit:info.returnVisitPath
                    }
                })
                .then(function(response){
                    for( var i = 0 ; i < response.data.length ; i++ ){
                        _this.$set(_this.img,i,"data:image;base64,"+response.data[i]);
                    }
                })
                .catch(function(){

                });
            },
            amplification(index){
                this.showBigPicture = true;
                if( this.initialIndex == -1 ){
                    this.initialIndex = index;
                    console.log(this.initialIndex);
                }
                else
                    this.$refs.carousel.setActiveItem(index);
                
            },
            cancelInput(){
                this.reason = "";
                this.inputReason = false;
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
#audit{
    .viewDetail{
        width: 100%;
        height: 100%;
    }
    .el-dialog{
        .left{
            display: inline-block;
            width: 45%;
            div{
                margin-top: 12px;
                .title{
                    font-size: 15px;
                    .iconfont{
                        font-size: 19px;
                        color: #79cfe8;
                        margin-right: 5px;
                    }
                }
                .content{
                    float: right;
                }
            }
        }
        .right{
            width: 50%;
            margin-left:5%;
            display: inline-block;
            vertical-align: top;
            .photo{
                width: 78.75px;
                height: 140px;
                img{
                    width:100%;
                    height:100%;
                }
            }
            
        }
    }
    .bigPhoto{
        width: 310px;
        height: 550px;
        div{
            padding: 0 !important ;
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
}
.el-popover{
    height: 70px;
    .el-input{
        input{
            border-top:none;
            border-left: none;
            border-right: none;
        }
    }
    
}
</style>