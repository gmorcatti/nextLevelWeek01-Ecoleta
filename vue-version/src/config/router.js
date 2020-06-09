import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '@/components/Main'
import CreatePoint from '@/components/CreatePoint'

Vue.use(VueRouter)

const routes = [
    {
        name: 'main',
        path: '/',
        component: Main
    },  {
        name: 'create-points',
        path: '/create-point',
        component: CreatePoint
    }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

export default router