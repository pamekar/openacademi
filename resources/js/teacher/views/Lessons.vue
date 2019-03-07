<template>
    <div>
        <vue-headful
                :title="pageTitle + ' | OpenAcademi'"
                :description="'all courses created by user'"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
                :button="{title:'Add Course',link:'add-course',class:'btn btn-success'}"
        ></breadcrumb-component>
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
                                        <option :value="category.id" v-for="category in categories">{{category.title}}</option>
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
                    <small class="flex text-muted text-uppercase mr-3 mb-2 mb-sm-0">Displaying {{pageFrom}} to {{pageTo}} of {{pageTotal}} courses</small>
                    <div class="w-auto ml-sm-auto table d-flex align-items-center mb-0">
                        <small class="text-muted text-uppercase mr-3 d-none d-sm-block">Sort by</small>
                        <a href="#" class="sort desc small text-uppercase">Course</a>
                        <a href="#" class="sort small text-uppercase ml-2">Earnings</a>
                        <a href="#" class="sort small text-uppercase ml-2">Sales</a>
                    </div>
                </div>
            </form>
        </div>


        <div class="alert alert-light alert-dismissible border-1 border-left-3 border-left-warning" role="alert" v-if="courses.length<1">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div class="text-black-70">Ohh no! No courses to display. Add some courses.</div>
        </div>

        <div class="row">
            <div data-toggle="lists" data-lists-values="[&quot;js-lists-values-employee-name&quot;, &quot;js-lists-values-employee-title&quot;]" class="table-responsive border-bottom">
                <table class="table mb-0">
                    <thead>
                    <tr>
                        <th colspan="2">
                            <a href="javascript:void(0)" class="sort desc" data-sort="js-lists-values-employee-name">Employee name</a>
                            <a href="javascript:void(0)" class="sort" data-sort="js-lists-values-employee-title">Employee title</a>
                        </th>
                    </tr>
                    </thead>
                    <tbody class="list"><tr>
                        <td>
                            <div class="media align-items-center">
                                <div class="avatar avatar-sm mr-3">
                                    <img src="assets/images/256_rsz_sharina-mae-agellon-377466-unsplash.jpg" alt="Avatar" class="avatar-img rounded-circle">
                                </div>
                                <div class="media-body">
                                    <strong class="js-lists-values-employee-name">Sherri J. Cardenas</strong><br>
                                    <span class="text-muted js-lists-values-employee-title">Software Engineer</span>
                                </div>
                            </div>
                        </td>
                        <td class="text-right"><a href="" class="text-muted"><i class="material-icons">more_vert</i></a></td>
                    </tr><tr>
                        <td>
                            <div class="media align-items-center">
                                <div class="avatar avatar-sm mr-3">
                                    <img src="assets/images/256_rsz_90-jiang-640827-unsplash.jpg" alt="Avatar" class="avatar-img rounded-circle">
                                </div>
                                <div class="media-body">
                                    <strong class="js-lists-values-employee-name">Joseph S. Ferland</strong><br>
                                    <span class="text-muted js-lists-values-employee-title">Web Designer</span>
                                </div>
                            </div>
                        </td>
                        <td class="text-right"><a href="" class="text-muted"><i class="material-icons">more_vert</i></a></td>
                    </tr><tr>
                        <td>
                            <div class="media align-items-center">
                                <div class="avatar avatar-sm mr-3">
                                    <img src="assets/images/256_rsz_nicolas-horn-689011-unsplash.jpg" alt="Avatar" class="avatar-img rounded-circle">
                                </div>
                                <div class="media-body">
                                    <strong class="js-lists-values-employee-name">Jenell D. Matney</strong><br>
                                    <span class="text-muted js-lists-values-employee-title">Founder and CEO</span>
                                </div>
                            </div>
                        </td>
                        <td class="text-right"><a href="" class="text-muted"><i class="material-icons">more_vert</i></a></td>
                    </tr><tr>
                        <td>
                            <div class="media align-items-center">
                                <div class="avatar avatar-sm mr-3">
                                    <img src="assets/images/256_rsz_karl-s-973833-unsplash.jpg" alt="Avatar" class="avatar-img rounded-circle">
                                </div>
                                <div class="media-body">
                                    <strong class="js-lists-values-employee-name">Bryan K. Davis</strong><br>
                                    <span class="text-muted js-lists-values-employee-title">Web Developer</span>
                                </div>
                            </div>
                        </td>
                        <td class="text-right"><a href="" class="text-muted"><i class="material-icons">more_vert</i></a></td>
                    </tr></tbody>
                </table>
            </div>
        </div>

        <!-- Pagination -->
        <paginate
                :page-count="pageCount"
                :click-handler="getCourses"
                :prev-text="'Prev'"
                :next-text="'Next'"
                container-class="pagination justify-content-center pagination-sm"
                active-class="page-item active"
                disabled-class="page-item disabled"
                page-class="page-item"
                next-class="page-item"
                prev-class="page-item"
                page-link-class="page-link"
                next-link-class="page-link"
                prev-link-class="page-link"
        >
        </paginate>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex';
    import Courses from '../components/CoursesComponent.vue';
    import Paginate from 'vuejs-paginate'

    export default {
        data() {
            return {
                breadcrumbs: [
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
                pageTitle:   'My courses'
            }
        },
        mounted() {
            this.$store.dispatch('lessons/fetch_all');
        },
        methods:    {
            getCourses(page = 1) {
                this.$store.dispatch('courses/fetch_all', page);
            }
        },
        components: {
            'courses-component': Courses,
            'paginate':          Paginate
        },
        computed:   {
            ...mapState(
                {
                    courses:    state => state.courses.courses,
                    categories: state => state.courses.categories,
                    pageCount:  state => state.courses.pageCount,
                    pageFrom:   state => state.courses.pageFrom,
                    pageTo:     state => state.courses.pageTo,
                    pageTotal:  state => state.courses.pageTotal,
                })
        }
    }
</script>