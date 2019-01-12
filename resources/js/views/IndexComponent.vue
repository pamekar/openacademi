<template>
    <div class="container page__container">
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item active">Dashboard</li>
        </ol>
        <h1 class="h2">Dashboard</h1>

        <div class="card border-left-3 border-left-primary card-2by1">
            <div class="card-body">
                <div class="media flex-wrap align-items-center">
                    <div class="media-left">
                        <i class="material-icons text-muted-light">credit_card</i>
                    </div>
                    <div class="media-body" style="min-width: 180px">
                        Your subscription ends on <strong>25 February 2015</strong>
                    </div>
                    <div class="media-right mt-2 mt-xs-plus-0">
                        <a class="btn btn-success" href="#">Upgrade</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
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

                        <li class="list-group-item" style="z-index: initial;">
                            <div class="d-flex align-items-center">
                                <a href="#"
                                   class="avatar avatar-4by3 avatar-sm mr-3">
                                    <img src=" $public/assets/images/gulp.png" alt="course"
                                    class="avatar-img rounded">
                                </a>
                                <div class="flex">
                                    <a href="#" class="text-body"><strong>Learn
                                        Vue.js Fundamentals</strong></a>
                                    <div class="d-flex align-items-center">
                                        <div class="progress" style="width: 100px;">
                                            <div class="progress-bar bg-primary" role="progressbar"
                                                 style="width: 25%" aria-valuenow="25" aria-valuemin="0"
                                                 aria-valuemax="100"></div>
                                        </div>
                                        <small class="text-muted ml-2">25%</small>
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

                        <li class="list-group-item" style="z-index: initial;">
                            <div class="d-flex align-items-center">
                                <a href="#"
                                   class="avatar avatar-4by3 avatar-sm mr-3">
                                    <img src=" $public/assets/images/vuejs.png" alt="course"
                                    class="avatar-img rounded">
                                </a>
                                <div class="flex">
                                    <a href="#" class="text-body"><strong>Angular
                                        in Steps</strong></a>
                                    <div class="d-flex align-items-center">
                                        <div class="progress" style="width: 100px;">
                                            <div class="progress-bar bg-success" role="progressbar"
                                                 style="width: 100%" aria-valuenow="100" aria-valuemin="0"
                                                 aria-valuemax="100"></div>
                                        </div>
                                        <small class="text-muted ml-2">100%</small>
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

                        <li class="list-group-item" style="z-index: initial;">
                            <div class="d-flex align-items-center">
                                <a href="#"
                                   class="avatar avatar-4by3 avatar-sm mr-3">
                                    <img src=" $public/assets/images/nodejs.png" alt="course"
                                    class="avatar-img rounded">
                                </a>
                                <div class="flex">
                                    <a href="#" class="text-body"><strong>Bootstrap
                                        Foundations</strong></a>
                                    <div class="d-flex align-items-center">
                                        <div class="progress" style="width: 100px;">
                                            <div class="progress-bar bg-warning" role="progressbar"
                                                 style="width: 80%" aria-valuenow="80" aria-valuemin="0"
                                                 aria-valuemax="100"></div>
                                        </div>
                                        <small class="text-muted ml-2">80%</small>
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
        </div>

    </div>

</template>

<script>
    export default {
        mounted() {
            console.log('Component mounted now.')
        }
    }
</script>
