import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '../views/Home'

const routes = [


    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            title: "Home Page"
        }
    },
    


]

const router = new VueRouter({
    mode: 'hash',
    routes
})
export default router