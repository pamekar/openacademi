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
                    v-for="course in allCourses"
                    :course="course"
                    :courseWidth="courseListWidth"
                    :key="course.id"

            ></courses-component>
        </div>
        <paginate
                :page-count="pageCount"
                :click-handler="getAllCourses"
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

    export default {
        data() {
            return {
                allCourses:      [],
                courseListWidth: "col-lg-3 col-md-4, col-sm-6",
                pageTitle:       "Courses",
                pageCount:       1,
                breadcrumbs:     [
                    {
                        title: "Dashboard", link: 'dashboard'
                    },
                    {
                        title: "Courses"
                    }
                ],
            }
        },
        created() {
            this.getAllCourses();
        },
        mounted() {

        },
        components: {
            'courses-component': Courses,
            'paginate':          Paginate
        },
        computed:   {
            getTags(tags) {
                return str.split(';', tags);
            }
        },
        methods:    {
            getAllCourses(page = 1) {
                axios.get("/api/courses/all?count=12&page=" + page)
                    .then(({data}) => {
                        this.allCourses = data.data;
                        this.pageCount = data.last_page;
                    });
            },
        }
    }
</script>