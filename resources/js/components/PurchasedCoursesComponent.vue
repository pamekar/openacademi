<template>
    <div class="col-md-6">
        <div class="card">
            <div class="card-header">
                <div class="media">
                    <div class="media-left">
                        <a href="#">
                            <img :src="course.course_image" style="width:80px; max-height: 60px;" :alt="course.title" class="rounded">
                        </a>
                    </div>
                    <div class="media-body">
                        <h4 class="card-title m-0"><a href="#">{{course.title}}</a></h4>
                        <small class="text-muted">Lessons: {{course.completed_lessons}} of {{course.total_lessons}}</small>
                    </div>
                </div>
            </div>
            <progress-component></progress-component>
            <div class="card-footer bg-white">
                <a href="#" class="btn btn-primary btn-sm">Continue <i class="material-icons btn__icon--right">play_circle_outline</i></a>
            </div>
        </div>

    </div>
</template>

<script>
    export default {

        data() {
            return {
                acourse: [],
            };
        },
        props: {
            course: Object,
        },
        methods: {
            // drg >> compute lesson progress
            getLessonsProgress(course) {
                let completed = course.completed_lessons;
                let total = course.total_lessons;
                let progress = (completed / total) * 100;
                let color = "warning";

                if (progress > 100) {
                    progress = 100;
                    color = "success";
                } else if (progress >= 70 && progress < 100) {
                    color = "primary";
                } else if (progress >= 50 && progress < 70) {
                    color = "info";
                } else if (progress >= 30 && progress < 50) {
                    color = "secondary";
                }

                return {score: progress, color: color};
            },
        }
    }
</script>