import Vue from 'vue';
import StarRating from 'vue-star-rating';
import Courses from './components/Courses.vue'
import SearchCourses from './components/SearchCourses.vue'

Vue.component('star-rating', StarRating);
Vue.component('courses', Courses);
Vue.component('search-courses', SearchCourses);

let app = new Vue({
    el: '#app',
});