<template>
<div class="layout">
    <v-header></v-header>
    <v-slider></v-slider>
    <router-view>

    </router-view>
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

</style>
