<template>
    <div class="mdk-drawer-layout__content page" style="transform: translate3d(0px, 0px, 0px);">
        <vue-headful
                :title="pageTitle + ' | OpenAcademi'"
                :description="pageTitle"
        ></vue-headful>

        <div class="container-fluid page__container">
            <breadcrumb-component
                    :breadcrumbs="breadcrumbs"
                    :title="pageTitle"
            ></breadcrumb-component>
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header d-flex align-items-center">
                            <div class="flex">
                                <h4 class="card-title">Earnings</h4>
                                <p class="card-subtitle">Last 7 Days</p>
                            </div>
                            <a href="instructor-earnings.html" class="btn btn-sm btn-primary"><i class="material-icons">trending_up</i></a>
                        </div>
                        <div class="card-body">
                            <div class="chart" style="height: 200px;">
                                <div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;">
                                    <div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                                        <div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div>
                                    </div>
                                    <div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;">
                                        <div style="position:absolute;width:200%;height:200%;left:0; top:0"></div>
                                    </div>
                                </div>
                                <canvas id="earningsChart" class="chart-canvas chartjs-render-monitor" style="display: block; width: 400px; height: 200px;" width="400" height="200"></canvas>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header d-flex align-items-center">
                            <div class="flex">
                                <h4 class="card-title">Transactions</h4>
                                <p class="card-subtitle">Latest Transactions</p>
                            </div>
                            <a href="instructor-statement.html" class="btn btn-sm btn-primary"><i class="material-icons">receipt</i></a>
                        </div>
                        <div data-toggle="lists" data-lists-values="[
            &quot;js-lists-values-course&quot;,
            &quot;js-lists-values-document&quot;,
            &quot;js-lists-values-amount&quot;,
            &quot;js-lists-values-date&quot;
          ]" data-lists-sort-by="js-lists-values-date" data-lists-sort-desc="true" class="table-responsive">
                            <table class="table table-nowrap m-0">
                                <thead class="thead-light">
                                <tr>
                                    <th colspan="2">
                                        <a href="javascript:void(0)" class="sort" data-sort="js-lists-values-course">Course</a>
                                        <a href="javascript:void(0)" class="sort" data-sort="js-lists-values-document">Document</a>
                                        <a href="javascript:void(0)" class="sort" data-sort="js-lists-values-amount">Amount</a>
                                        <a href="javascript:void(0)" class="sort desc" data-sort="js-lists-values-date">Date</a>
                                    </th>
                                </tr>
                                </thead>
                                <tbody class="list">
                                <tr>
                                    <td>
                                        <div class="media align-items-center">
                                            <a href="instructor-course-edit.html" class="avatar avatar-4by3 avatar-sm mr-3">
                                                <img :src="public_+'/assets/images/gulp.png'" alt="course" class="avatar-img rounded">
                                            </a>
                                            <div class="media-body">
                                                <a class="text-body js-lists-values-course" href="instructor-course-edit.html"><strong>Learn Angular Fundamentals</strong></a><br>
                                                <small class="text-muted mr-1">
                                                    Invoice
                                                    <a href="instructor-invoice.html" style="color: inherit;" class="js-lists-values-document">#8737</a> -
                                                    $<span class="js-lists-values-amount">89</span> USD
                                                </small>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <small class="text-muted text-uppercase js-lists-values-date">15 Nov 2018</small>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="media align-items-center">
                                            <a href="instructor-course-edit.html" class="avatar avatar-4by3 avatar-sm mr-3">
                                                <img :src="public_+'/assets/images/github.png'" alt="course" class="avatar-img rounded">
                                            </a>
                                            <div class="media-body">
                                                <a class="text-body js-lists-values-course" href="instructor-course-edit.html"><strong>Introduction to TypeScript</strong></a><br>
                                                <small class="text-muted mr-1">
                                                    Invoice
                                                    <a href="instructor-invoice.html" style="color: inherit;" class="js-lists-values-document">#8736</a> -
                                                    $<span class="js-lists-values-amount">89</span> USD
                                                </small>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <small class="text-muted text-uppercase js-lists-values-date">14 Nov 2018</small>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="media align-items-center">
                                            <a href="instructor-course-edit.html" class="avatar avatar-4by3 avatar-sm mr-3">
                                                <img :src="public_+'/assets/images/vuejs.png'" alt="course" class="avatar-img rounded">
                                            </a>
                                            <div class="media-body">
                                                <a class="text-body js-lists-values-course" href="instructor-course-edit.html"><strong>Angular Unit Testing</strong></a><br>
                                                <small class="text-muted mr-1">
                                                    Invoice
                                                    <a href="instructor-invoice.html" style="color: inherit;" class="js-lists-values-document">#8735</a> -
                                                    $<span class="js-lists-values-amount">89</span> USD
                                                </small>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <small class="text-muted text-uppercase js-lists-values-date">13 Nov 2018</small>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="media align-items-center">
                                            <a href="instructor-course-edit.html" class="avatar avatar-4by3 avatar-sm mr-3">
                                                <img :src="public_+'/assets/images/vuejs.png'" alt="course" class="avatar-img rounded">
                                            </a>
                                            <div class="media-body">
                                                <a class="text-body js-lists-values-course" href="instructor-course-edit.html"><strong>Angular Routing In-Depth</strong></a><br>
                                                <small class="text-muted mr-1">
                                                    Invoice
                                                    <a href="instructor-invoice.html" style="color: inherit;" class="js-lists-values-document">#8734</a> -
                                                    $<span class="js-lists-values-amount">89</span> USD
                                                </small>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-right">
                                        <small class="text-muted text-uppercase js-lists-values-date">12 Nov 2018</small>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-header d-flex align-items-center">
                            <div class="flex">
                                <h4 class="card-title">Sales today</h4>
                                <p class="card-subtitle">by course</p>
                            </div>
                            <a class="btn btn-sm btn-primary" href="instructor-earnings.html">Earnings</a>
                        </div>
                        <ul class="list-group list-group-fit mb-0">
                            <li class="list-group-item">
                                <div class="media align-items-center">
                                    <div class="media-body">
                                        <a href="instructor-course-edit.html" class="text-body"><strong>Basics of HTML</strong></a>
                                    </div>
                                    <div class="media-right">
                                        <div class="text-center">
                                            <span class="badge badge-pill badge-primary">15</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="media align-items-center">
                                    <div class="media-body">
                                        <a href="instructor-course-edit.html" class="text-body"><strong>Angular in Steps</strong></a>
                                    </div>
                                    <div class="media-right">
                                        <div class="text-center">
                                            <span class="badge badge-pill badge-success">50</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="media align-items-center">
                                    <div class="media-body">
                                        <a href="instructor-course-edit.html" class="text-body"><strong>Bootstrap Foundations</strong></a>
                                    </div>
                                    <div class="media-right">
                                        <div class="text-center">
                                            <span class="badge badge-pill badge-warning">14</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="media align-items-center">
                                    <div class="media-body">
                                        <a href="instructor-course-edit.html" class="text-body"><strong>GitHub Basics</strong></a>
                                    </div>
                                    <div class="media-right">
                                        <div class="text-center">
                                            <span class="badge badge-pill  badge-danger ">14</span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="card">
                        <div class="card-header d-flex align-items-center">
                            <div class="flex">
                                <h4 class="card-title">Comments</h4>
                                <p class="card-subtitle">Latest comments</p>
                            </div>
                            <div class="text-right" style="min-width: 80px;">
                                <a href="#" class="btn btn-outline-primary btn-sm"><i class="material-icons">keyboard_arrow_left</i></a>
                                <a href="#" class="btn btn-outline-primary btn-sm"><i class="material-icons">keyboard_arrow_right</i></a>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="media">
                                <div class="media-left">
                                    <a href="#" class="avatar avatar-sm">
                                        <img :src="public_+'/assets/images/people/110/guy-9.jpg'" alt="Guy" class="avatar-img rounded-circle">
                                    </a>
                                </div>
                                <div class="media-body d-flex flex-column">
                                    <div class="d-flex align-items-center">
                                        <a href="instructor-profile.html" class="text-body"><strong>Laza Bogdan</strong></a>
                                        <small class="ml-auto text-muted">27 min ago</small>
                                        <br>
                                    </div>
                                    <span class="text-muted">on <a href="instructor-course-edit.html" class="text-black-50" style="text-decoration: underline;">Data Visualization With Chart.js</a></span>
                                    <p class="mt-1 mb-0 text-black-70">How can I load Charts on a page?</p>
                                </div>
                            </div>
                            <div class="media ml-sm-32pt mt-3 border rounded p-3 bg-light">
                                <div class="media-left">
                                    <a href="#" class="avatar avatar-sm">
                                        <img :src="public_+'/assets/images/people/110/guy-6.jpg'" alt="Guy" class="avatar-img rounded-circle">
                                    </a>
                                </div>
                                <div class="media-body">
                                    <div class="d-flex align-items-center">
                                        <a href="instructor-profile.html" class="text-body"><strong>FrontendMatter</strong></a>
                                        <small class="ml-auto text-muted">just now</small>
                                    </div>
                                    <p class="mt-1 mb-0 text-black-70">Hi Bogdan,<br> Thank you for purchasing our course! <br><br>Please have a look at the charts library documentation <a href="#">here</a> and follow the instructions.</p>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">
                            <form action="#" id="message-reply">
                                <div class="input-group input-group-merge">
                                    <input type="text" class="form-control form-control-appended" required="" placeholder="Quick Reply">
                                    <div class="input-group-append">
                                        <div class="input-group-text pr-2">
                                            <button class="btn btn-flush" type="button"><i class="material-icons">tag_faces</i></button>
                                        </div>
                                        <div class="input-group-text pl-0">
                                            <div class="custom-file custom-file-naked d-flex" style="width: 24px; overflow: hidden;">
                                                <input type="file" class="custom-file-input" id="customFile">
                                                <label class="custom-file-label" style="color: inherit;" for="customFile">
                                                    <i class="material-icons">attach_file</i>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="input-group-text pl-0">
                                            <button class="btn btn-flush" type="button"><i class="material-icons">send</i></button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
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
                        title: "Home", link: 'home'
                    },
                    {
                        title: "Dashboard"
                    }
                ],
                pageTitle:        "Dashboard"
            };
        },

        created() {
            this.getPurchasedCourses();
            this.getAllCourses();
        },

        methods:    {
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
            // drg >> compute lesson progress
            getLessonsProgress(course) {
                let completed = course.completed_lessons;
                let total = course.total_lessons;
                let progress = (completed / total) * 100;
                let color = "warning";

                if (progress > 100) {
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
        },
        mounted() {

        },
        components: {
            'courses-component': Courses,
        }
    }
</script>
