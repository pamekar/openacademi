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
                    <div>
                        <img :src="lesson.lesson_image" :alt="lesson.slug" width="100%" v-if="lesson.lesson_image_type == 'image'"/>
                    </div>
                    <div class="embed-responsive embed-responsive-16by9" v-if="lesson.lesson_image_type == 'video'">
                        <iframe class="embed-responsive-item" :src="lesson.lesson_image" allowfullscreen=""></iframe>
                    </div>
                    <div class="card-body" v-html="lesson.full_text"></div>
                </div>
                <div class="card" v-if="lesson.media.length>0">
                    <div class="card-header">
                        <h4 class="card-title">Lesson Materials</h4>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Size</th>
                                    <th class="text-center">?</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(file,index) in lesson.media">
                                    <td class="text-muted">{{index + 1}}</td>
                                    <td><a :href="'/uploads/'+file.id+'/'+file.file_name">{{file.file_name}}</a></td>
                                    <td class="text-muted">{{file.size}} KB</td>
                                    <td class="text-center">
                                        <a :href="'/uploads/'+file.id+'/'+file.file_name" class="btn btn-sm btn-outline-primary" :title="`Download ${file.file_name}`"><i class="material-icons">file_download</i>
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
                <!-- Lessons -->
                <div class="card" v-if="purchased">
                    <div class="card-body">
                        <progress-component :course="course"></progress-component>
                        <small class="text-muted">Lessons: {{course.completed_lessons}} of {{course.total_lessons}}</small>
                    </div>
                </div>
                <lessons-list-component :lessons="course.published_lessons" :purchased="purchased" :id="course.id"></lessons-list-component>
                <div class="card" v-if="purchased && lesson.test">
                    <div class="card-header">
                        <h4 class="card-title">Quiz</h4>
                    </div>
                    <div class="card-body" v-for="test in lesson.tests">
                        <h3>{{test.title}}</h3>
                        <p>{{test.about_quiz}}</p>
                        <p class="text-muted"> {{quizDuration(test)}}</p>
                        <div class="text-center">
                            <router-link :to="{name:'quiz',params:{id:test.id,slug:lesson.slug}}" class="btn btn-success">Take Quiz</router-link>
                        </div>
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
                                <img :src="$public_+'/assets/images/people/110/guy-6.jpg'" alt="About Adrian" width="50" class="rounded-circle">
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
    import ProgressComponent from '../components/ProgressComponent.vue'

    export default {
        data() {
            return {
                lesson:      [],
                course:      [],
                breadcrumbs: [
                    {
                        title: "Dashboard", link: 'dashboard'
                    },
                    {
                        title: "Courses", link: 'all-courses'
                    },
                    {
                        title: "", link: 'course', params: {}
                    },
                    {
                        title: ""
                    }
                ],
                pageTitle:   "Courses",
                purchased:   ""
            }
        },
        created() {
            this.getLesson();
        },
        mounted() {
        },
        components: {
            'lessons-list-component': LessonsListComponent,
            'progress-component':     ProgressComponent
        },
        methods:    {
            getLesson() {
                axios.get("/api/lesson/" + this.$route.params.id + "/" + this.$route.params.slug)
                    .then(({data}) => {
                        this.lesson = data.lesson;
                        this.course = data.course;
                        this.pageTitle = data.lesson.title;
                        this.purchased = data.purchased_course;
                        this.breadcrumbs[2].title = data.course.title;
                        this.breadcrumbs[2].params = {slug: data.course.slug};
                        this.breadcrumbs[3].title = data.lesson.title;
                    });
            },
        },
        computed:   {
            quizDuration: function () {
                let duration = this.lesson.test.duration;
                
                let HH = Math.floor(duration / 3600);
                let mm = Math.floor((duration % 3600) / 60);
                let ss = Math.floor(duration % 60);
                
                return `${HH} hr ${mm} min ${ss} sec`;
            }
        },
        props:      ['slug'],
        watch:      {
            '$route'(to, from) {
                // react to route changes...
                this.getLesson();
            }
        }
    }
</script>
