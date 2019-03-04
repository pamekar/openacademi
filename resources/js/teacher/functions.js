import NProgress from './uiux/js/nprogress.js'
import jquery from 'jquery'

const functions = {
    readCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    setupAxios: function () {
        let jwtAuth=this.readCookie('jwt_token');
        window.axios = require('axios');
        window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwtAuth;
        window.axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
        window.axios.defaults.headers.put['Content-Type'] = 'multipart/form-data';
        // drg >> add a request interceptor
        axios.interceptors.request.use(function (config) {
            // drg >> display progress bar on every ajax request
            NProgress.start();
            return config;
        }, function (error) {
            console.error(error);
            NProgress.failed();
            return Promise.reject(error);
        });

// drg >> add a response interceptor
        axios.interceptors.response.use(function (response) {
            NProgress.done();
            return response;
        }, function (error) {
            console.error(error);
            return Promise.reject(error);
        });
        
        jquery(document).ajaxComplete(function (event, request, settings) {
            console.log(2);
            NProgress.done();
        });
        
        jquery(document).ajaxStart(function () {
            console.log(2);
            NProgress.start();
        });
        
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN':  $('meta[name="csrf-token"]').attr('content'),
                'Authorization': 'Bearer ' + jwtAuth
            }
        });
    },
};

export default functions;