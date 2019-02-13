<template>
    <div class="col-md-6">
        <div class="card card-sm">
            <div class="card-body media">
                <div class="media-body">
                    <h4 class="card-title mb-0">
                        <a href="instructor-review-quiz.html">{{quiz.title}}</a>
                        <small class="text-muted"><a href="#">{{quiz.lesson_title}}</a></small>
                    </h4>
                    <small class="text-muted d-block">{{quiz.completed_count}} Completed</small>
                    <small>{{description}} ...</small>
                </div>
            </div>
            <div class="card-footer text-center">
                <a href="instructor-review-quiz.html" class="btn btn-white btn-sm float-left"><i class="material-icons btn__icon--left">playlist_add_check</i> Review <span class="badge badge-dark ml-2">5</span></a>
                <a href="instructor-quiz-edit.html" class="btn btn-default btn-sm float-right"><i class="material-icons btn__icon--left">edit</i> Edit </a>
                <div class="clearfix"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed:{
            description: function(){

                let description = this.quiz.description;

                let temp=description.split(' ');

                let trimmed=temp.slice(0,20);

                return trimmed.join(' ');
            }
        },
        methods: {
            deleteQuiz(id) {
                this.$store.dispatch('courses/delete', id);
                this.$store.dispatch('courses/fetch_all');
            },
        },
        props:   {
            quiz: Object,
            tags:   Array
        }
    }
</script>

