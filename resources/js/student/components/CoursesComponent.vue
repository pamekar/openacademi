<template>
    <div :class="courseWidth">
        <div class="card ">
            <div class="card-header text-center">
                <h4 class="card-title mb-0">
                    <router-link :to="{name:'course',params:{'slug':course.slug}}">{{ course.title }}</router-link>
                </h4>
                <div class="text-center">
                    <star-rating :rating="Number(course.rating.split(';')[0])" :increment="0.01" :read-only="true" :star-size="18"></star-rating>
                </div>
            </div>

            <span class="course-price">&#8358;{{course.price.toLocaleString('en', {maximumSignificantDigits: 2})}}</span>
            <router-link :to="{name:'course',params:{'slug':course.slug}}">
                <img :src="course.course_image" :alt="course.title" style="width:100%;">
            </router-link>

            <div class="card-body">
                <small class="text-muted">{{course.course_cat}}</small>
                <br>
                {{ course.summary }}<br>
                <router-link :to="{name:'tag-courses',params:{'tag':tag}}" v-for="tag in tags" :key="tag">
                    <span class="badge badge-primary mr-1" >
                    {{tag}}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            course:      Object,
            courseWidth: String,
            tags:        Array
        }
    }
</script>

<style>
    .vue-star-rating {
        margin: auto;
    }
</style>

