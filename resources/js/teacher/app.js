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

import vUploader from 'v-uploader';
var csrf_token = document.querySelector('meta[name=csrf-token]').getAttribute('content');

// v-uploader plugin global config
const uploaderConfig = {
    // file uploader service url
    uploadFileUrl: '/upload?_token='+csrf_token,
    // file delete service url
    deleteFileUrl: 'http://xxx/upload/deleteUploadFile',
    // set the way to show upload message(upload fail message)
    showMessage: (vue, message) => {
        //using v-dialogs to show message
        vue.$vDialog.alert(message, null, {messageType: 'error'});
    }
};


// install plugin with options
Vue.use(vUploader, uploaderConfig);

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