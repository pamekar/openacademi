// initial state
// shape: [{ id, quantity }]

const endpoint = '/api/instructor';

const state = {
    course:     [],
    courses:    [],
    categories: [],
    lessons:    [],
    pageCount:  0,
    pageTitle:  '',
    purchased:  '',
};

// actions
const actions = {
    fetch({commit}, id) {
        axios.get(`${endpoint}/courses/${id}/edit`)
            .then(response => commit('SET_COURSE', response.data)).catch();
        axios.get(`${endpoint}/course/categories`)
            .then(response => commit('SET_CATEGORIES', response.data));
    },
    
    fetch_all({commit}, page = 1) {
        axios.get(`${endpoint}/courses?page=${page}`)
            .then(response => commit('SET_COURSES', response.data)).catch()
    },
    add({}, title) {
        axios.post(`${endpoint}`, {
            'title':        title,
            'is_favourite': false,
        });
    },
    edit({dispatch}, course) {
        axios.put(`${endpoint}/courses/${course.id}`, {
            title:       course.title,
            slug:        course.slug,
            category:    course.category,
            tags:        course.tags,
            summary:     course.summary,
            description: course.description,
            price:       course.price,
            start_date:  course.start_date,
            end_date:    course.end_date,
            published:   course.published,
            
        })
            .then(({data}) => {
                
                jQuery.notify({
                    // options
                    message: data.message,
                }, {
                    // settings
                    type: data.type,
                });
                console.log();
                dispatch('fetch', course.id)
            });
    },
};

// mutations
const mutations = {
    SET_COURSE(state, course) {
        state.course = course;
        state.pageTitle = course.title;
        
    },
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },
    SET_COURSES(state, courses) {
        state.courses = courses.data;
        state.pageCount = courses.last_page;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}