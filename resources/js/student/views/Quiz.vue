<template>
    <div>
        <vue-headful
                :title="pageTitle + ' | OpenAcademi'"
                :description="quiz.description"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
        ></breadcrumb-component>
        <quiz-questions-component v-if="result.status!=='completed'" :quiz="quiz" :questions="questions" :result="result" :started_at="started_at"></quiz-questions-component>
        <quiz-review-component v-else :quiz="quiz" :questions="questions" :result="result"></quiz-review-component>
    </div>
</template>
<script>
    import QuizQuestionsComponent from '../components/QuizQuestionsComponent.vue'
    import QuizReviewComponent from '../components/QuizReviewComponent.vue'

    export default {
        data() {
            return {
                breadcrumbs: [
                    {
                        title: "Dashboard", link: 'dashboard'
                    },
                    {
                        title: "Courses", link: 'all-courses'
                    },
                    {
                        title: ""
                    }
                ],
                pageTitle:   "",
                result:      [],
                questions:   [],
                quiz:        [],
                started_at:  (new Date).getTime() + 5000
            }
        },
        created() {

        },
        mounted() {
            this.getQuiz();
        },
        components: {
            'quiz-questions-component': QuizQuestionsComponent,
            'quiz-review-component':    QuizReviewComponent
        },
        computed:   {},
        methods:    {
            getQuiz() {
                axios.get(`/api/quizes/${this.$route.params.id}`)
                    .then(({data}) => {
                        this.quiz = data.quiz;
                        this.pageTitle = data.quiz.title;
                        this.breadcrumbs[2].title = data.quiz.title;
                        this.questions = data.questions;
                        this.result = data.result
                    });
                axios.get(`/api/quizes/start/${this.$route.params.id}`)
                    .then(({data}) => {
                        this.started_at = parseInt(data);
                    });
            },

        },
        props:      ['slug'],
    }
</script>
<style>
    [dir=ltr] .nav-pills .nav-link.active:hover, [dir=ltr] .nav-pills .show > .nav-link:hover {
        color: #fff;
        background-color: #2196f3;
    }
</style>
