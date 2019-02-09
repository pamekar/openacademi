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
                        <button class="btn btn-outline-warning btn-sm" @click="deleteLesson(lesson.id,lesson.course_id)"><i class="material-icons">close</i></button>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        methods: {
            deleteLesson(id, course) {
                this.$store.dispatch('lessons/delete_lessons', id, course);
            },

        },
        props:   {
            lessons: Array
        }
    }
</script>

