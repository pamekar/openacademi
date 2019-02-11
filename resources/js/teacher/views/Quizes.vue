<template>
    <div>
        <vue-headful
                :title="pageTitle + ' - OpenAcademi'"
                :description="'all courses created by user'"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
                :button="{title:'Add Quiz',link:'add-quiz',class:'btn btn-success'}"
        ></breadcrumb-component>

        <div class="card-columns">

            <div class="card card-sm">
                <div class="card-body media">
                    <div class="media-left">
                        <a href="instructor-review-quiz.html" class="avatar avatar-lg avatar-4by3">
                            <img src="assets/images/vuejs.png" alt="Card image cap" class="avatar-img rounded">
                        </a>
                    </div>
                    <div class="media-body">
                        <h4 class="card-title mb-0"><a href="instructor-review-quiz.html">Vue.js Deploy Quiz</a></h4>
                        <small class="text-muted">25 Completed</small>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <a href="instructor-review-quiz.html" class="btn btn-white btn-sm float-left"><i class="material-icons btn__icon--left">playlist_add_check</i> Review <span class="badge badge-dark ml-2">5</span></a>
                    <a href="instructor-quiz-edit.html" class="btn btn-default btn-sm float-right"><i class="material-icons btn__icon--left">edit</i> Edit </a>
                    <div class="clearfix"></div>
                </div>
            </div>

            <div class="card card-sm">
                <div class="card-body media">
                    <div class="media-left">
                        <a href="instructor-review-quiz.html" class="avatar avatar-lg avatar-4by3">
                            <img src="assets/images/github.png" alt="Card image cap" class="avatar-img rounded">
                        </a>
                    </div>
                    <div class="media-body">
                        <h4 class="card-title mb-0"><a href="instructor-review-quiz.html">GitHub Basic Setup</a></h4>
                        <small class="text-muted">410 Completed</small>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <a href="instructor-review-quiz.html" class="btn btn-white btn-sm float-left"><i class="material-icons btn__icon--left">playlist_add_check</i> Review <span class="badge badge-dark ml-2">5</span></a>
                    <a href="instructor-quiz-edit.html" class="btn btn-default btn-sm float-right"><i class="material-icons btn__icon--left">edit</i> Edit </a>
                    <div class="clearfix"></div>
                </div>
            </div>

            <div class="card card-sm">
                <div class="card-body media">
                    <div class="media-left">
                        <a href="instructor-review-quiz.html" class="avatar avatar-lg avatar-4by3">
                            <img src="assets/images/gulp.png" alt="Card image cap" class="avatar-img rounded">
                        </a>
                    </div>
                    <div class="media-body">
                        <h4 class="card-title mb-0"><a href="instructor-review-quiz.html">Gulp Front-End Boilerplate</a></h4>
                        <small class="text-muted">50 Completed</small>
                    </div>
                </div>
                <div class="card-footer text-center">
                    <a href="instructor-review-quiz.html" class="btn btn-white btn-sm float-left"><i class="material-icons btn__icon--left">playlist_add_check</i> Review <span class="badge badge-dark ml-2">5</span></a>
                    <a href="instructor-quiz-edit.html" class="btn btn-default btn-sm float-right"><i class="material-icons btn__icon--left">edit</i> Edit </a>
                    <div class="clearfix"></div>
                </div>
            </div>

        </div>

        <!-- Pagination -->
        <paginate
                :page-count="pageCount"
                :click-handler="getCourses"
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

    import Paginate from 'vuejs-paginate'

    export default {
        data() {
            return {
                breadcrumbs: [
                    {
                        title: "Dashboard", link: 'dashboard'
                    },
                    {
                        title: "Quizes", link: 'show-quizes'
                    },
                    {
                        title: ""
                    }
                ],
                pageTitle:   'My quizes'
            }
        },
        mounted() {
            this.$store.dispatch('quizes/fetch_all');
        },
        methods:    {
            getQuizes(page = 1) {
                this.$store.dispatch('quizes/fetch_all', page);
            },
        },
        components: {
            'paginate':          Paginate
        },
        computed:   {
            ...mapState(
                {
                    quizes:    state => state.quizes.quizes,
                    categories: state => state.quizes.categories,
                    pageCount:  state => state.quizes.pageCount,
                    pageFrom:   state => state.quizes.pageFrom,
                    pageTo:     state => state.quizes.pageTo,
                    pageTotal:  state => state.quizes.pageTotal,
                })
        }
    }
</script>