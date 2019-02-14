<template>
    <div class="col-md-6">
        <div class="card card-sm">
            <div class="card-body media">
                <div class="media-body">
                    <h4 class="card-title mb-0">
                        <router-link :to="{name:'view-quiz',params:{id:quiz.id}}">{{quiz.title}}</router-link>
                        <small class="text-muted"><a href="#">{{quiz.lesson_title}}</a></small>
                    </h4>
                    <small class="text-muted d-block">{{quiz.completed_count}} Completed</small>
                    <small>{{quiz.about_quiz}}</small>
                </div>
            </div>
            <div class="card-footer text-center">
                <router-link :to="{name:'view-quiz',params:{id:quiz.id}}" class="btn btn-white btn-sm float-left"><i class="material-icons btn__icon--left">playlist_add_check</i> Review <span class="badge badge-dark ml-2">5</span></router-link>
                <router-link :to="{name:'edit-quiz',params:{id:quiz.id}}" class="btn btn-default btn-sm float-right"><i class="material-icons btn__icon--left">edit</i> Edit </router-link>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {},
        methods:  {
            deleteQuiz(id) {
                this.$store.dispatch('courses/delete', id);
                this.$store.dispatch('courses/fetch_all');
            },
        },
        props:    {
            quiz: Object,
            tags: Array
        }
    }
</script>

