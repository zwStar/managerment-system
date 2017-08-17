<template>
    <div id="vsearch">
        <el-input placeholder='请输入搜索内容' icon='search' v-model='searchVal' :on-icon-click='handleSearch'>

        </el-input>
    </div>
</template>

<script>
    import * as api from '../api'
    export default{
        name: 'vsearch',
        data () {
            return {
                searchVal: ''
            }
        },
        props: ['model', 'searchKey'],
        methods:{
            handleSearch(){
                const _this = this;
                api._get({
                    url:"user/search",
                    data:{
                        model:_this.model,
                        searchKey: _this.searchKey,
                        searchVal: _this.searchVal
                    }
                }).then((results)=>{
                    if(results.status === 200){
                        _this.$store.commit('SET_ITEM', {key: 'adminItems', val: results.data })
                    }
                },(err)=>{
                    console.log(err);
                })
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
