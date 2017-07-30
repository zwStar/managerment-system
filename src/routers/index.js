/**
 * Created by 郭泽伟 on 2017/7/30.
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from '../view/Login/index.vue'
import Layout from '../view/Layout/index.vue'

Vue.use(Router);
const routes = [
    {
        path: "/",
        component: Layout,
        children: [

        ]
    },
    {
        path: "/login", component: Login
    }
]

export default new Router({
    mode: "history",
    routes
})


