<template>
    <div class="container page__container">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item active">Dashboard</li>
        </ol>
        <h1 class="h2">Dashboard</h1>

        <div class="row">
            <div class="col-lg-8 col-md-7">
                <div class="card">
                    <div class="card-header">
                        <div class="media align-items-center">
                            <div class="media-body">
                                <h4 class="card-title">Courses</h4>
                                <p class="card-subtitle">Your recent courses</p>
                            </div>
                            <div class="media-right">
                                <a class="btn btn-sm btn-primary" href="#">My
                                    courses</a>
                            </div>
                        </div>
                    </div>


                    <ul class="list-group list-group-fit mb-0" style="z-index: initial;">

                        <li class="list-group-item" style="z-index: initial;" v-for="course in purchasedCourses">
                            <div class="d-flex align-items-center">
                                <a href="#"
                                   class="avatar avatar-4by3 avatar-sm mr-3">
                                    <img :src="course.course_image" width="64" height="40" alt="course"
                                         class="avatar-img rounded">
                                </a>
                                <div class="flex">
                                    <a href="#" class="text-body"><strong>{{ course.title }}</strong></a>
                                    <div class="d-flex align-items-center">
                                        <div class="progress" style="width: 100px;">
                                            <div :class="'progress-bar bg-'+getLessonsProgress(course.completed_lessons,course.total_lessons).color" role="progressbar"
                                                 :style="'width:'+getLessonsProgress(course.completed_lessons,course.total_lessons).score+'%'" :aria-valuenow="course.completed_lessons" aria-valuemin="0"
                                                 :aria-valuemax="course.total_lessons"></div>
                                        </div>
                                        <small class="text-muted ml-2">{{getLessonsProgress(course.completed_lessons, course.total_lessons).score}}%</small>
                                    </div>
                                </div>
                                <div class="dropdown ml-3">
                                    <a href="#" class="dropdown-toggle text-muted" data-caret="false"
                                       data-toggle="dropdown">
                                        <i class="material-icons">more_vert</i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <a class="dropdown-item"
                                           href="#">Continue</a>
                                    </div>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
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

                        <li class="list-group-item">
                            <div class="media align-items-center">
                                <div class="media-body">
                                    <a class="text-body" href="#"><strong>Title of
                                        quiz goes here?</strong></a><br>
                                    <div class="d-flex align-items-center">
                                        <small class="text-black-50 text-uppercase mr-2">Course</small>
                                        <a href="#">Basics of HTML</a>
                                    </div>
                                </div>
                                <div class="media-right text-center d-flex align-items-center">
                                    <span class="text-black-50 mr-3">Good</span>
                                    <h4 class="mb-0">5.8</h4>
                                </div>
                            </div>
                        </li>

                        <li class="list-group-item">
                            <div class="media align-items-center">
                                <div class="media-body">
                                    <a class="text-body" href="#"><strong>Directives
                                        &amp; Routing</strong></a><br>
                                    <div class="d-flex align-items-center">
                                        <small class="text-black-50 text-uppercase mr-2">Course</small>
                                        <a href="#">Angular in Steps</a>
                                    </div>
                                </div>
                                <div class="media-right text-center d-flex align-items-center">
                                    <span class="text-black-50 mr-3">Great</span>
                                    <h4 class="mb-0 text-success">9.8</h4>
                                </div>
                            </div>
                        </li>

                        <li class="list-group-item">
                            <div class="media align-items-center">
                                <div class="media-body">
                                    <a class="text-body" href="#"><strong>Responsive
                                        &amp; Retina</strong></a><br>
                                    <div class="d-flex align-items-center">
                                        <small class="text-black-50 text-uppercase mr-2">Course</small>
                                        <a href="#">Bootstrap Foundations</a>
                                    </div>
                                </div>
                                <div class="media-right text-center d-flex align-items-center">
                                    <span class="text-black-50 mr-3">Failed</span>
                                    <h4 class="mb-0 text-danger">2.8</h4>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
            <div class="col-lg-8 col-md-7">

            </div>
        </div>

    </div>

</template>

<script>
    export default {
        data() {
            return {
                purchasedCourses: [],
            };
        },

        created() {
            this.getPurchasedCourses();
        },

        methods: {
            // drg >> fetch purchased courses
            getPurchasedCourses(page = 1) {
                window.axios.get("api/courses/purchased")
                    .then(({data}) => {
                        this.purchasedCourses = data.courses;
                    });
            },
            getLessonsProgress(completed, total) {
                let progress = (completed / total) * 100;
                let color = "warning";

                if (progress > 100) {
                    progress = 100;
                    color = "success";
                } else if (progress > 70 && progress < 100) {
                    color = "primary";
                } else if (progress > 30 && progress < 70) {
                    color = "info";

                }

                return {score: progress, color: color};
            },
            getProgressColor() {
                let colors = [
                    "primary",
                    "success",
                    "info",
                    "warning",
                    "danger"
                ];

                let randomColor = colors[Math.floor(Math.random() * colors.length)];
                return randomColor;
            }
        },
        mounted() {
            console.log('Component mounted now.')
        }
    }
</script>
