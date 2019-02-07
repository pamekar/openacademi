<template>
    <div class="col-md-6">
        <div class="card">
            <div class="card-body">

                <div class="d-flex flex-column flex-sm-row">
                    <router-link :to="{name:'view-course', params:{'id':course.id}}" class="avatar avatar-lg avatar-4by3 mb-3 w-xs-plus-down-100 mr-sm-3">
                        <img :src="course.course_image_preview" alt="Card image cap" class="avatar-img rounded">
                    </router-link>
                    <div class="flex" style="min-width: 200px;">
                        <!-- <h5 class="card-title text-base m-0"><a href="instructor-course-edit.html"><strong>Learn Vue.js</strong></a></h5> -->
                        <h4 class="card-title mb-1">
                            <router-link :to="{name:'view-course', params:{'id':course.id}}">{{course.title}}</router-link>
                        </h4>
                        <p class="text-black-70">{{course.summary}}</p>
                        <div class="d-flex align-items-end">
                            <div class="d-flex flex flex-column mr-3">

                                <star-rating :rating="Number(course.rating.split(';')[0])" :increment="0.01" :read-only="true" :star-size="18"></star-rating>
                                <div class="d-flex align-items-center py-1 border-bottom">
                                    <small class="text-black-70 mr-2">&dollar;1,230/mo</small>
                                    <small class="text-black-50">34 SALES</small>
                                </div>
                                <div class="d-flex align-items-center py-1">
                                    <small class="badge badge-secondary mr-2" v-for="tag in tags" :key="tag">{{tag}}</small>
                                </div>
                            </div>
                            <div class="text-center">
                                <router-link :to="{name:'edit-course', params:{'id':course.id}}" class="btn btn-sm btn-white">Edit</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card__options dropdown right-0 pr-2">
                <a href="#" class="dropdown-toggle text-muted" data-caret="false" data-toggle="dropdown">
                    <i class="material-icons">more_vert</i>
                </a>
                <div class="dropdown-menu dropdown-menu-right">
                    <router-link class="dropdown-item" :to="{name:'edit-course', params:{'id':course.id}}">Edit course</router-link>
                    <router-link class="dropdown-item" :to="{name:'view-course', params:{'id':course.id}}">Course Insights</router-link>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item text-danger" href="#" @click="deleteCourse(course.id)">Delete course</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            deleteCourse(id) {
                this.$store.dispatch('courses/delete', id);
                this.$store.dispatch('courses/fetch_all');
            },
        },
        props:   {
            course: Object,
            tags:   Array
        }
    }
</script>

