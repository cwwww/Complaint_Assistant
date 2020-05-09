<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title" />
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang="scss" scoped>
// 取消css默认样式
@import url(./assets/css/reset.css);
// @import url(./style/reset.css);
// 字体图标
@import url(./assets/font/iconfont.css);
</style>
