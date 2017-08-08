<template>
<div class="layout">
    <v-header></v-header>
    <v-slider></v-slider>
    <div class="main">
        <router-view>

        </router-view>
    </div>
</div>
</template>

<script>
    import vHeader from './Header.vue'
    import vSlider from './Sliderbar.vue'
    export default {
        components:{
            vHeader,
            vSlider
        }
    }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.main{
    width: calc(100% - 300px);
    padding-top:80px;
    display:inline-block;
}
</style>
