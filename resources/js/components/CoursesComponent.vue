<template>
    <div :class="courseWidth">
        <div class="card ">
            <div class="card-header text-center">
                <h4 class="card-title mb-0">
                    <router-link :to="{name:'course',params:{'slug':course.slug}}">{{ course.title }}</router-link>
                </h4>
                <div class="text-center">
                    <star-rating :rating="Number(course.rating)" :increment="0.01" :read-only="true" :star-size="18" style="margin: auto"></star-rating>
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
        props: {
            course:      Object,
            courseWidth: String
        }
    }
</script>

<style>
    .vue-star-rating {
        margin: auto;
    }
</style>

