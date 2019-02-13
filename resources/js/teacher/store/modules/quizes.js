import router from '../../routes'


const endpoint = '/api/instructor';

const state = {
    quiz:                 [],
    quizes:               [],
    lesson:               [],
    lessons:              [],
    courses:              [],
    pageCount:            0,
    pageFrom:             0,
    pagePer:              0,
    pageTo:               0,
    pageTotal:            0,
    pageTitle:            '',
    purchased:            '',
    lesson_image_preview: '',
    lesson_image:         '',
    lesson_video:         '',
    media_title:          '',
    duration:             0,
    timePicker:           {
        HH: "",
        mm: "",
        ss: ""
    }
};

// actions
const actions = {
    delete_quizes({}, id, course) {
        axios.delete(`${endpoint}/quizes/${id}`)
            .then(({data}) => {
                
                jQuery.notify({
                    // options
                    message: data.message,
                }, {
                    // settings
                    type: data.type,
                });
            });
        router.push({name: 'view-course', params: {id: course}});
    },
    fetch({commit, dispatch}, id) {
        axios.get(`${endpoint}/quizes/${id}`)
            .then(response => commit('SET_QUIZ', response.data)).catch();
    },
    fetch_all({commit, dispatch}, page = 1) {
        // drg >> this action fetches all the lessons (paginated)
        axios.get(`${endpoint}/quizes?page=${page}`)
            .then(response => commit('SET_QUIZES', response.data)).catch();
    },
    fetch_edit({commit, dispatch}, id) {
        axios.get(`${endpoint}/quizes/${id}/edit`)
            .then(response => commit('SET_QUIZ_EDIT', response.data)).catch();
    },
    fetch_empty({commit}) {
        commit('SET_EMPTY', []);
    },
    fetch_add({commit}) {
        // drg >> this action fetches all the courses as a list
        axios.get(`${endpoint}/quizes/create`)
            .then(response => commit('SET_ADD', response.data)).catch();
    },
    fetch_list({commit}) {
        // drg >> this action fetches all the quizes as a list
        axios.get(`${endpoint}/quizes`)
            .then(response => commit('SET_LIST', response.data)).catch();
    },
    add({}, quiz) {
        
        let form_data = new FormData();
        let quizData = {
            // drg >> slug is not added to the list of objects, because it's auto generated
            title:       quiz.title,
            course_id:   quiz.course_id,
            lesson_id:   quiz.lesson_id,
            description: quiz.description,
            published:   quiz.published,
            duration:    quiz.duration
        };
        
        for (let key in quizData) {
            form_data.append(key, quizData[key]);
        }
        
        axios.post(`${endpoint}/quizes`, form_data)
            .then(({data}) => {
                
                jQuery.notify({
                    // options
                    message: data.message,
                }, {
                    // settings
                    type: data.type,
                });
                router.push({name: 'edit-lesson', params: {id: quiz.lesson_id}});
            });
    },
    edit({dispatch}, quiz) {
        let form_data = new FormData();
        let quizData = {
            // drg >> slug is not added to the list of objects, because it's auto generated
            course_id:          quiz.course_id,
            title:              quiz.title,
            short_text:         quiz.short_text,
            full_text:          quiz.full_text,
            free_quiz:          quiz.free_quiz,
            duration:           quiz.duration,
            published:          quiz.published,
            quiz_image:         quiz.quiz_image,
            quiz_image_preview: quiz.quiz_image_preview,
            _method:            'PUT'
        };
        
        for (let key in quizData) {
            form_data.append(key, quizData[key]);
        }
        ;
        
        axios.post(`${endpoint}/quizes/${quiz.id}`, form_data)
            .then(({data}) => {
                jQuery.notify({
                    // options
                    message: data.message,
                }, {
                    // settings
                    type: data.type,
                });
                dispatch('fetch', quiz.id)
            });
    }
    
};

// mutations
const mutations = {
    SET_QUIZ(state, quiz) {
        state.quiz = quiz.quiz;
        state.course = quiz.course;
        state.quizes = quiz.quizes;
        state.pageTitle = quiz.quiz.title;
    },
    SET_QUIZ_EDIT(state, quiz) {
        state.quiz = quiz.quiz;
        state.courses = quiz.courses;
        state.pageTitle = quiz.quiz.title;
        // drg >> set timepicker
        let duration = quiz.quiz.duration;
        state.timePicker.HH = Math.floor(duration / 3600);
        state.timePicker.mm = Math.floor((duration % 3600) / 60);
        state.timePicker.ss = Math.floor(duration % 60);
        
    },
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },
    SET_QUIZES(state, quizes) {
        state.quizes = quizes.data;
        state.pageCount = quizes.last_page;
        state.pageFrom = quizes.from;
        state.pagePer = quizes.per_page;
        state.pageTo = quizes.to;
        state.pageTotal = quizes.total;
    },
    SET_EMPTY(state, quizes) {
        state.quiz = [];
        state.quizes = [];
        state.categories = [];
        state.courses = [];
        state.pageCount = 0;
        state.pageTitle = '';
        state.purchased = '';
    },
    SET_ADD(state, quiz) {
        state.courses = quiz.courses;
        state.lessons = quiz.lessons;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}