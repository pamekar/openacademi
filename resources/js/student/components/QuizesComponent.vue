<template>
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <div class="media">
                    <div class="media-body">
                        <h4 class="card-title m-0">
                            <router-link :to="{name:'course',params:{slug:quiz.id}}">{{quiz.test.title}}</router-link>
                        </h4>
                        <small >
                            {{quiz.test.about_quiz}}
                        </small>
                        <ul class="list-inline">
                            <li class="text-muted list-inline-item small">Course
                                <router-link :to="{name:'course',params:{slug:quiz.test.course.slug}}">{{quiz.test.course_title}}</router-link>
                            </li>
                            <li class="text-muted list-inline-item small">Lesson
                                <router-link :to="{name:'lesson',params:{slug:quiz.test.lesson.slug,'id':quiz.test.course_id}}">{{quiz.test.lesson_title}}</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="media-right text-center">
                        <h2 :class="score(quiz).color">{{score(quiz).percentage}}</h2>
                        <small class="text-black-50">{{score(quiz).remark}}</small>
                    </div>
                </div>
            </div>
            <div class="card-footer bg-white">
                <router-link :to="{name:'quiz',params:{slug:quiz.id}}" class="btn btn-default btn-sm">View <i class="material-icons btn__icon--right">visibility</i></router-link>
                <router-link :to="{name:'quiz-instructions',params:{id:quiz.test.id,slug:quiz.test.lesson.slug}}" class="btn btn-primary btn-sm float-right">Retake <i class="material-icons btn__icon--right">replay</i></router-link>
            </div>
        </div>

    </div>
</template>

<script>
    import ProgressComponent from './ProgressComponent.vue'

    export default {
        data() {
            return {};
        },
        components: {
            'progress-component': ProgressComponent
        },
        computed:   {},
        props:      {
            quiz: Object,
        },
        methods:    {
            score(quiz) {
                console.log(quiz)
                let score = Math.round((quiz.test_result / quiz.total_score) * 100);
                let remark = "";
                let color = "text-muted";
                switch (true) {
                    case score >= 80 && score <= 100:
                        remark = "Great";
                        color = "text-success";
                        break;
                    case score >= 60 && score < 80:
                        remark = "Good";
                        color = "text-warning";
                        break;
                    case score >= 40 && score < 60:
                        remark = "Average";
                        color = "text-secondary";
                        break;
                    case score < 40:
                        remark = "Failed";
                        color = "text-danger";
                        break;
                    default:
                        break;
                }

                return {percentage: `${score}%`, remark: remark, color: color}
            }
        }
    }
</script>