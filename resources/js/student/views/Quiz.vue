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
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active">Quiz</li>
        </ol>
        <div class="row">
            <div class="col-md-9 col-sm-8">
                <div class="card-group">
                    <div class="card">
                        <div class="card-body text-center">
                            <h4 class="text-primary mb-0"><strong>25</strong></h4>
                            <small class="text-muted-light">TOTAL</small>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body text-center">
                            <h4 class="text-warning mb-0"><strong>17</strong></h4>
                            <small class="text-muted-light">PENDING</small>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body text-center">
                            <div class="text-secondary mb-0"><h5 class="countdown" data-value="4" data-unit="hour"></h5></div>
                            <small class="text-muted">TIME LEFT</small>
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
            <div class="col-md-3 col-sm-4">
                <ul class="nav flex-sm-column">
                    <li class="list-group-item active">
                        <a href="#">
                                            <span class="media align-items-center">
                                                <span class="media-left">
                                                    <span class="btn btn-white btn-circle">#9</span>
                                                </span>
                                                <span class="media-body">
                                                    Github command to deploy comits?
                                                </span>
                                            </span>
                        </a>
                    </li>
                    <li class="list-group-item">
                        <a href="#">
                                            <span class="media align-items-center">
                                                <span class="media-left">
                                                    <span class="btn btn-white btn-circle">#10</span>
                                                </span>
                                                <span class="media-body">
                                                    What's the difference between private and public repos?
                                                </span>
                                            </span>
                        </a>
                    </li>
                    <li class="list-group-item">
                        <a href="#">
                                            <span class="media align-items-center">
                                                <span class="media-left">
                                                    <span class="btn btn-white btn-circle">#11</span>
                                                </span>
                                                <span class="media-body">
                                                    What is the purpose of a branch?
                                                </span>
                                            </span>
                        </a>
                    </li>
                    <li class="list-group-item">
                        <a href="#">
                                            <span class="media align-items-center">
                                                <span class="media-left">
                                                    <span class="btn btn-white btn-circle">#12</span>
                                                </span>
                                                <span class="media-body">
                                                    Final Question?
                                                </span>
                                            </span>
                        </a>
                    </li>
                </ul>
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
                        title: "Courses", link: 'all-courses'
                    },
                    {
                        title: ""
                    }
                ],
                pageTitle:       "Courses",
                purchased:       ""
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
                        this.pageTitle = data.course.title;
                        this.purchased = data.purchased;
                        this.breadcrumbs[2].title = data.course.title;
                    });
            },
        },
        props:      ['slug'],
        computed:   {}
    }
</script>
