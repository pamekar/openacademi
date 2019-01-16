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
            ></courses-component>
        </div>
    </div>
</template>
<script>
    import Courses from '../components/CoursesComponent.vue'

    export default {
        data() {
            return {
                allCourses: [],
                courseListWidth: "col-lg-3 col-md-4, col-sm-6",
                breadcrumbs: [
                    {
                        title: "Home"
                    },
                    {
                        title: "Courses"
                    }
                ],
                pageTitle: "Courses"
            }
        },
        created() {
            this.getAllCourses();
        },
        mounted() {
            console.log('Dashboard Component mounted now.')
        },
        components: {
            'courses-component': Courses
        },
        methods: {
            getAllCourses(page = 1) {
                axios.get("/api/courses/all?count=12&dashboard=1")
                    .then(({data}) => {
                        this.allCourses = data.courses;
                    });
            },

        }
    }
</script>