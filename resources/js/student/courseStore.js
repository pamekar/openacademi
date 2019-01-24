import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const courseStore = new Vuex.Store({
    state:     {
        course:     [],
        courses:    [],
        pageTitle:  '',
        purchased:'',
    },
    mutations: {
        FETCH(state, courses) {
            state.courses = courses;
        },
        SET_COURSE(state, data) {
            state.course = data.course;
            state.pageTitle = data.course.title;
            state.purchased = data.purchased;
            state.breadcrumbs[2].title = data.course.title;
        },
        FETCH_FAVOURITE(state, favouriteCourses) {
            state.favouriteCourses = favouriteCourses;
        }
    },
    actions:   {
        getCourse({commit},slug) {
            axios.get("/api/course/" +slug )
                .then(response => commit('SET_COURSE', response.data)).catch();
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

