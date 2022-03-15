<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
@import '~@/assets/styles/element-hack';
@import '~@/assets/styles/common';
@import '~@/assets/styles/sidebar';
</style>

<style lang="less" scoped>
#app {
  background: mix(#044289, #494166);
  /*初始化样式*/
  color: #fff;
  font-size: 13px;
}
</style>
