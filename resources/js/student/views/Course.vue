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
                        <img :src="course.course_image" :alt="course.slug" width="100%"  />
                    </div>
                    <div class="embed-responsive embed-responsive-16by9" v-if="course.course_image_type == 'video'">
                        <iframe class="embed-responsive-item" :src="course.course_image" allowfullscreen=""></iframe>
                    </div>
                    <div class="card-body" v-html="course.description"></div>
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
                                <img :src="public_+'/assets/images/people/110/guy-6.jpg'" alt="About Adrian" width="50" class="rounded-circle">
                            </div>
                            <div class="media-body">
                                <h4 class="card-title"><a href="javascript:void(0)">{{course.instructor.first_name+" "+course.instructor.last_name}}</a></h4>
                                <p class="card-subtitle">INSTRUCTOR</p>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <p>{{course.instructor.description}}</p>
                        <a :href="'http://facebook.com/'+course.instructor.facebook" class="btn btn-default">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a :href="'http://instagram.com/'+course.instructor.instagram" class="btn btn-default">
                            <i class="fab fa-facebook"></i>
                        </a>
                        <a :href="'http://twitter.com/'+course.instructor.twitter" class="btn btn-default">
                            <i class="fab fa-twitter"></i>
                        </a>
                        <a :href="'http://linkein.com/in/'+course.instructor.linkedin" class="btn btn-default"><i class="fab fa-linkedin"></i></a>
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
