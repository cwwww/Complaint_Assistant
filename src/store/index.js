import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//持久化当前token 相关信息
export default {
  state:{
      token:localStorage['site_current_token']?localStorage['site_current_token']:'',             //token
      account_id:localStorage['site_current_account_id']?localStorage['site_current_account_id']:0,       //当前account_id
      app_id:localStorage['site_current_app_id']?localStorage['site_current_app_id']:'',          //当前 app_id
      retry_count:0,//登录重试次数,防止同一页面中多个ajax同时触发登录操作
      after_login_go:localStorage['site_current_login_go']?localStorage['site_current_login_go']:'',//登录后跳转
  },
  mutations:{

  },
  actions:{
  },
  gettters:{}
}