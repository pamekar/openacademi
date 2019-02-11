import Vue from 'vue'
import Vuex from 'vuex'
import courses from './modules/courses';
import lessons from './modules/lessons';
import quizes from './modules/quizes';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        courses,
        lessons,
        quizes
    },
    strict:  false
})