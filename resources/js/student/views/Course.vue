<template>
    <div>
        <vue-headful
                :title="pageTitle + ' - OpenAcademi'"
                :description="course.summary"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
        ></breadcrumb-component>

        <div class="row">
            <div class="col-md-8">

                <div class="card">
                    <div>
                        <img :src="course.course_image_main" :alt="course.slug" width="100%"  v-if="course.course_image_type == 'image'"/>
                    </div>
                    <div class="embed-responsive embed-responsive-16by9" v-if="course.course_image_type == 'video'">
                        <iframe class="embed-responsive-item" :src="course.course_image_main" allowfullscreen=""></iframe>
                    </div>
                    <div class="card-body">
                        {{course.description}}
                    </div>
                </div>

                <!-- Lessons -->
                <lessons-list-component :lessons="course.published_lessons" :purchased="purchased" :id="course.id"></lessons-list-component>
            </div>
            <div class="col-md-4">
                <div class="card" v-if="!purchased">
                    <div class="card-body text-center">
                        <p>
                            <a :href="'/course/payment/initialize/'+course.slug" class="btn btn-success btn-block flex-column">
                                Purchase this course
                                <strong>&#8358; {{course.price.toLocaleString('en', {maximumSignificantDigits: 2})}}</strong>
                            </a>
                        </p>
                    </div>
                </div>
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
                                    <i class="material-icons text-muted-light">assessment</i>
                                </div>
                                <div class="media-body">
                                    {{course.course_cat}}
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <div class="media align-items-center">
                                <div class="media-left">
                                    <i class="material-icons text-muted-light">schedule</i>
                                </div>
                                <div class="media-body">

                                    {{Math.floor(course.duration / 3600)}}
                                    <small class="text-muted">hrs</small> &nbsp; {{course.duration % 60}}
                                    <small class="text-muted">min</small>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="card">
                    <div class="card-header">
                        <div class="media align-items-center">
                            <div class="media-left">
                                <img src="assets/images/people/110/guy-6.jpg" alt="About Adrian" width="50" class="rounded-circle">
                            </div>
                            <div class="media-body">
                                <h4 class="card-title"><a href="fixed-student-profile.html">Adrian Demian</a></h4>
                                <p class="card-subtitle">Instructor</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <p>Having over 12 years exp. Adrian is one of the lead UI designers in the industry Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, aut.</p>
                        <a href="" class="btn btn-default">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a href="" class="btn btn-default">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a href="" class="btn btn-default"><i class="fab fa-github"></i></a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import LessonsListComponent from '../components/LessonsListComponent.vue'

    export default {
        data() {
            return {
                course:          [],
                courseListWidth: "col-lg-3 col-md-4, col-sm-6",
                breadcrumbs:     [
                    {
                        title: "Dashboard", link: 'dashboard'
                    },
                    {
                        title: "Courses", link:'all-courses'
                    },
                    {
                        title: ""
                    }
                ],
                pageTitle:       "Courses",
                purchased:  ""
            }
        },
        created() {
            this.getCourse();
        },
        mounted() {
            console.log('Dashboard Component mounted now.')
        },
        components: {
            'lessons-list-component': LessonsListComponent
        },
        methods:    {
            getCourse() {
                axios.get("/api/course/" + this.$route.params.slug)
                    .then(({data}) => {
                        this.course = data.course;
                        this.pageTitle=data.course.title;
                        this.purchased=data.purchased;
                        this.breadcrumbs[2].title = data.course.title;
                    });
            },
        },
        props:      ['slug'],
        computed:   {}
    }
</script>
