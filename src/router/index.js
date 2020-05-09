import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../views/Home'
import Ranking from '../views/Ranking'
import Theglobal from '../components/Ranking/Friends'
import Friends from '../components/Ranking/Sentiment'
import Sentiment from '../components/Ranking/Theglobal'
const routes = [


    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: "首页"
        }
    },
    {
        path: '/Ranking',
        name: "Ranking",
        component: Ranking,
        meta: {
            title:  "排行榜"
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
    }

   

]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router