import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import courses from './modules/courses';

Vue.use(Vuex);

const endpoint = '/api/instructor/';

const courseStore = new Vuex.Store({
    state:     {
        // drg >> for courses
        course:      [],
        lessons:     [],
        courses:     [],
        categories:  [],
        pageCount:   0,
        pageTitle:   '',
        purchased:   '',
    },
    mutations: {
        FETCH_COURSE(state, course) {
            state.course = course;
            state.pageTitle=course.title;
        },
        FETCH_COURSES(state, courses) {
            state.courses = courses.data;
            state.pageCount = courses.last_page;
        },
        FETCH_FAVOURITE(state, favouriteCourses) {
            state.favouriteCourses = favouriteCourses;
        }
    },
    actions:   {
        fetchCourse({commit}, id) {
            axios.get(endpoint + `courses/${id}/edit`)
                .then(response => commit('FETCH_COURSE', response.data)).catch();
        },
        
        fetchCourses({commit}, page = 1) {
            axios.get(endpoint + `courses?page=${page}`)
                .then(response => commit('FETCH_COURSES', response.data)).catch()
        },
        fetch({commit}) {
            return axios.get(courses)
                .then(response => commit('FETCH', response.data))
                .catch();
        },
        deleteCourse({}, id) {
            axios.delete(`${courses}/${id}`)
                .then(() => this.dispatch('fetch'))
                .catch();
        },
        edit({}, course) {
            axios.put(`${courses}/${course.id}`, {
                title: course.title
            })
                .then(() => this.dispatch('fetch'));
        },
        toggleFavourite({}, id) {
            axios.put(`${courses}/${id}/toggleFavourite`, {
                is_favourite: true
            })
                .then(() => this.dispatch('fetch'))
        },
        fetchFavourite({commit}) {
            return axios.get(`${courses}?type=favourite`)
                .then(response => commit('FETCH_FAVOURITE', response.data))
                .catch();
        },
        add({}, title) {
            axios.post(`${courses}`, {
                'title':        title,
                'is_favourite': false,
            });
        }
    }
});

export default courseStore;

