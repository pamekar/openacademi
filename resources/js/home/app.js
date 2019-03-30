import Vue from 'vue';
import StarRating from 'vue-star-rating';
import Courses from './components/Courses.vue'

Vue.component('star-rating', StarRating);
Vue.component('courses', Courses)
let app = new Vue({
    el: '#app',
});