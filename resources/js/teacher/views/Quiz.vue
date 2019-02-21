<template>
    <div>
        <vue-headful
                :title="pageTitle + ' - OpenAcademi'"
                :description="quiz.short_text"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="[{title: 'Dashboard', link: 'dashboard'},{title: 'Quizes', link: 'show-quizes'},{title: quiz.title, link: 'view-quiz', params: {id:quiz.id}},{title: pageTitle}]"
                :title="pageTitle"
                :button="{title:'Edit',link:'edit-quiz',params:{id:quiz.id},class:'btn btn-info'}"
        ></breadcrumb-component>


        <div class="media flex-wrap align-items-center mb-headings">
            <div class="media-left avatar avatar-lg avatar-4by3">
                <img src="assets/images/vuejs.png" alt="" class="avatar-img rounded">
            </div>
            <div class="media-body mb-3 mb-sm-0">
                <h1 class="h2 mb-0">{{quiz.title}}</h1>
                <span class="text-muted">submited by</span> <a href="instructor-profile.html">Adrian Demian</a>
            </div>
            <div class="text-left text-sm-right w-100 w-sm-auto">
                <a href="#" class="btn btn-white btn-sm"><i class="material-icons">keyboard_arrow_left</i></a>
                <a href="#" class="btn btn-primary btn-sm"><i class="material-icons">keyboard_arrow_right</i></a>
            </div>
        </div>

        <div class="card">
            <ul class="nav nav-tabs nav-tabs-card">
                <li class="nav-item">
                    <a class="nav-link active" href="#first" data-toggle="tab">Review</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#second" data-toggle="tab">All Questions</a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="first">
                    <ul class="list-group mb-0 list-group-fit">
                        <li class="list-group-item">
                            <div class="row">
                                <div class="col-md-8">
                                    <p><strong>#9. What are the first three steps?</strong></p>
                                    <small class="text-muted">ANSWER:</small>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati temporibus blanditiis iste itaque deleniti minima.
                                    </p>

                                </div>
                                <div class="col-md-4">
                                    <div class="form-group d-flex flex-column">
                                        <label class="form-label" for="customRange2">Score</label>
                                        <input type="range" class="custom-range" min="0" max="5" id="customRange2">
                                    </div>
                                    <div class="form-group">
                                        <textarea class="form-control" rows="2" placeholder="Write comment"></textarea>
                                    </div>
                                    <a href="#" class="btn btn-success float-right">Save review <i class="material-icons btn__icon--right">check</i></a>
                                </div>
                            </div>
                        </li>
                        <li class="list-group-item">
                            <a href="#"><strong>#12.</strong> How do you deploy?</a>
                        </li>
                    </ul>
                </div>
                <div class="tab-pane" id="second">
                    <ul class="list-group mb-0 list-group-fit">
                        <li class="list-group-item">
                            <div class="media">
                                <div class="media-left">
                                    <div class="text-muted-light">2.</div>
                                </div>
                                <div class="media-body">The MVC architectural pattern</div>
                                <div class="media-right"><strong class="text-primary">7</strong></div>
                            </div>
                        </li>
                    </ul>
                    <div class="card card-footer">
                        Total Score: <span class="h5 text-primary"><strong>340</strong></span>
                    </div>
                </div>
            </div>
        </div>

        <h4>Review History</h4>
        <div class="table-responsive">
            <table class="table table-sm table-middle" v-on:show="getQuizes">
                <thead>
                <tr>
                    <th style="width: 120px">Submitted</th>
                    <th>Student</th>
                    <th class="text-center">Score</th>
                    <th>Reviewed</th>
                    <th style="width: 80px"></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="result in results">
                    <td><span class="badge badge-light ">{{result.created_at}}</span></td>
                    <td><a href="#">{{result.student.full_name}}</a></td>
                    <td class="text-center"><span class="text-muted">{{result.test_result}}</span></td>
                    <td><span class="text-muted">PENDING</span></td>
                    <td class="right"><a href="#" class="btn btn-sm btn-primary">Review</a></td>
                </tr>
                </tbody>
            </table>
            <!-- Pagination -->
            <paginate
                    :page-count="pageCount"
                    :click-handler="getResults"
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
    </div>

</template>
<script>
    import {mapState, mapActions} from 'vuex';
    import Paginate from 'vuejs-paginate';

    export default {
        data() {
            return {
                limit:     10,
                purchased: "",
            }
        },
        created() {
            this.$store.dispatch('quizes/fetch', this.$route.params.id);
            //
        },
        mounted() {
        },
        components: {
            'paginate': Paginate
        },
        methods:    {
            getResults: function (page = 1) {
                this.results = this.quiz.results.slice((page - 1) * this.limit, page * this.limit);
            }
        },
        computed:   {
            ...mapState(
                {
                    answers:   state => state.quizes.answers,
                    course:    state => state.quizes.course,
                    pageCount: state => state.quizes.pageCount,
                    pageTitle: state => state.quizes.pageTitle,
                    quiz:      state => state.quizes.quiz,
                }),
            results: {
                get: function () {
                    return this.$store.state.quizes.results;
                },
                // setter
                set: function (results) {
                    this.$store.state.quizes.results = results;
                }
            }
        },
        watch:      {
            '$route'(to, from) {
                // react to route changes...
                this.$store.dispatch('quizes/fetch', this.$route.params.id);
            }
        }
    }
</script>
