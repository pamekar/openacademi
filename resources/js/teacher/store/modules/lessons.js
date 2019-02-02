import router from '../../routes'


const endpoint = '/api/instructor';

const state = {
    lesson:     [],
    courses:    [],
    categories: [],
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
        axios.get(`${endpoint}/lessons/${id}/edit`)
            .then(response => commit('SET_LESSON', response.data)).catch();
    },
    fetch_empty({commit}) {
        commit('SET_EMPTY', []);
    },
    fetch_all({commit, dispatch}, page = 1) {
        // drg >> this action fetches all the lessons (paginated)
        axios.get(`${endpoint}/lessons?page=${page}`)
            .then(response => commit('SET_LESSONS', response.data)).catch();
        dispatch('fetch_categories');
    },
    fetch_courses({commit}) {
        // drg >> this action fetches all the courses as a list
        axios.get(`${endpoint}/lessons/create`)
            .then(response => commit('SET_COURSES', response.data)).catch();
    },
    fetch_list({commit}) {
        // drg >> this action fetches all the lessons as a list
        axios.get(`${endpoint}/lessons`)
            .then(response => commit('SET_LIST', response.data)).catch();
    },
    add({}, lesson) {
        
        let form_data = new FormData();
        let lessonData = {
            // drg >> slug is not added to the list of objects, because it's auto generated
            course_id:            lesson.course_id,
            title:                lesson.title,
            short_text:           lesson.short_text,
            full_text:            lesson.full_text,
            free_lesson:          lesson.free_lesson,
            duration:             lesson.duration,
            published:            lesson.published,
            lesson_image:         lesson.lesson_image,
            lesson_image_preview: lesson.lesson_image_preview,
        };
        for (let key in lessonData) {
            form_data.append(key, lessonData[key]);
        }
        axios.post(`${endpoint}/lessons`, form_data)
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
    edit({dispatch}, lesson) {
        axios.put(`${endpoint}/lessons/${lesson.id}`, {
            title:                lesson.title,
            slug:                 lesson.slug,
            category:             lesson.category,
            tags:                 lesson.tags.join(';'),
            summary:              lesson.summary,
            description:          lesson.description,
            price:                lesson.price,
            start_date:           lesson.start_date,
            end_date:             lesson.end_date,
            published:            lesson.published,
            lesson_image_preview: lesson.lesson_image_preview
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
                dispatch('fetch', lesson.id)
            });
    },
};

// mutations
const mutations = {
    SET_LESSON(state, lesson) {
        state.lesson = lesson.lesson;
        state.courses = lesson.courses;
        state.pageTitle = lesson.lesson.title;
    },
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },
    SET_LESSONS(state, lessons) {
        state.lessons = lessons.data;
        state.pageCount = lessons.last_page;
        state.pageFrom = lessons.from;
        state.pagePer = lessons.per_page;
        state.pageTo = lessons.to;
        state.pageTotal = lessons.total;
    },
    SET_EMPTY(state, lessons) {
        state.lesson = [];
        state.lessons = [];
        state.categories = [];
        state.courses = [];
        state.pageCount = 0;
        state.pageTitle = '';
        state.purchased = '';
    },
    SET_COURSES(state, courses) {
        state.courses = courses;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}