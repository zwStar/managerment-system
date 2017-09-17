<template>
    <div class="visitorpie">
        <div id="visitorpie" class="" style="width: 90%;height:450px;"></div>
    </div>
</template>

<script>
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    // 引入标题组件
    import 'echarts/lib/chart/pie';
    import 'echarts/lib/component/title';
    import 'echarts/lib/component/legend';

    export default {
        mounted(){
            // 基于准备好的dom，初始化echarts实例
            this.myChart = echarts.init(document.getElementById('visitorpie'));
            this.initData();
        },
        methods:{
            initData(){
                const options = {
                    title : {
                        text: '用户分布',
                        subtext: '',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
                    },
                    series:[
                        {
                            name: '访问来源',
                            type:'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:this.pieData.beijing, name:'北京'},
                                {value:this.pieData.shanghai, name:'上海'},
                                {value:this.pieData.shenzhen, name:'深圳'},
                                {value:this.pieData.hangzhou, name:'杭州'},
                                {value:this.pieData.qita, name:'其他'}
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>