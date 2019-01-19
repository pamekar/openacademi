<template>
    <ul class="card list-group list-group-fit">
        <li class="list-group-item" v-for="(lesson, index) in lessons">
            <div class="media">
                <div class="media-left">
                    <div class="text-muted">{{index+1}}.</div>
                </div>
                <div class="media-body">
                    <router-link :to="{name:'lesson',params:{'slug':lesson.slug}}" v-if="purchased || lesson.free_lesson">{{lesson.title}}</router-link>
                    <div class="text-muted-light" v-if="!purchased && !lesson.free_lesson">{{lesson.title}}</div>
                </div>
                <div class="media-right">
                    <small class="text-muted-light" v-if="purchased || lesson.free_lesson">{{Math.floor(lesson.duration/60)}}:{{Math.floor(lesson.duration%60)}}</small>
                    <small class="badge badge-primary" v-if="!purchased && !lesson.free_lesson">PRO</small>
                </div>
            </div>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            lessons: Array,
            purchased: Boolean
        }
    }
</script>