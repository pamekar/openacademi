<template>
    <div>
        <vue-headful
                :title="pageTitle + ' | OpenAcademi'"
                :description="quiz.short_text"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="[{title: 'Dashboard', link: 'dashboard'},{title: 'Quizes', link: 'show-quizes'},{title: quiz.title, link: 'view-quiz', params: {id:quiz.id}},{title: pageTitle}]"
                :title="pageTitle"
                :button="{title:'Edit',link:'edit-quiz',params:{id:quiz.id},class:'btn btn-info'}"
        ></breadcrumb-component>


        <div class="media flex-wrap align-items-center mb-headings">
            <div class="media-body mb-3 mb-sm-0">
                <h1 class="h2 mb-0">{{quiz.title}}</h1>
                <span class="text-muted">submited by</span> <a href="#">{{result.student.full_name}}</a>
            </div>
            <div class="text-left text-sm-right w-100 w-sm-auto">
                <button class="btn btn-white btn-sm" @click="viewResult(currentIndex-1)" v-if="results[currentIndex-1]"><i class="material-icons">keyboard_arrow_left</i></button>
                <button class="btn btn-primary btn-sm" @click="viewResult(currentIndex+1)" v-if="results[currentIndex+1]"><i class="material-icons">keyboard_arrow_right</i></button>
            </div>
        </div>

        <div class="card">
            <ul class="nav nav-tabs nav-tabs-card">
                <li class="nav-item">
                    <a class="nav-link" href="#first" data-toggle="tab">Review</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="#second" data-toggle="tab">All Questions</a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane" id="first">
                    <div id="accordion">
                        <div class="card mb-0" v-for="(answer,index) in result.answers" v-if="answer.answer_text">
                            <div class="card-header">
                                <a class="card-link d-block" data-toggle="collapse" :href="'#collapse-'+index">
                                    Review Question {{index + 1}}
                                </a>
                            </div>
                            <div :id="'collapse-'+index" :class="{collapse:true,show:index===0}" data-parent="#accordion">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-8">
                                            <p><strong>#{{index + 1}}.</strong></p>
                                            <img :src="answer.question.question_image" class="img img-thumbnail" style="max-width:70%;">
                                            <div class="card-body">
                                                <small class="text-muted">QUESTION:</small>
                                                <div v-html="answer.question.question"></div>
                                            </div>
                                            <div class="card">
                                                <div class="card-body">
                                                    <small class="text-muted">ANSWER:</small>

                                                    <div style="font-size:1.1em" v-html="answer.answer_text"></div>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col-md-4" v-if="answer.answer_text && !answer.review">
                                            <div class="form-group d-flex flex-column">
                                                <label class="form-label" for="customRange2">Score <span>({{review.score}})</span></label>
                                                <input type="range" class="custom-range" min="0" :max="answer.question.score" v-model="review.score">
                                            </div>
                                            <div class="form-group">
                                                <textarea class="form-control" rows="2" placeholder="Write comment" v-model="review.review"></textarea>
                                            </div>
                                            <button class="btn btn-success float-right" @click="addReview(index)">Save review <i class="material-icons btn__icon--right">check</i></button>
                                        </div>
                                        <div class="col-md-4" v-if="answer.answer_text && answer.review">
                                            <div class="form-group d-flex flex-column">
                                                <label class="form-label" for="customRange2">Score <span>({{answer.review.score}})</span></label>
                                                <input type="range" class="custom-range" min="0" :max="answer.question.score" id="customRange2" v-model="answer.review.score">
                                            </div>
                                            <div class="form-group">
                                                <textarea class="form-control" rows="2" placeholder="Write comment" v-model="answer.review.review"></textarea>
                                            </div>
                                            <button class="btn btn-success float-right" @click="editReview(index)">Update review <i class="material-icons btn__icon--right">check</i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane active" id="second">
                    <ul class="list-group mb-0 list-group-fit">
                        <li class="list-group-item" v-for="(answer,index) in result.answers">
                            <div class="media">
                                <div class="media-left">
                                    <div class="text-muted-light">{{index + 1}}.</div>
                                </div>
                                <div class="media-body">
                                    <div v-html="answer.question.question"></div>
                                </div>
                                <div class="media-right">
                                    <span class="badge badge-success" v-if="answer.answer_text && !answer.review ">Pending Review</span>
                                    <strong class="text-primary" v-else-if="answer.correct === 1 && answer.review">{{answer.review.score}}</strong>
                                    <strong class="text-danger" v-else-if="answer.correct === 0 && answer.review">0</strong>
                                    <strong class="text-primary" v-else-if="answer.correct === 1 && !answer.review">{{answer.question.score}}</strong>
                                    <strong class="text-danger" v-else-if="answer.correct === 0 && !answer.review">0</strong>
                                    <strong class="text-warning" v-else>NULL</strong>

                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="card-footer">
                Total Score: <span class="h5 text-primary"><strong>{{result.test_result}}</strong></span>
            </div>
        </div>

        <h4>Review History</h4>
        <div class="table-responsive">
            <table class="table table-sm table-middle">
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
                <tr v-for="(result,index) in results">
                    <td><span class="badge badge-light ">{{result.created_at}}</span></td>
                    <td><a href="#">{{result.student.full_name}}</a></td>
                    <td class="text-center"><span class="text-muted">{{result.test_result}}</span></td>
                    <td><span class="text-muted">PENDING</span></td>
                    <td class="right">
                        <button class="btn btn-sm btn-primary" @click="viewResult(index)">Review</button>
                    </td>
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
                answerIndex:  0,
                currentIndex: 0,
                limit:        10,
                purchased:    "",
                review:       {
                    review: "",
                    score:  0
                }
            }
        },
        created() {
            this.$store.dispatch('quizes/fetch', this.$route.params.id);
            this.$store.dispatch('quizes/fetch_results', {id: this.$route.params.id, page: 1});
            //
        },
        mounted() {
        },
        components: {
            'paginate': Paginate
        },
        methods:    {
            addReview:  function (index) {
                let answer = {
                    id:     this.result.answers[index].id,
                    review: this.review
                };
                this.$store.dispatch('quizes/add_review', answer);
                this.getResults(this.currentPage);
                this.review=  {
                    review: "",
                    score:  0
                };
            },
            editReview: function (index) {
                this.$store.dispatch('quizes/edit_review', this.result.answers[index].review);
                this.getResults(this.currentPage, this.currentIndex);
                this.viewResult(this.currentIndex);
            },
            getResults: function (page = 1, currentIndex = 0) {
                this.$store.dispatch('quizes/fetch_results', {id: this.$route.params.id, page: page});
                this.currentIndex = currentIndex;
            },
            viewResult: function (index) {
                this.result = this.results[index];
                this.currentIndex = index;
            }

        },
        computed:   {
            ...mapState(
                {
                    course:      state => state.quizes.course,
                    pageCount:   state => state.quizes.pageCount,
                    currentPage: state => state.quizes.currentPage,
                    pageTitle:   state => state.quizes.pageTitle,
                    quiz:        state => state.quizes.quiz,
                    results:     state => state.quizes.results,
                }),
            result: {
                get: function () {
                    return this.$store.state.quizes.result;
                },
                set: function (result) {
                    this.$store.state.quizes.result = result;
                }
            },
        },
        watch:      {
            '$route'(to, from) {
                // react to route changes...
                this.$store.dispatch('quizes/fetch', this.$route.params.id);
            }
        }
    }
</script>
