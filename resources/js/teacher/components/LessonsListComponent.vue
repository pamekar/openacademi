<template>
    <ul class="nestable-list">
        <li class="nestable-item nestable-item-handle" :data-id="index+1" v-for="(lesson,index) in lessons">
            <div class="nestable-handle"><i class="material-icons">menu</i></div>
            <div class="nestable-content">
                <div class="media align-items-center">
                    <div class="media-left">
                        <img :src="lesson.lesson_image_preview" alt="" width="100" class="rounded">
                    </div>
                    <div class="media-body">
                        <h5 class="card-title h6 mb-0">
                            <router-link :to="{name:'view-lesson', params:{'id':lesson.id}}">{{lesson.title}}</router-link>
                        </h5>
                        <small class="text-muted">updated {{lesson.last_updated}}</small>
                    </div>
                    <div class="media-right">
                        <router-link :to="{name:'edit-lesson', params:{'id':lesson.id}}" class="btn btn-outline-info btn-sm"><i class="material-icons">edit</i></router-link>
                        <a href="javascript:void(0)" class="btn btn-outline-danger btn-sm" @click="deleteLesson(lesson.id)"><i class="material-icons">close</i></a>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        methods: {
            deleteLesson(id) {
                this.$store.dispatch('lessons/delete_lessons', id);
                this.$store.dispatch('courses/fetch', this.$route.params.id);
            },

        },
        props:   {
            lessons: Array
        }
    }
</script>

