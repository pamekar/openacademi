import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Index from './components/IndexComponent.vue'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Index
        },
    ],
});

new Vue({
    el: '#app',
    components: { 'app': Index },
    router,
});