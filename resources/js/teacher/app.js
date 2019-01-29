import Vue from 'vue';
import VueRouter from 'vue-router';
import BootstrapVue from 'bootstrap-vue';
import VueHeadful from 'vue-headful';
import './uiux/css/nprogress.css';
import './uiux/css/nprogress.css';
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue';
import StarRating from 'vue-star-rating';
import Breadcrumb from './components/BreadcrumbComponent.vue';
import axios from 'axios';
import router from './routes.js';
import functions from './functions.js';
import store from './store/index.js';

Vue.use(BootstrapVue);
Vue.use(VueRouter);


functions.setupAxios();

Vue.component('star-rating', StarRating);
Vue.component('vue-headful', VueHeadful);
Vue.component('breadcrumb-component', Breadcrumb);

let app = new Vue({
    el:     '#app',
    render: h => h(App),
    router,
    store:  store
});