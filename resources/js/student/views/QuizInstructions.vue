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

        <div class="card">
            <div class="card-body" v-html="quiz.description"></div>
        </div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-title mb-0">
                    Quiz Instructions
                </h4>
            </div>
            <div class="card-body" v-html="instructions"></div>
            <div class="card-footer text-center">
                <router-link :to="{name:'quiz',params:{id:quiz.id}}" class="btn btn-lg btn-success">Take Quiz</router-link>
            </div>
        </div>
    </div>
</template>
<script>
    import LessonsListComponent from '../components/LessonsListComponent.vue'

    export default {
        data() {
            return {
                instructions: "",
                quiz:         [],
                breadcrumbs:  [
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
                pageTitle:    ""
            }
        },
        created() {
            this.getQuiz();
        },
        mounted() {
        },
        components: {},
        methods:    {
            getQuiz() {
                axios.get(`/api/quizes/${this.$route.params.id}/${this.$route.params.slug}`)
                    .then(({data}) => {
                        this.quiz = data.quiz;
                        this.pageTitle = data.quiz.title;
                        this.breadcrumbs[2].title = data.quiz.title;
                        this.instructions = data.instructions;
                    });
            },
        },
        props:      ['slug'],
        computed:   {}
    }
</script>
<style>
    [dir=ltr] .nav-pills .nav-link.active:hover, [dir=ltr] .nav-pills .show > .nav-link:hover {
        color: #fff;
        background-color: #2196f3;
    }
</style>
