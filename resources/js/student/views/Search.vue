<template>
    <div>
        <vue-headful
                :title="pageTitle + ' | OpenAcademi'"
                description="Our featured courses"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
        ></breadcrumb-component>

        <div class="row">
            <courses-component
                    v-for="course in courses"
                    :course="course"
                    :courseWidth="courseListWidth"
                    :key="course.id"

            ></courses-component>
        </div>
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
    import Courses from '../components/CoursesComponent.vue'
    import Paginate from 'vuejs-paginate'
    import axios from 'axios';

    export default {
        data() {
            return {
                category:        0,
                categories:      [],
                courses:         [],
                courseListWidth: "col-lg-3 col-md-4, col-sm-6",
                pageCount:       1,
                pageTitle:       "",
                searchText:      null,
                totalCourses:    0,
                breadcrumbs:     [
                    {
                        title: "Dashboard", link: 'dashboard'
                    },
                    {
                        title: "Courses", link: 'all-courses'
                    }
                ],
            }
        },
        components: {
            'paginate':          Paginate,
            'courses-component': Courses,
        },
        computed:   {},
        created() {
            this.getCategories();
            this.searchCourses();
        },
        methods:    {
            color(colors) {
                return this.colors[Math.floor(Math.random() * colors.length)];
            },
            getCategories() {
                let count = 0;
                let query = this.searchText ? this.searchText : this.searching;
                axios.get(`/api/home/courses/search/categories?q=${query}`)
                    .then(({data}) => {
                        this.categories = data;
                    });

            },
            searchCourses(page = 1) {
                let query = this.$route.params.query;
                let courses = [];
                axios.get(`/api/home/courses/search?q=${query}&count=8&page=${page}&category=${this.category}`)
                    .then(({data}) => {
                        courses = data.courses.data;
                        this.courses = data.courses.data;
                        this.pageCount = data.courses.last_page;
                        this.totalCourses = data.courses.total;
                    });
                this.searchText = `Search results for <em>'${query}'</em>`;
            },
            setCategory(id) {
                this.category = id;
                this.searchCourses();
            }
        },
        watch:      {
            '$route'(to, from) {
                // react to route changes...
                this.searchCourses();
            }
        }
    }
</script>