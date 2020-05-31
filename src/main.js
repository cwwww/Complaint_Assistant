import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import { Toast,Button,Overlay } from 'vant';
import 'vant/lib/index.css';
import VueClipboard  from 'vue-clipboard2'
import { DatetimePicker } from 'vant';
 import 'lib-flexible'
 import {UrlSearch} from "./assets/js/common/Fun"
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
let Request = new UrlSearch
Vue.prototype.$Request = Request
Vue.use(VueWechatTitle);
Vue.use(Vant);
Vue.use(DatetimePicker);
// Vue.prototype.$http = http;
Vue.prototype.$jquery = $;
Vue.config.productionTip = false
Vue.use( VueClipboard )
Vue.use(Toast,Button,Overlay);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



