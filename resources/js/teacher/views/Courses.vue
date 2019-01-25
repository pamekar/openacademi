<template>
    <div>
        <div class="card card-body border-left-3 border-left-primary navbar-shadow mb-4">
            <form action="#">
                <div class="d-flex flex-wrap2 align-items-center mb-headings">
                    <div class="dropdown">
                        <a href="#" data-toggle="dropdown" class="btn btn-white"><i class="material-icons mr-sm-2">tune</i> <span class="d-none d-sm-block">Filters</span></a>
                        <div class="dropdown-menu">
                            <div class="dropdown-item d-flex flex-column">
                                <div class="form-group">
                                    <label for="custom-select" class="form-label">Category</label><br>
                                    <select id="custom-select" class="form-control custom-select" style="width: 200px;">
                                        <option selected>All categories</option>
                                        <option value="1">Vue.js</option>
                                        <option value="2">Node.js</option>
                                        <option value="3">GitHub</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="published01" class="form-label">Published</label><br>
                                    <select id="published01" class="form-control custom-select" style="width: 200px;">
                                        <option selected>Published courses</option>
                                        <option value="1">Draft courses</option>
                                        <option value="3">All courses</option>
                                    </select>
                                </div>
                                <a href="#">Clear filters</a>
                            </div>
                        </div>
                    </div>
                    <div class="flex search-form ml-3 search-form--light">
                        <input type="text" class="form-control" placeholder="Search courses" id="searchSample02">
                        <button class="btn" type="button" role="button"><i class="material-icons">search</i></button>
                    </div>
                </div>

                <div class="d-flex flex-column flex-sm-row align-items-sm-center" style="white-space: nowrap;">
                    <small class="flex text-muted text-uppercase mr-3 mb-2 mb-sm-0">Displaying 4 out of 10 courses</small>
                    <div class="w-auto ml-sm-auto table d-flex align-items-center mb-0">
                        <small class="text-muted text-uppercase mr-3 d-none d-sm-block">Sort by</small>
                        <a href="#" class="sort desc small text-uppercase">Course</a>
                        <a href="#" class="sort small text-uppercase ml-2">Earnings</a>
                        <a href="#" class="sort small text-uppercase ml-2">Sales</a>
                    </div>
                </div>
            </form>
        </div>


        <div class="alert alert-light alert-dismissible border-1 border-left-3 border-left-warning" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div class="text-black-70">Ohh no! No courses to display. Add some courses.</div>
        </div>

        <div class="row">

            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">

                        <div class="d-flex flex-column flex-sm-row">
                            <a href="instructor-course-edit.html" class="avatar avatar-lg avatar-4by3 mb-3 w-xs-plus-down-100 mr-sm-3">
                                <img src="assets/images/vuejs.png" alt="Card image cap" class="avatar-img rounded">
                            </a>
                            <div class="flex" style="min-width: 200px;">
                                <!-- <h5 class="card-title text-base m-0"><a href="instructor-course-edit.html"><strong>Learn Vue.js</strong></a></h5> -->
                                <h4 class="card-title mb-1"><a href="instructor-course-edit.html">Learn Vue.js</a></h4>
                                <p class="text-black-70">Let’s start with a quick tour of Vue’s data binding features.</p>
                                <div class="d-flex align-items-end">
                                    <div class="d-flex flex flex-column mr-3">
                                        <div class="d-flex align-items-center py-1 border-bottom">
                                            <small class="text-black-70 mr-2">&dollar;1,230/mo</small>
                                            <small class="text-black-50">34 SALES</small>
                                        </div>
                                        <div class="d-flex align-items-center py-1">
                                            <small class="text-muted mr-2">GULP</small>
                                            <small class="text-muted">INTERMEDIATE</small>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <a href="instructor-course-edit.html" class="btn btn-sm btn-white">Edit</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card__options dropdown right-0 pr-2">
                        <a href="#" class="dropdown-toggle text-muted" data-caret="false" data-toggle="dropdown">
                            <i class="material-icons">more_vert</i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="instructor-course-edit.html">Edit course</a>
                            <a class="dropdown-item" href="#">Course Insights</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item text-danger" href="#">Delete course</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">

                        <div class="d-flex flex-column flex-sm-row">
                            <a href="instructor-course-edit.html" class="avatar avatar-lg avatar-4by3 mb-3 w-xs-plus-down-100 mr-sm-3">
                                <img src="assets/images/nodejs.png" alt="Card image cap" class="avatar-img rounded">
                            </a>
                            <div class="flex" style="min-width: 200px;">
                                <!-- <h5 class="card-title text-base m-0"><a href="instructor-course-edit.html"><strong>Npm &amp; Gulp Advanced Workflow</strong></a></h5> -->
                                <h4 class="card-title mb-1"><a href="instructor-course-edit.html">Npm &amp; Gulp Advanced Workflow</a></h4>
                                <p class="text-black-70">Learn the basics of Github and become a power Github developer.</p>
                                <div class="d-flex align-items-end">
                                    <div class="d-flex flex flex-column mr-3">
                                        <div class="d-flex align-items-center py-1 border-bottom">
                                            <small class="text-black-70 mr-2">&dollar;421/mo</small>
                                            <small class="text-black-50">12 SALES</small>
                                        </div>
                                        <div class="d-flex align-items-center py-1">
                                            <small class="text-muted mr-2">GULP</small>
                                            <small class="text-muted">INTERMEDIATE</small>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <a href="instructor-course-edit.html" class="btn btn-sm btn-white">Edit</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card__options dropdown right-0 pr-2">
                        <a href="#" class="dropdown-toggle text-muted" data-caret="false" data-toggle="dropdown">
                            <i class="material-icons">more_vert</i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="instructor-course-edit.html">Edit course</a>
                            <a class="dropdown-item" href="#">Course Insights</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item text-danger" href="#">Delete course</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">

                        <div class="d-flex flex-column flex-sm-row">
                            <a href="instructor-course-edit.html" class="avatar avatar-lg avatar-4by3 mb-3 w-xs-plus-down-100 mr-sm-3">
                                <img src="assets/images/github.png" alt="Card image cap" class="avatar-img rounded">
                            </a>
                            <div class="flex" style="min-width: 200px;">
                                <!-- <h5 class="card-title text-base m-0"><a href="instructor-course-edit.html"><strong>Github Webhooks for Beginners</strong></a></h5> -->
                                <h4 class="card-title mb-1"><a href="instructor-course-edit.html">Github Webhooks for Beginners</a></h4>
                                <p class="text-black-70">Developing static website with fast and advanced gulp setup.</p>
                                <div class="d-flex align-items-end">
                                    <div class="d-flex flex flex-column mr-3">
                                        <div class="d-flex align-items-center py-1 border-bottom">
                                            <small class="text-black-70 mr-2">&dollar;2,191/mo</small>
                                            <small class="text-black-50">50 SALES</small>
                                        </div>
                                        <div class="d-flex align-items-center py-1">
                                            <small class="text-muted mr-2">GULP</small>
                                            <small class="text-muted">INTERMEDIATE</small>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <a href="instructor-course-edit.html" class="btn btn-sm btn-white">Edit</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card__options dropdown right-0 pr-2">
                        <a href="#" class="dropdown-toggle text-muted" data-caret="false" data-toggle="dropdown">
                            <i class="material-icons">more_vert</i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="instructor-course-edit.html">Edit course</a>
                            <a class="dropdown-item" href="#">Course Insights</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item text-danger" href="#">Delete course</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">

                        <div class="d-flex flex-column flex-sm-row">
                            <a href="instructor-course-edit.html" class="avatar avatar-lg avatar-4by3 mb-3 w-xs-plus-down-100 mr-sm-3">
                                <img src="assets/images/gulp.png" alt="Card image cap" class="avatar-img rounded">
                            </a>
                            <div class="flex" style="min-width: 200px;">
                                <!-- <h5 class="card-title text-base m-0"><a href="instructor-course-edit.html"><strong>Gulp &amp; Slush Workflows</strong></a></h5> -->
                                <h4 class="card-title mb-1"><a href="instructor-course-edit.html">Gulp &amp; Slush Workflows</a></h4>
                                <p class="text-black-70">Let’s start with a quick tour of Vue’s data binding features.</p>
                                <div class="d-flex align-items-end">
                                    <div class="d-flex flex flex-column mr-3">
                                        <div class="d-flex align-items-center py-1 border-bottom">
                                            <small class="text-black-70 mr-2">&dollar;300/mo</small>
                                            <small class="text-black-50">5 SALES</small>
                                        </div>
                                        <div class="d-flex align-items-center py-1">
                                            <small class="text-muted mr-2">GULP</small>
                                            <small class="text-muted">INTERMEDIATE</small>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <a href="instructor-course-edit.html" class="btn btn-sm btn-white">Edit</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div class="card__options dropdown right-0 pr-2">
                        <a href="#" class="dropdown-toggle text-muted" data-caret="false" data-toggle="dropdown">
                            <i class="material-icons">more_vert</i>
                        </a>
                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" href="instructor-course-edit.html">Edit course</a>
                            <a class="dropdown-item" href="#">Course Insights</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item text-danger" href="#">Delete course</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <!-- Pagination -->
        <ul class="pagination justify-content-center pagination-sm">
            <li class="page-item disabled">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true" class="material-icons">chevron_left</span>
                    <span>Prev</span>
                </a>
            </li>
            <li class="page-item active">
                <a class="page-link" href="#" aria-label="1">
                    <span>1</span>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="1">
                    <span>2</span>
                </a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span>Next</span>
                    <span aria-hidden="true" class="material-icons">chevron_right</span>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
    import {mapState} from 'vuex';

    export default {
        data() {
            return {

            }
        },
        mounted() {
            this.$store.dispatch('fetchCourse');
        },
        methods:  {

        },
        computed: {
            ...mapState(['courses'])
        }
    }
</script>