<template>
    <div>
        <vue-headful
                :title="pageTitle + ' | OpenAcademi'"
                :description="course.summary"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
        ></breadcrumb-component>

        <div class="row">
            <div class="col-md-8">

                <div class="card">
                    <div v-if="course.course_image_type == 'image'">
                        <img :src="course.course_image" :alt="course.slug" width="100%"/>
                    </div>
                    <div class="embed-responsive embed-responsive-16by9" v-if="course.course_image_type == 'video'">
                        <iframe class="embed-responsive-item" :src="course.course_image_main" allowfullscreen=""></iframe>
                    </div>
                    <div class="card-body" v-html="course.description"></div>
                </div>

                <!-- Lessons -->
                <lessons-list-component :lessons="course.lessons"></lessons-list-component>
            </div>
            <div class="col-md-4">
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
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex';
    import LessonsListComponent from '../components/LessonsShortListComponent.vue'

    export default {
        data() {
            return {
                breadcrumbs:     [
                    {
                        title: "Dashboard", link: 'dashboard'
                    },
                    {
                        title: "Courses", link: 'show-courses'
                    },
                    {
                        title: ""
                    }
                ],
                purchased:       ""
            }
        },
        created() {
            this.$store.dispatch('courses/fetch', this.$route.params.id);
        },
        mounted() {
        },
        components: {
            'lessons-list-component': LessonsListComponent
        },
        methods:    {
        },
        props:      ['slug'],
        computed:   {
            ...mapState(
                {
                    course:    state => state.courses.course,
                    pageTitle: state => state.courses.pageTitle,
                })
        }
    }
</script>
