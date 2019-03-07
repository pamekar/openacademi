<template>
    <div>
        <vue-headful
                :title="pageTitle + ' | OpenAcademi'"
                :description="course.summary"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
        ></breadcrumb-component>

        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="fixed-student-dashboard.html">Home</a></li>
            <li class="breadcrumb-item active">Quiz</li>
        </ol>
        <div class="card-group">
            <div class="card">
                <div class="card-body text-center">
                    <h4 class="mb-0"><strong>25</strong></h4>
                    <small class="text-muted-light">TOTAL</small>
                </div>
            </div>
            <div class="card">
                <div class="card-body text-center">
                    <h4 class="text-success mb-0"><strong>3</strong></h4>
                    <small class="text-muted-light">CORECT</small>
                </div>
            </div>
            <div class="card">
                <div class="card-body text-center">
                    <h4 class="text-danger mb-0"><strong>5</strong></h4>
                    <small class="text-muted-light">WRONG</small>
                </div>
            </div>
            <div class="card">
                <div class="card-body text-center">
                    <h4 class="text-primary mb-0"><strong>17</strong></h4>
                    <small class="text-muted-light">LEFT</small>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <div class="media align-items-center">
                    <div class="media-left">
                        <h4 class="mb-0"><strong>#9</strong></h4>
                    </div>
                    <div class="media-body">
                        <h4 class="card-title">
                            Github command to deploy comits?
                        </h4>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="form-group">
                    <div class="custom-control custom-checkbox">
                        <input id="customCheck01" type="checkbox" class="custom-control-input">
                        <label for="customCheck01" class="custom-control-label">git push</label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="custom-control custom-checkbox">
                        <input id="customCheck02" type="checkbox" class="custom-control-input">
                        <label for="customCheck02" class="custom-control-label">git commit -m "message"</label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="custom-control custom-checkbox">
                        <input id="customCheck03" type="checkbox" class="custom-control-input">
                        <label for="customCheck03" class="custom-control-label">git pull</label>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <a href="#" class="btn btn-white">Skip</a>
                <a href="#" class="btn btn-success float-right">Submit <i class="material-icons btn__icon--right">send</i></a>
            </div>
        </div>
    </div>
</template>
<script>
    import LessonsListComponent from '../components/LessonsListComponent.vue'

    export default {
        data() {
            return {
                course:          [],
                courseListWidth: "col-lg-3 col-md-4, col-sm-6",
                breadcrumbs:     [
                    {
                        title: "Dashboard", link: 'dashboard'
                    },
                    {
                        title: "Courses", link:'all-courses'
                    },
                    {
                        title: ""
                    }
                ],
                pageTitle:       "Courses",
                purchased:  ""
            }
        },
        created() {
            this.getCourse();
        },
        mounted() {
            console.log('Dashboard Component mounted now.')
        },
        components: {
            'lessons-list-component': LessonsListComponent
        },
        methods:    {
            getCourse() {
                axios.get("/api/course/" + this.$route.params.slug)
                    .then(({data}) => {
                        this.course = data.course;
                        this.pageTitle=data.course.title;
                        this.purchased=data.purchased;
                        this.breadcrumbs[2].title = data.course.title;
                    });
            },
        },
        props:      ['slug'],
        computed:   {}
    }
</script>
