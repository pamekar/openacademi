<template>
    <div class="card">
        <div class="card-header">
            <h4 class="card-title">Lessons</h4>
        </div>
        <ul class="card-body list-group list-group-fit">
            <li class="list-group-item" v-for="(lesson, index) in lessons">
                <div class="media">
                    <div class="media-left">
                        <div class="text-muted">{{index + 1}}.</div>
                    </div>
                    <div class="media-body">
                        <router-link :to="{name:'view-lesson',params:{'id':lesson.id}}">{{lesson.title}}</router-link>
                    </div>
                    <div class="media-right">
                        <small class="text-muted-light">{{Math.floor(lesson.duration / 60)}}:{{Math.floor(lesson.duration % 60)}}</small>
                        <small class="badge badge-primary" v-if="!lesson.free_lesson">PRO</small>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            lessons: Array,
        }
    }
</script>