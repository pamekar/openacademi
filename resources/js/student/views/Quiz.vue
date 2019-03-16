    <template>
    <div>
        <vue-headful
                :title="pageTitle + ' | OpenAcademi'"
                :description="description"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
        ></breadcrumb-component>
        <quiz-review-component  v-if="status==='completed'"></quiz-review-component>
        <quiz-questions-component v-else @completed="checkQuiz"></quiz-questions-component>
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
                        title: "Quizes", link: 'quizes'
                    },
                    {
                        title: ""
                    }
                ],
                description:"",
                pageTitle:   "",
                status:""
            }
        },
        created() {

        },
        mounted() {
            this.checkQuiz();
        },
        components: {
            'quiz-questions-component': QuizQuestionsComponent,
            'quiz-review-component':    QuizReviewComponent
        },
        computed:   {},
        methods:    {
            checkQuiz() {
                axios.get(`/api/quizes/${this.$route.params.id}/check`)
                    .then(({data}) => {
                        this.status = data.status;
                        this.pageTitle = data.test;
                        this.breadcrumbs[2].title = data.test;
                        this.description=data.description;
                    });
            },
        },
        props:      ['slug'],
        watch:      {
            '$route'(to, from) {
                // react to route changes...
                this.checkQuiz();
            }
        }
    }
</script>
<style>
    [dir=ltr] .nav-pills .nav-link.active:hover, [dir=ltr] .nav-pills .show > .nav-link:hover {
        color: #fff;
        background-color: #2196f3;
    }
</style>
