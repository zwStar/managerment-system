<template>
    <div id="vsearch">
        <el-input placeholder='请输入搜索内容' icon='search' v-model='searchVal' :on-icon-click='handleSearch' @keyup.enter.native="handleSearch()"></el-input>
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
        props: ['model', 'searchKey'],  //传入model 和 要查找的关键字
        methods:{
            handleSearch(){
                const _this = this;
               if(this.searchVal !== ''){
                   api._get({
                       url:"user/search",
                       data:{
                           model:_this.model,
                           searchKey: _this.searchKey,
                           searchVal: _this.searchVal
                       }
                   }).then((results)=>{
                       if(results.status === 200){     //查找成功 就添加到adminItems adminItems改变就会触发相应的computed 视图内容改变
                           _this.$store.commit('SET_ITEM', {key: 'adminItems', val: results.data })
                       }
                   },(err)=>{
                       console.log(err);
                   })
               }else{
                   this.$message({
                       message: '输入内容不能为空',
                       type: 'error'
                   });
               }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

</style>
