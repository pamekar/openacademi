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
        <quiz-questions-component></quiz-questions-component>
    </div>
</template>
<script>
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import QuizQuestionsComponents from '../components/QuizQuestionsComponent.vue'
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
                editor:      ClassicEditor,
                pageTitle:   "",
                result:      [],
                questions:   [],
                quiz:        [],
                started_at:  (new Date).getTime()+5000
            }
        },
        created() {

        },
        mounted() {

        },
        components: {
            ckeditor:               CKEditor.component,
            'quiz-questions-component': QuizQuestionsComponents
        },
        computed:   {

        },
        methods:    {

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
