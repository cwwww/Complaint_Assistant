<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title" v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: "app",
  data(){
      return {
          isRouterAlive: true 
      }
  },
  provide () {
    return {reload: this.reload}
    },
  methods:{
    reload(){
          this.isRouterAlive = false
          this.$nextTick(function () {  //在下次dom更新循环结束之后执行延迟回调。数据更新之后立即使用这个方法，获得更新后的dom
              this.isRouterAlive = true
          })
      },
    
  }
};
</script>

<style lang="scss" scoped>
// 取消css默认样式
@import url(./assets/css/reset.css);
// @import url(./style/reset.css);
// 字体图标
@import url(./assets/font/iconfont.css);
// @import url(./assets/css/chat.css);
</style>
