import router from '../../routes'


const endpoint = '/api/instructor';

const state = {
    currentPage:         1,
    courses:              [],
    lesson:               [],
    lessons:              [],
    lesson_image_preview: '',
    lesson_image:         '',
    lesson_video:         '',
    pageCount:            0,
    pageFrom:             0,
    pagePer:              0,
    pageTo:               0,
    pageTotal:            0,
    result:               [],
    results:              [],
    pageTitle:            '',
    purchased:            '',
    question:             [],
    quiz:                 [],
    quizes:               [],
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
    add({}, quiz) {
        
        let form_data = new FormData();
        let quizData = {
            // drg >> slug is not added to the list of objects, because it's auto generated
            title:       quiz.title,
            course_id:   quiz.course_id,
            lesson_id:   quiz.lesson_id,
            description: quiz.description,
            about_quiz:  quiz.about_quiz,
            published:   quiz.published,
            duration:    quiz.duration ? quiz.duration : 0
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
                router.push({name: 'edit-quiz', params: {id: data.id}});
            });
    },
    add_review({}, answer) {
        let form_data = new FormData();
        let reviewData = {
            score:  answer.review.score,
            review: answer.review.review
        };
        for (let key in reviewData) {
            form_data.append(key, reviewData[key]);
        }
        
        axios.post(`${endpoint}/quizes/review/${answer.id}`, form_data)
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
    edit({dispatch}, quiz) {
        let form_data = new FormData();
        let quizData = {
            // drg >> slug is not added to the list of objects, because it's auto generated
            title:       quiz.title,
            course_id:   quiz.course_id ? quiz.course_id : 0,
            lesson_id:   quiz.lesson_id ? quiz.lesson_id : 0,
            description: quiz.description,
            about_quiz:  quiz.about_quiz,
            published:   quiz.published,
            duration:    quiz.duration ? quiz.duration : 0,
            _method:     'PUT'
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
                router.push({name: 'edit-quiz', params: {id: quiz.id}});
                
            });
    },
    edit_review({}, review) {
        let form_data = new FormData();
        let reviewData = {
            score:   review.score,
            review:  review.review,
            _method: 'PUT'
        };
        
        for (let key in reviewData) {
            form_data.append(key, reviewData[key]);
        }
        
        axios.post(`${endpoint}/quizes/review/${review.id}`, form_data)
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
    fetch({commit, dispatch}, id) {
        axios.get(`${endpoint}/quizes/${id}`)
            .then(response => commit('SET_QUIZ', response.data)).catch();
    },
    fetch_add({commit}) {
        // drg >> this action fetches all the quizes as a list
        axios.get(`${endpoint}/quizes/create`)
            .then(response => commit('SET_ADD', response.data)).catch();
    },
    fetch_all({commit, dispatch}, page = 1) {
        // drg >> this action fetches all the lessons (paginated)
        axios.get(`${endpoint}/quizes?page=${page}`)
            .then(response => commit('SET_QUIZES', response.data)).catch();
    },
    // drg >> fetch data for quiz edit
    fetch_edit({commit, dispatch}, id) {
        axios.get(`${endpoint}/quizes/${id}/edit`)
            .then(response => commit('SET_QUIZ_EDIT', response.data)).catch();
    },
    fetch_list({commit}) {
        // drg >> this action fetches all the quizes as a list
        axios.get(`${endpoint}/quizes`)
            .then(response => commit('SET_LIST', response.data)).catch();
    },
    // drg >> empty all quiz data
    fetch_question({commit}) {
        axios.get(`${endpoint}/quizes`)
            .then(response => commit('SET_QUESTION', response.data)).catch();
    },
    fetch_question_empty({commit}) {
        commit('SET_QUESTION_EMPTY', []);
    },
    fetch_results({commit, dispatch}, params) {
        // drg >> this action fetches all the lessons (paginated)
        axios.get(`${endpoint}/quizes/${params.id}/results?page=${params.page}`)
            .then(response => commit('SET_RESULTS', response.data)).catch();
    },
};

// mutations
const mutations = {
    SET_QUIZ(state, quiz) {
        state.quiz = quiz;
    },
    SET_ADD(state, quiz) {
        state.courses = quiz.courses;
        state.lessons = quiz.lessons;
    },
    SET_QUIZ_EDIT(state, quiz) {
        state.quiz = quiz.test;
        state.courses = quiz.courses;
        state.lessons = quiz.lessons;
        state.pageTitle = quiz.test.title;
        // drg >> set timepicker data
        let duration = quiz.test.duration;
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
    SET_RESULTS(state, results) {
        state.currentPage=results.current_page;
        state.result = results.data[0];
        state.results = results.data;
        state.pageCount = results.last_page;
        state.pageFrom = results.from;
        state.pagePer = results.per_page;
        state.pageTo = results.to;
        state.pageTotal = results.total;
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}