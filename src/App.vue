<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import './assets/css/custom.css';
@import './assets/css/style.css';
@import './assets/css/stylesheet.css';

/*@import './assets/css/bootstrap.min.css';*/

body {
  background-color: #fbf9fe;
}
</style>
