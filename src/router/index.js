import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../views/Home'


import Ranking from '../views/Ranking'
import HomeChat from '../views/HomeChild/HomeChat'
import ACchat from '../views/HomeChild/ACchat'
import FairyShop from '../views/HomeChild/FairyShop'
import Theglobal from '../components/Ranking/Friends'
import Friends from '../components/Ranking/Sentiment'
import Sentiment from '../components/Ranking/Theglobal'
import List from '../views/List'
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
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: "首页"
        },
        children:[
            // {
            //     path: '/HomeChat',
            //     name: "HomeChat",
            //     component: HomeChat,
            //     meta: {
            //         title:  "聊天记录"
            //     },
            // },
            // {
            //     path:"/FairyShop",
            //     name:'FairyShop',
            //     component: FairyShop,
            //     meta: {
            //         title:  "精灵商店"
            //     },
            // },
        ]
    },
    {
        path: '/HomeChat',
        name: "HomeChat",
        component: HomeChat,
        meta: {
            title:  "聊天记录"
        },
    },
    {
        path: '/ACchat',
        name: "ACchat",
        component: ACchat,
        meta: {
            title:  "AC对话"
        },
    },
    {
        path:"/FairyShop",
        name:'FairyShop',
        component: FairyShop,
        meta: {
            title:  "精灵商店"
        },
    },
    {
        path: '/Ranking',
        name: "Ranking",
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

export default router