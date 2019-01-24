import Vue from 'vue'
import VueRouter from 'vue-router'
import VueHeadful from 'vue-headful';
import './uiux/css/nprogress.css'
import App from './App.vue'
import StarRating from 'vue-star-rating'
import Breadcrumb from './components/BreadcrumbComponent.vue'
import axios from 'axios'
import router from './routes.js'
import functions from './functions.js'

Vue.use(VueRouter);
Vue.use(axios);

functions.setupAxios();

Vue.component('star-rating', StarRating);
Vue.component('vue-headful', VueHeadful);
Vue.component('breadcrumb-component', Breadcrumb);

let app = new Vue({
    el:     '#app',
    render: h => h(App),
    router,
});