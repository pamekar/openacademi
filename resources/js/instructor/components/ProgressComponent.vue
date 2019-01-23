<template>
    <div class="progress rounded-0">
        <div :class="'progress-bar bg-'+getLessonsProgress(course).color" role="progressbar" :style="'width:'+getLessonsProgress(course).score+'%'" :aria-valuenow="course.completed_lessons" aria-valuemin="0" :aria-valuemax="course.total_lessons"></div>
    </div>
</template>
<script>
    export default {
        props:{
            course: Object
        },
        methods:{
            getLessonsProgress(course) {
                let completed = course.completed_lessons;
                let total = course.total_lessons;
                let progress = (completed / total) * 100;
                let color = "warning";

                if (progress >= 100) {
                    progress = 100;
                    color = "success";
                } else if (progress >= 70 && progress <= 100) {
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