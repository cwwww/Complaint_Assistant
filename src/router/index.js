import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '../views/Home'
import HomeOther from '../views/HomeOther'
import FindList from '../components/FindList'
import Strategy from '../views/Strategy'
import Invite from '../views/Invite'
import Login from '../views/Login'
import bebotAgree from '../views/bebotAgree'
import bebotSecret from '../views/bebotSecret'
import LevelUp from '../views/LevelUp'
import GetMedal from '../views/GetMedal'
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
	    path: '/LevelUp',
	    name: 'LevelUp',
	    component: LevelUp,
	},
	{
	    path: '/GetMedal',
	    name: 'GetMedal',
	    component: GetMedal,
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