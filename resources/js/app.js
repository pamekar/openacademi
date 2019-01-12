import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios';
import {routes} from './router.js';

Vue.use(VueRouter)
Vue.use(axios)

import Index from './views/IndexComponent.vue'

const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    el: '#app',
    components: { 'app': Index },
    router,
});