<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
  html,body{
    padding:0;
    margin:0;
  }

  @font-face {
    font-family: 'iconfont';  /* project id 357409 */
    src: url('http://at.alicdn.com/t/font_357409_9nv3c2m4362bj4i.eot');
    src: url('http://at.alicdn.com/t/font_357409_9nv3c2m4362bj4i.eot?#iefix') format('embedded-opentype'),
    url('http://at.alicdn.com/t/font_357409_9nv3c2m4362bj4i.woff') format('woff'),
    url('http://at.alicdn.com/t/font_357409_9nv3c2m4362bj4i.ttf') format('truetype'),
    url('http://at.alicdn.com/t/font_357409_9nv3c2m4362bj4i.svg#iconfont') format('svg');
  }
  .iconfont{
      font-family: iconfont;
      font-style: normal;
  }

  a{
    text-decoration: none;
    color:#000;
  }
</style>
