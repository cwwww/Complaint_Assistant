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
import CancelFollow from '../views/CancelFollow'
import Task from '../views/Task'
import EveryDayTask from '../components/Task/EveryDayTask'
import NewTask from '../components/Task/NewTask'
import ProfessionTask from '../components/Task/ProfessionTask'
import Login from '../views/Login'
import WhoLookMe from '../views/WhoLookMe'
import shopZoom from '../views/shopZoom'
import bebotAgree from '../views/bebotAgree'
import bebotSecret from '../views/bebotSecret'

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
        }
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
	    path: '/CancelFollow',
	    name: 'CancelFollow',
	    component: CancelFollow
	},
    {
        path: '/Task',
        name: 'Task',
        redirect: '/Task/NewTask',
        component: Task,
        meta: {
            title: "任务"
        },
        children: [
			{
			    path: '/Task/NewTask',
			    name: 'NewTask',
			    component: NewTask,
			},
			
            {
                path: '/Task/EveryDayTask',
                name: 'EveryDayTask',
                component: EveryDayTask,
            },
           
			{
			    path: '/Task/ProfessionTask',
			    name: 'ProfessionTask',
			    component: ProfessionTask,
			},
			
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
    },
    {
        path: '/bebotAgree',
        name: 'bebotAgree',
        component: bebotAgree,
        meta: {
            title: "《保险侠服务协议》"
        }
    },
    {
        path: '/bebotSecret',
        name: 'bebotSecret',
        component: bebotSecret,
        meta: {
            title: "《保险侠服务协议》"
        }
    }


]

const router = new VueRouter({
    // mode: 'hash',
    routes
})
export default router