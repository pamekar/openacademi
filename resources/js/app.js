import Vue from 'vue';
import StarRating from 'vue-star-rating';

Vue.component('star-rating', StarRating);

let app = new Vue({
    el:     '#app',
});