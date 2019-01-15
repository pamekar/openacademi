<template>
    <div :class="courseWidth">
        <div class="card ">
            <div class="card-header text-center">
                <h4 class="card-title mb-0"><a href="#">{{ course.title }}</a></h4>
                <div class="rating">
                    <i class="material-icons">star</i>
                    <i class="material-icons">star</i>
                    <i class="material-icons">star</i>
                    <i class="material-icons">star</i>
                    <i class="material-icons">star_border</i>
                </div>
            </div>
            <a href="#">
                <img :src="course.course_image" :alt="course.title" style="width:100%;">
            </a>
            <div class="card-body">
                <small class="text-muted">ADVANCED</small>
                <br>
                {{ course.summary }}<br>
                <span class="badge badge-primary ">VUEJS</span>
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
        //props:['course'];
        props: {
            course: Object,
            courseWidth: String
        }
    }
</script>