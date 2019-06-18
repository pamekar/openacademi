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
            <courses-component
                    v-for="course in courses"
                    :course="course"
                    :key="course.id"
            ></courses-component>
        </div>

        <!-- Pagination -->
        <paginate
                :page-count="pageCount"
                :click-handler="searchCourses"
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
                pageTitle:   'Search'
            }
        },
        mounted() {
            this.$store.dispatch('courses/fetch_all');
        },
        methods:    {
            searchCourses(page = 1) {
                let params = {
                    q:    this.$route.params.q,
                    page: page
                };
                this.$store.dispatch('courses/search', params);
            },
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
                    pageTitle:  state => state.courses.pageTitle,
                    search:     state => state.courses.search
                }),
        }
    }
</script>