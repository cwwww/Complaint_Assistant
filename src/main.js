import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import { Toast } from 'vant';
import 'vant/lib/index.css';
import VueClipboard  from 'vue-clipboard2'
import { DatetimePicker } from 'vant';

 import 'lib-flexible'

// Vue.prototype.$msg = message
// import http from "./axios/request";
import VueWechatTitle from 'vue-wechat-title'//动态修改title
import $ from 'jquery'
Vue.use(VueWechatTitle);
Vue.use(Vant);
Vue.use(DatetimePicker);
// Vue.prototype.$http = http;
Vue.prototype.$jquery = $;
Vue.config.productionTip = false
Vue.use( VueClipboard )
Vue.use(Toast);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



