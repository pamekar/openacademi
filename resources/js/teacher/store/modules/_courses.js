import router from '../../routes'


const endpoint = '/api/instructor';

const state = {
    course:     [],
    courses:    [],
    categories: [],
    lessons:    [],
    pageCount:  0,
    pageFrom:   0,
    pagePer:    0,
    pageTo:     0,
    pageTotal:  0,
    pageTitle:  '',
    purchased:  '',
};

// actions
const actions = {
    fetch({commit, dispatch}, id) {
        axios.get(`${endpoint}/courses/${id}/edit`)
            .then(response => commit('SET_COURSE', response.data)).catch();
        dispatch('fetch_categories');
    },
    fetch_empty({commit}) {
        commit('SET_EMPTY', []);
    },
    fetch_all({commit, dispatch}, page = 1) {
        // drg >> this action fetches all the courses (paginated)
        axios.get(`${endpoint}/courses?page=${page}`)
            .then(response => commit('SET_COURSES', response.data)).catch();
        dispatch('fetch_categories');
    },
    fetch_categories({commit}) {
        // drg >> this action fetches all the categories
        axios.get(`${endpoint}/course/categories`)
            .then(response => commit('SET_CATEGORIES', response.data));
    },
    fetch_list({commit}){
        // drg >> this action fetches all the courses as a list
        axios.get(`${endpoint}/courses`)
            .then(response => commit('SET_COURSES', response.data)).catch();
    },
    add({}, course) {
        axios.post(`${endpoint}/courses`, {
            // drg >> slug is not added to the list of objects, because it's auto generated
            title:       course.title,
            slug:        course.slug,
            category:    course.category,
            tags:        course.tags.join(';'),
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
                router.push({name: 'edit-course', params: {id: data.course_id}});
            });
    },
    edit({dispatch}, course) {
        axios.put(`${endpoint}/courses/${course.id}`, {
            title:       course.title,
            slug:        course.slug,
            category:    course.category,
            tags:        course.tags.join(';'),
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
        state.pageFrom = courses.from;
        state.pagePer = courses.per_page;
        state.pageTo = courses.to;
        state.pageTotal = courses.total;
    },
    SET_EMPTY(state, courses) {
        state.course = [];
        state.courses = [];
        state.categories = [];
        state.lessons = [];
        state.pageCount = 0;
        state.pageTitle = '';
        state.purchased = '';
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}