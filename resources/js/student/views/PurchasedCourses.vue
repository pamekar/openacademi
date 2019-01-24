<template>
    <div>
        <vue-headful
                :title="pageTitle + ' - OpenAcademi'"
                description="Your purchased courses"
        ></vue-headful>

        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
        ></breadcrumb-component>

        <div class="row">
            <purchased-courses-component
                    v-for="course in purchasedCourses"
                    :course="course"
                    :key="course.id"
            ></purchased-courses-component>
        </div>
    </div>
</template>
<script>
    import PurchasedCourses from '../components/PurchasedCoursesComponent.vue'

    export default {
        data() {
            return {
                purchasedCourses: [],
                breadcrumbs:      [
                    {
                        title: "Dashboard",
                        link:  "dashboard"
                    },
                    {
                        title: "My Courses"
                    }
                ],
                pageTitle:       "My Courses"
            }
        },
        created() {
            this.getPurchasedCourses();
        },
        mounted() {
            console.log('Purchased Courses Component mounted now.')
        },
        components: {
            'purchased-courses-component': PurchasedCourses
        },
        methods:    {
            getPurchasedCourses(page = 1) {
                axios.get("/api/courses/purchased?count=8")
                    .then(({data}) => {
                        this.purchasedCourses = data.courses;
                    });
            },

        }
    }
</script>