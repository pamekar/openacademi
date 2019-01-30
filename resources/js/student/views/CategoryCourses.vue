<template>
    <div>
        <vue-headful
                :title="pageTitle + ' - OpenAcademi'"
                :description="pageTitle+ ' Category Courses'"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
        ></breadcrumb-component>

        <div class="row">
            <courses-component
                    v-for="course in allCourses"
                    :course="course"
                    :courseWidth="courseListWidth"
                    :key="course.id"
            ></courses-component>
        </div>
        <paginate
                :page-count="pageCount"
                :click-handler="getCategoryCourses"
                prev-text="Prev"
                next-text="Next"
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

    export default {
        data() {
            return {
                allCourses:      [],
                courseListWidth: "col-lg-3 col-md-4, col-sm-6",
                pageTitle:       "",
                pageCount:       1,
                breadcrumbs:     [
                    {
                        title: "Dashboard", link: "dashboard"
                    },
                    {
                        title: "Courses", link: "all-courses"
                    },
                    {
                        title: ""
                    }
                ],
            }
        },
        created() {
            this.getCategoryCourses();
        },
        mounted() {
            console.log('Dashboard Component mounted now.');
        },
        components: {
            'courses-component': Courses,
            'paginate':          Paginate
        },
        methods:    {
            getCategoryCourses(page = 1) {
                axios.get("/api/courses/categories/" + this.$route.params.slug + "?count=12&page=" + page)
                    .then(({data}) => {
                        this.allCourses = data.courses.data;
                        this.pageTitle = data.category + " Courses";
                        this.pageCount = data.courses.last_page;
                        this.breadcrumbs[2].title = data.category;
                    });
            },

        },
        props:      ['slug'],
        watch:      {
            '$route'(to, from) {
                // react to route changes...
                this.getCategoryCourses();
            }
        }
    }
</script>