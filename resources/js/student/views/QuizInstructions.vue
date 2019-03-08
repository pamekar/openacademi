<template>
    <div>
        <vue-headful
                :title="pageTitle + ' | OpenAcademi'"
                :description="course.summary"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
        ></breadcrumb-component>

        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active">Quiz</li>
        </ol>
        <div class="card">

        </div>
    </div>
</template>
<script>
    import LessonsListComponent from '../components/LessonsListComponent.vue'

    export default {
        data() {
            return {
                course:          [],
                courseListWidth: "col-lg-3 col-md-4, col-sm-6",
                breadcrumbs:     [
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
                pageTitle:       "Courses",
                purchased:       ""
            }
        },
        created() {
            this.getQuiz();
        },
        mounted() {
        },
        components: {
        },
        methods:    {
            getQuiz() {
                axios.get(`/api/quizes/${this.$route.params.id}/${this.$route.params.slug}`)
                    .then(({data}) => {
                        this.course = data.course;
                        this.pageTitle = data.course.title;
                        this.purchased = data.purchased;
                        this.breadcrumbs[2].title = data.course.title;
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
