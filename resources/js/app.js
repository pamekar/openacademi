import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios';
import {routes} from './router.js';

Vue.use(VueRouter);
Vue.use(axios);

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0){
            var cookie = c.substring(nameEQ.length, c.length);
            return cookie;
        }
    }
    return null;
}

window.axios = require('axios');
window.axios.defaults.headers.common = {
    'Authorization': 'Bearer ' + readCookie('jwt_token')
};

import Index from './views/IndexComponent.vue'

const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    el: '#app',
    components: {'app': Index},
    router,
});
