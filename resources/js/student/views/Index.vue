<template>
    <div>
        <vue-headful
                :title="pageTitle + ' | OpenAcademi'"
                :description="pageTitle"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
        ></breadcrumb-component>

        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        <div class="media align-items-center">
                            <div class="media-body">
                                <h4 class="card-title">My Courses</h4>
                                <p class="card-subtitle">Your recent courses</p>
                            </div>
                            <div class="media-right">
                                <router-link :to="{name:'purchased-courses'}" class="btn btn-sm btn-primary">View more</router-link>
                            </div>
                        </div>
                    </div>


                    <ul class="list-group list-group-fit mb-0" style="z-index: initial;">

                        <li class="list-group-item" style="z-index: initial;" v-for="course in purchasedCourses">
                            <div class="d-flex align-items-center">
                                <router-link :to="{name:'course',params:{'slug':course.slug}}" class="avatar avatar-4by3 avatar-sm mr-3">
                                    <img :src="course.course_image_preview" width="64" height="40" :alt="course.title"
                                         class="avatar-img rounded">
                                </router-link>
                                <div class="flex">
                                    <router-link :to="{name:'course',params:{'slug':course.slug}}" class="text-body"><strong>{{ course.title }}</strong></router-link>
                                    <div class="d-flex align-items-center">
                                        <div class="progress" style="width: 100px;">
                                            <div :class="'progress-bar bg-'+getLessonsProgress(course).color" role="progressbar"
                                                 :style="'width:'+getLessonsProgress(course).score+'%'" :aria-valuenow="course.completed_lessons" aria-valuemin="0"
                                                 :aria-valuemax="course.total_lessons"></div>
                                        </div>
                                        <small class="text-muted ml-2">{{getLessonsProgress(course).score}}%</small>
                                    </div>
                                </div>
                                <div class="dropdown ml-3">
                                    <a href="#" class="dropdown-toggle text-muted" data-caret="false"
                                       data-toggle="dropdown">
                                        <i class="material-icons">more_vert</i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <router-link :to="{name:'course',params:{'slug':course.slug}}" class="dropdown-item">Continue</router-link>
                                    </div>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="col-md-6">

                <div class="card">
                    <div class="card-header">
                        <div class="media align-items-center">
                            <div class="media-body">
                                <h4 class="card-title">Quizzes</h4>
                                <p class="card-subtitle">Your Performance</p>
                            </div>
                            <div class="media-right">
                                <a class="btn btn-sm btn-primary" href="#">Quiz results</a>
                            </div>
                        </div>
                    </div>
                    <ul class="list-group list-group-fit mb-0">
                        <li class="list-group-item" v-for="quiz in quizes">
                            <div class="media align-items-center">
                                <div class="media-body">
                                    <a class="text-body" href="#"><strong>{{quiz.test.title}}</strong></a><br>
                                    <div class="d-flex align-items-center">
                                        <small class="text-black-50 text-uppercase mr-2">Course</small>
                                        <router-link :to="{name:'course',params:{'slug':quiz.test.course.slug}}">{{quiz.test.course_title}}</router-link>
                                    </div>
                                </div>
                                <div class="media-right text-center d-flex align-items-center">
                                    <span class="text-black-50 mr-3">{{getScore(quiz).remark}}</span>
                                    <h4 :class="`${getScore(quiz).color} mb-0`">{{getScore(quiz).percentage}}</h4>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">

                <div class="card-header mb-3" style="padding: .75rem 1.25rem;">
                    <div class="media align-items-center">
                        <div class="media-body"><h4 class="card-title">Featured Courses</h4>
                            <p class="card-subtitle">Learn a new course today</p></div>
                        <div class="media-right">
                            <router-link :to="{ name:'all-courses'}" class="btn btn-sm btn-primary">View more</router-link>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <courses-component
                            v-for="course in allCourses"
                            :course="course"
                            courseWidth="col-md-3"
                            :key="course.id"
                    ></courses-component>
                </div>

            </div>
        </div>

    </div>

</template>

<script>
    import Courses from '../components/CoursesComponent.vue'

    export default {
        data() {
            return {
                purchasedCourses: [],
                allCourses:       [],
                breadcrumbs:      [
                    {
                        title: "Dashboard"
                    }
                ],
                pageTitle:        "Dashboard",
                quizes:           []
            };
        },
        components: {
            'courses-component': Courses,
        },
        computed:   {},
        created() {
            this.getPurchasedCourses();
            this.getAllCourses();
            this.getQuizResults();
        },

        methods: {
            // drg >> fetch purchased courses
            getPurchasedCourses(page = 1) {
                axios.get("/api/courses/purchased?count=4&dashboard=1")
                    .then(({data}) => {
                        this.purchasedCourses = data.courses;
                    });
            },
            getAllCourses(page = 1) {
                axios.get("/api/courses/all?count=8&dashboard=1")
                    .then(({data}) => {
                        this.allCourses = data;
                    });
            },
            getQuizResults(page = 1) {
                axios.get("/api/quizes/results?count=4&dashboard=1")
                    .then(({data}) => {
                        this.quizes = data;
                    });
            },
            // drg >> compute lesson progress
            getLessonsProgress(course) {
                let completed = course.completed_lessons;
                let total = course.total_lessons;
                let progress = (completed / total) * 100;
                let color = "warning";

                if (progress >= 100) {
                    progress = 100;
                    color = "success";
                } else if (progress >= 70 && progress < 100) {
                    color = "primary";
                } else if (progress >= 50 && progress < 70) {
                    color = "info";
                } else if (progress >= 30 && progress < 50) {
                    color = "secondary";
                }

                return {score: Math.floor(progress), color: color};
            },
            getScore(quiz) {

                let score = Math.round((quiz.test_result / quiz.total_score) * 100);
                let remark = "";
                let color = "text-muted";
                switch (true) {
                    case score >= 80 && score <= 100:
                        remark = "Great";
                        color = "text-success";
                        break;
                    case score >= 60 && score < 80:
                        remark = "Good";
                        color = "text-secondary";
                        break;
                    case score >= 40 && score < 60:
                        remark = "Average";
                        color = "text-warning";
                        break;
                    case score < 40:
                        remark = "Failed";
                        color = "text-danger";
                        break;
                    default:
                        break;
                }

                return {percentage: `${score}%`, remark: remark, color: color}
            }
        },
        mounted() {

        },
    }
</script>
