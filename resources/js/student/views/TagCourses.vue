<template>
    <div>
        <vue-headful
                :title="tag + ' - Courses | OpenAcademi'"
                :description="pageTitle"
        ></vue-headful>

        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="`Courses <span class='badge badge-primary badge-lg'>${tag}</span>`"
        ></breadcrumb-component>

        <div class="row">
            <courses-component
                    v-for="course in allCourses"
                    :course="course"
                    :courseWidth="courseListWidth"
                    :key="course.id"
                    :tags="course.tags"
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
                pageTitle:       'Courses <span class="badge badge-primary badge-lg"></span>',
                pageCount:       1,
                tag:             "",
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
            this.getTagCourses();
        },
        mounted() {

        },
        components: {
            'courses-component': Courses,
            'paginate':          Paginate
        },
        methods:    {
            getTagCourses(page = 1) {
                let tag = this.$route.params.tag;
                axios.get("/api/courses/tags/" + tag + "?count=12&page=" + page)
                    .then(({data}) => {
                        this.allCourses = data.data;
                        this.pageCount = data.last_page;
                        this.breadcrumbs[2].title = tag;
                        this.tag = tag;
                    });
            },

        },
        watch:      {
            '$route'(to, from) {
                // react to route changes...
                this.getTagCourses();
            }
        }
    }
</script>