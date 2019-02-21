import router from '../../routes'


const endpoint = '/api/instructor';

const state = {
    courses:     [],
    lesson:      [],
    lessons:     [],
    pageCount:   0,
    pageFrom:    0,
    pagePer:     0,
    pageTo:      0,
    pageTotal:   0,
    pageTitle:   '',
    purchased:   '',
    question:    [],
    questions:   [],
    tests:       [],
    media_title: '',
    duration:    0,
    timePicker:  {
        HH: "",
        mm: "",
        ss: ""
    }
};

// actions
const actions = {
    add({}, question) {
        let form_data = new FormData();
        // drg >> set list of tests
        let tests = [];
        let testList = question.tests;
        
        for (let test in testList) {
            tests.push([testList[test].value]);
        }
        
        let questionData = {
            // drg >> slug is not added to the list of objects, because it's auto generated
            question:       question.question,
            question_image: question.question_image,
            score:          question.score ? question.score : 0,
            type:           question.type,
            tests:          tests
        };
        
        for (let key in questionData) {
            form_data.append(key, questionData[key]);
        }
        
        axios.post(`${endpoint}/questions`, form_data)
            .then(({data}) => {
                router.push({name: 'edit-quiz', params: {id: question.origin_id}});
                jQuery.notify({
                    // options
                    message: data.message,
                }, {
                    // settings
                    type: data.type,
                });
            });
    },
    delete_questions({}, id, course) {
        axios.delete(`${endpoint}/questions/${id}`)
            .then(({data}) => {
                router.push({name: 'edit-quiz', params: {id: question.origin_id}});
                jQuery.notify({
                    // options
                    message: data.message,
                }, {
                    // settings
                    type: data.type,
                });
            });
    },
    edit({dispatch}, question) {
        let form_data = new FormData();
        // drg >> set list of tests
        let tests = [];
        let testList = question.tests;
        
        for (let test in testList) {
            tests.push([testList[test].value]);
        }
        
        let questionData = {
            // drg >> slug is not added to the list of objects, because it's auto generated
            question:       question.question,
            question_image: question.question_image,
            score:          question.score ? question.score : 0,
            type:           question.type,
            tests:          tests,
            _method:        'PUT'
        };
        
        for (let key in questionData) {
            form_data.append(key, questionData[key]);
        }
        
        
        axios.post(`${endpoint}/questions/${question.id}`, form_data)
            .then(({data}) => {
                router.push({name: 'edit-quiz', params: {id: question.origin_id}});
                jQuery.notify({
                    // options
                    message: data.message,
                }, {
                    // settings
                    type: data.type,
                });
            });
    },
    fetch({commit, dispatch}, id) {
        axios.get(`${endpoint}/questions/${id}`)
            .then(response => commit('SET_QUESTION', response.data)).catch();
    },
    fetch_add({commit}) {
        // drg >> this action fetches all the questions as a list
        axios.get(`${endpoint}/questions/create`)
            .then(response => commit('SET_ADD', response.data)).catch();
    },
    fetch_all({commit, dispatch}, page = 1) {
        // drg >> this action fetches all the lessons (paginapted)
        axios.get(`${endpoint}/questions?page=${page}`)
            .then(response => commit('SET_QUESTIONS', response.data)).catch();
    },
    // drg >> fetch data for question edit
    fetch_edit({commit, dispatch}, id) {
        commit('SET_EMPTY');
        axios.get(`${endpoint}/questions/${id}/edit`)
            .then(response => commit('SET_QUESTION_EDIT', response.data)).catch();
    },
    fetch_list({commit}) {
        // drg >> this action fetches all the questions as a list
        axios.get(`${endpoint}/questions`)
            .then(response => commit('SET_LIST', response.data)).catch();
    },
    // drg >> empty all question data
    fetch_empty({commit}) {
        commit('SET_EMPTY');
    },
};

// mutations
const mutations = {
    SET_QUESTION(state, question) {
        state.question = question.question;
        state.question.tests = question.question_tests;
        state.tests = question.tests;
        state.course = question.course;
        state.questions = question.questions;
        state.pageTitle = question.question.title;
    },
    SET_ADD(state, question) {
        state.question = {
            is_new:         true,
            question:       '',
            question_image: null,
            score:          0,
            type:           'radio',
            tests:          []
        };
        state.tests = question.tests;
    },
    SET_QUESTION_EDIT(state, question) {
        state.question = question.question;
        state.question.tests = question.question_tests;
        state.tests = question.tests;
        
    },
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    },
    SET_QUESTIONS(state, questions) {
        state.questions = questions.data;
        state.pageCount = questions.last_page;
        state.pageFrom = questions.from;
        state.pagePer = questions.per_page;
        state.pageTo = questions.to;
        state.pageTotal = questions.total;
    },
    SET_EMPTY(state) {
        state.question = {
            question:       '',
            question_image: null,
            score:          0,
            type:           'radio',
            tests:          []
        };
    },
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
}