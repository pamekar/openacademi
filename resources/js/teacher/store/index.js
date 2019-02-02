import Vue from 'vue'
import Vuex from 'vuex'
import courses from './modules/courses';
import lessons from './modules/lessons';
//import app from './modules/app';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        courses,
        lessons
    },
    strict:  false
})