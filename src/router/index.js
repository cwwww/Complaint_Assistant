import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../views/Home'


import Ranking from '../views/Ranking'
import HomeChat from '../views/HomeChild/HomeChat'
import ACchat from '../views/HomeChild/ACchat'
import ACVisitor from '../views/HomeChild/ACVisitor'
import FairyShop from '../views/HomeChild/FairyShop'
import sellerShop from '../views/HomeChild/sellerShop'

import Theglobal from '../components/Ranking/Friends'
import Friends from '../components/Ranking/Sentiment'
import Sentiment from '../components/Ranking/Theglobal'
import myShop from '../components/sellerShop/myShop'
import mySeller from '../components/sellerShop/mySeller'
import vipShop from '../components/sellerShop/vipShop'
import List from '../views/List'
import HomeOther from '../views/HomeOther'
import Friend from '../components/List/Friend'
import Bean from '../components/List/Bean'
import FindList from '../components/FindList'
import Strategy from '../views/Strategy'
import Invite from '../views/Invite'
import Repository from '../views/Repository'
import Task from '../views/Task'
import EveryDayTask from '../components/Task/EveryDayTask'
import NewTask from '../components/Task/NewTask'
import Login from '../views/Login'
import WhoLookMe from '../views/WhoLookMe'
import shopZoom from '../views/shopZoom'
const routes = [
    {
        path: '/Login',
        name: 'Login',
        component: Login,
        meta: {
            title: "登录页"
        }
    },
    {
        path: '/HomeOther',
        name: 'HomeOther',
        component: HomeOther,
        meta: {
            title: "串门"
        }
    },
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: "首页"
        },
        children:[
            
        ]
    },
    {
        path: '/HomeChat',
        name: "HomeChat",
        component: HomeChat,
        meta: {
            title: "聊天记录"
        },
    },
    {
        path: '/ACchat',
        name: "ACchat",
        component: ACchat,
        meta: {
            title:  "AC代理人对话"
        },
    },
    {
        path: '/ACVisitor',
        name: "ACVisitor",
        component: ACVisitor,
        meta: {
            title:  "AC访客对话"
        },
    },
    {
        path: "/FairyShop",
        name: 'FairyShop',
        component: FairyShop,
        meta: {
            title:  "精灵商店买家"
        },
    },
    {
        path: '/sellerShop',
        name: "sellerShop",
        redirect: '/sellerShop/myShop',
        component: sellerShop,
        meta: {
            title: "精灵商店"
        },
        children: [
            {
                path: "/sellerShop/myShop",
                name: 'myShop',
                component: myShop,
            },
            {
                path: "/sellerShop/mySeller",
                name: 'mySeller',
                component: mySeller,
            },
            {
                path: "/sellerShop/vipShop",
                name: "vipShop",
                component: vipShop,
            }
        ]
    },
    {
        path: '/Ranking',
        name: "Ranking",
        redirect: '/Ranking/Sentiment',
        component: Ranking,
        meta: {
            title: "排行榜"
        },
        children: [
            {
                path: "/Ranking/Theglobal",
                name: 'Theglobal',
                component: Theglobal,
            },
            {
                path: "/Ranking/Friends",
                name: 'Friends',
                component: Friends,
            },
            {
                path: "/Ranking/Sentiment",
                name: "Sentiment",
                component: Sentiment
            }
        ]
    },
    {
        path: '/List',
        name: 'List',
        component: List,
        meta: {
            title: "列表"
        },
        children: [
            {
                path: "/List/Friend",
                name: "Friend",
                component: Friend
            },
            {
                path: "/List/Bean",
                name: "Bean",
                component: Bean
            }
        ]
    },
    {
        path: '/FindList',
        name: "FindList",
        component: FindList
    },
    {
        path: '/Strategy',
        name: 'Strategy',
        component: Strategy
    },
    {
        path: '/Invite',
        name: "Invite",
        component: Invite
    },
    {
        path: '/Repository',
        name: 'Repository',
        component: Repository
    },
    {
        path: '/Task',
        name: 'Task',
        redirect: '/Task/EveryDayTask',
        component: Task,
        meta: {
            title: "任务"
        },
        children: [
            {
                path: '/Task/EveryDayTask',
                name: 'EveryDayTask',
                component: EveryDayTask,
            },
            {
                path: '/Task/NewTask',
                name: 'NewTask',
                component: NewTask,
            }
        ]
    },
    {
        path: '/WhoLookMe',
        name: 'WhoLookMe',
        component: WhoLookMe,
        meta: {
            title: "谁看过我"
        }
    },
    {
        path: '/shopZoom',
        name: 'shopZoom',
        component: shopZoom,
        meta: {
            title: "知识库改版"
        }
    }




]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})
// export function goLogin(next_to){
//     var account_id = store.state.token.account_id;
//     var retry_count = store.state.token.retry_count;
//     if (retry_count >= 1) {
//         return false;
//     }
//     store.commit('retry_count_add');
//     api.getAppId(account_id)
//     .then(function(res){
//         store.commit('set_appid',res.appid);
//         var scope = 'snsapi_base';
//         var auth_url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + res.appid + '&redirect_uri=' + encodeURIComponent(window.location.href) + '&response_type=code&scope='+scope+'&state=STATE&component_appid='+ res.component_appid + '#wechat_redirect';
//         window.location.replace(auth_url);
//        //点击后，页面将跳转至 redirect_uri?code=CODE&state=STATE；；；；替换地址之后会重新触发router.beforeEach
//     })
//     .catch(function(err){
//         store.commit('set_toast_msg','AppId获取失败');
//         console.log('获取appid失败',err.response);
//     });
// }
// export function getToken(code,suc_func){
//     var app_id = store.state.token.app_id;
//     api.getToken(code,app_id).then(function(res){
//         setToken(res.account_id,res);
//         suc_func = suc_func?suc_func:function(){};
//         suc_func();
//         console.log('getToken',res);
//     }).catch(function(err){
//         console.log('getToken',err);
//     });
// }
// export function setToken(account_id,token_info){
//     localStorage['token_info_'+account_id] = JSON.stringify(token_info);
// }
// export function syncToken(account_id){
//     if (process.env.NODE_ENV == 'development') {
//         var storage = process.env.DEV_API_TOKEN;
//     }else{
//         var storage = localStorage['token_info_'+account_id];
//     }
    
//     if (!storage) {
//         return false;
//     }
//     //将缓存中的token信息 ，加入store
//     var current_token_info = JSON.parse(storage);
//     if(current_token_info){
//         store.commit('set_hospital',current_token_info.hospital?current_token_info.hospital:'');
//         store.commit('set_appid',current_token_info.app_id?current_token_info.app_id:'');
//         store.commit('set_token',current_token_info.token?current_token_info.token:'');
//         store.commit('set_accountid',current_token_info.account_id?current_token_info.account_id:0);
//         return current_token_info.token?current_token_info.token:'';
//     }else{
//         return false;
//     }
        
// }
// router.beforeEach((to, from, next) => {
    
//     var wx_code = getQueryParam('code');
//     var wx_state = getQueryParam('state');
    
//     //页面设置account_id后 重置当前访问的account_id
//     var account_id = to.query.account_id?to.query.account_id:0;
//     if(account_id > 0){
//         store.commit('set_accountid',account_id)    
//     }else{
//         account_id = store.state.token.account_id;
//     }
//     var current_token = syncToken(account_id);//获取token信息
//    //如果token不存在，并且code存在的时候，根据code、appid获取token
//     if(!current_token && wx_code && wx_state){
//         document.title = '正在登录...';
//         getToken(wx_code,function(){
//             //跳往授权跳转前的链接
//             if(store.state.token.after_login_go){
//                 next({
//                     path:store.state.token.after_login_go,
//                     replace:true
//                 });
//                 //清除授权跳转临时数据
//                 store.commit('set_login_go','');
//             }else{
//                 //api 接口触发的话 ，没有loging_go 
//                 location.reload();
//             }
            
//         });
//         return ;
//     }
//    //如果token存在
//     if(current_token){
//         next();
//        //在这里进入页面之后会调取接口，如果接口返回401，会先清除token缓存然后执行goLogin方法，如果接口返回200，则渲染数据
//     }else{
//         //如果token、code都不存在,页面第一次进入的时候
//         document.title = '正在登录...';
//         store.commit('set_login_go',to.fullPath);//页面将要跳转的地址
//         goLogin();//通过account_id获取appid,然后跳转到auth_url，获取code，然后会再重新执行router.beforeEach
//     }
    
// });
export default router