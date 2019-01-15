import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Breadcrumb from './components/BreadcrumbComponent.vue'
import axios from 'axios'
import routes from './routes.js'
import functions from './functions.js'

Vue.use(VueRouter);
Vue.use(axios);

functions.setupAxios();

const router = new VueRouter({
    mode: 'history',
    routes
});

Vue.component('breadcrumb-component', Breadcrumb);

let app = new Vue({
    el: '#app',
    render: h => h(App),
    router,
});
