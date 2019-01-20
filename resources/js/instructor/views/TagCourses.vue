<template>
    <div>
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
                    :tags="course.tags.split(';',2)"
            ></courses-component>
        </div>
        <paginate
                :page-count="pageCount"
                :click-handler="getTagCourses"
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
                pageTitle:       'Courses <span class="badge badge-primary badge-lg">' + this.tag + '</span>',
                pageCount:       1,
                breadcrumbs:     [
                    {
                        title: "Dashboard", link: "dashboard"
                    },
                    {
                        title: "Courses", link: "all-courses"
                    },
                    {
                        title: this.tag
                    }
                ],
            }
        },
        created() {
            this.getTagCourses();
        },
        mounted() {
            console.log('Dashboard Component mounted now.');
        },
        components: {
            'courses-component': Courses,
            'paginate':          Paginate
        },
        methods:    {
            getTagCourses(page = 1) {
                axios.get("/api/courses/tags/" + this.$route.params.tag + "?count=12&page=" + page)
                    .then(({data}) => {
                        this.allCourses = data.data;
                        this.pageCount = data.last_page;
                    });
            },

        },
        props:      ['tag'],
        watch:      {
            '$route'(to, from) {
                // react to route changes...
                this.getTagCourses();
            }
        }
    }
</script>