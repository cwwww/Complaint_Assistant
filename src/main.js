import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import element from 'element-ui'
import { Toast,Button } from 'vant';
import 'vant/lib/index.css';
import VueClipboard  from 'vue-clipboard2'
import { DatetimePicker } from 'vant';
import wx from 'weixin-js-sdk' ;
 import 'lib-flexible'
// import Router from 'vue-router'
// const routerPush = Router.prototype.push
// Router.prototype.push = function push(location) {
//   return routerPush.call(this, location).catch(error=> error)
// }
// Vue.prototype.$msg = message
// import http from "./axios/request";
import 'lib-flexible'
import VueWechatTitle from 'vue-wechat-title'//动态修改title
import $ from 'jquery'
Vue.use(VueWechatTitle);
Vue.use(Vant);
Vue.use(element);
Vue.use(DatetimePicker);
// Vue.prototype.$http = http;
Vue.prototype.$jquery = $;
Vue.config.productionTip = false
Vue.use( VueClipboard )
Vue.use(Toast);
Vue.use(wx);
Vue.use(Toast,Button);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



