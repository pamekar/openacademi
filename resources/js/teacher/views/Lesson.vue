<template>
    <div>
        <vue-headful
                :title="pageTitle + ' | OpenAcademi'"
                :description="lesson.short_text"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="[{title: 'Dashboard', link: 'dashboard'},{title: 'Courses', link: 'show-courses'},{title: course.title, link: 'view-course', params: {id:course.id}},{title: pageTitle}]"
                :title="pageTitle"
                :button="{title:'Edit',link:'edit-lesson',params:{id:lesson.id},class:'btn btn-info'}"
        ></breadcrumb-component>

        <div class="row">
            <div class="col-md-8">

                <div class="card">
                    <div>
                        <img :src="lesson.lesson_image" :alt="lesson.slug" width="100%" v-if="lesson.lesson_image_type == 'image'"/>
                    </div>
                    <div class="embed-responsive embed-responsive-16by9" v-if="lesson.lesson_image_type == 'video'">
                        <iframe class="embed-responsive-item" :src="lesson.lesson_image" allowfullscreen=""></iframe>
                    </div>
                    <div class="card-body" v-html="lesson.full_text"></div>
                </div>
            </div>
            <div class="col-md-4">
                <!-- Lessons -->
                <lessons-list-component :lessons="course.lessons"></lessons-list-component>
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Ratings</h4>
                    </div>
                    <div class="card-body">
                        <div>
                            <star-rating :rating="Number(course.rating.split(';')[0])" :increment="0.01" :read-only="true" :star-size="24"></star-rating>
                        </div>
                        <small class="text-muted">{{course.rating.split(';')[1]}} ratings</small>
                    </div>
                </div>
                <div class="card">
                    <ul class="list-group list-group-fit">
                        <li class="list-group-item">
                            <div class="media align-items-center">
                                <div class="media-left">
                                    <i class="material-icons text-muted-light">schedule</i>
                                </div>
                                <div class="media-body">
                                    Duration
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="media align-items-center">
                                <div class="media-left">
                                </div>
                                <div class="media-body">

                                    {{Math.floor(lesson.duration / 3600)}}
                                    <small class="text-muted">hrs</small>
                                    {{Math.floor((lesson.duration % 3600) / 60)}}
                                    <small class="text-muted">min</small>
                                    {{Math.floor((lesson.duration % 3600) / 60)}}
                                    <small class="text-muted">sec</small>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex';
    import LessonsListComponent from '../components/LessonsShortListComponent.vue';

    export default {
        data() {
            return {
                purchased: ""
            }
        },
        created() {
            this.$store.dispatch('lessons/fetch', this.$route.params.id);
            //
        },
        mounted() {
            this.setDefaults();
        },
        components: {
            'lessons-list-component': LessonsListComponent,
        },
        methods:    {},
        computed:   {
            ...mapState(
                {
                    lesson:    state => state.lessons.lesson,
                    course:    state => state.lessons.course,
                    pageTitle: state => state.lessons.pageTitle,
                })
        },
        watch:      {
            '$route'(to, from) {
                // react to route changes...
                this.$store.dispatch('lessons/fetch', this.$route.params.id);
            }
        }
    }
</script>
