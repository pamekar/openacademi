<template>
    <div>
        <vue-headful
                :title="pageTitle + ' | OpenAcademi'"
                :description="''"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
        ></breadcrumb-component>
        <div class="row">
            <div class="col-md-6" v-for="quiz in results">
                <div class="card">
                    <div class="card-header">
                        <div class="media">
                            <div class="media-body">
                                <h4 class="card-title m-0">
                                    <router-link :to="{name:'quiz',params:{id:quiz.id}}">{{quiz.test.title}}</router-link>
                                </h4>
                                <small>
                                    {{quiz.test.about_quiz}}
                                </small>
                                <ul class="list-inline">
                                    <li class="text-muted list-inline-item small">Course
                                        <router-link :to="{name:'course',params:{slug:quiz.test.course.slug}}">{{quiz.test.course_title}}</router-link>
                                    </li>
                                    <li class="text-muted list-inline-item small">Lesson
                                        <router-link :to="{name:'lesson',params:{slug:quiz.test.lesson.slug,'id':quiz.test.course_id}}">{{quiz.test.lesson_title}}</router-link>
                                    </li>
                                </ul>
                            </div>
                            <div class="media-right text-center">
                                <h2 :class="score(quiz).color">{{score(quiz).percentage}}</h2>
                                <small class="text-black-50">{{score(quiz).remark}}</small>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer bg-white">
                        <router-link :to="{name:'quiz',params:{id:quiz.id}}" class="btn btn-default btn-sm" title="Review Quiz Result">View <i class="material-icons btn__icon--right">visibility</i></router-link>
                        <button class="btn btn-sm btn-outline-danger" @click="deleteResult(quiz.id)" title="Delete result"><i class="material-icons">delete_outline</i></button>
                        <router-link :to="{name:'quiz-instructions',params:{id:quiz.test.id,slug:quiz.test.lesson.slug}}" class="btn btn-primary btn-sm float-right" title="Retake Quiz">Retake <i class="material-icons btn__icon--right">replay</i></router-link>
                    </div>
                </div>

            </div>
        </div>
        <paginate
                :page-count="pageCount"
                :click-handler="getQuizResults"
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
    import Paginate from 'vuejs-paginate';

    export default {
        data() {
            return {
                breadcrumbs: [
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
                pageTitle:   "",
                pageCount:   0,
                currentPage: 1,
                results:     [],
            }
        },
        created() {

        },
        mounted() {
            this.getQuizResults();
        },
        components: {
            paginate:           Paginate
        },
        computed:   {},
        methods:    {
            getQuizResults(page = 1) {
                axios.get(`/api/quizes/results?count=12&page=${page}`)
                    .then(({data}) => {
                        this.results = data.data;
                        this.pageCount = data.last_page;
                        this.currentPage = data.current_page;
                    });
            },
            deleteResult(id) {
                axios.delete(`/api/quizes/${id}`)
                    .then(({data}) => {
                        alert('Your quiz has been deleted');
                    });
                this.getQuizResults();
            },
            score(quiz) {
                let score = Math.round((quiz.test_result / quiz.total_score) * 100);
                let remark = "";
                let color = "text-muted";
                switch (true) {
                    case score >= 80 && score <= 100:
                        remark = "Great";
                        color = "text-success";
                        break;
                    case score >= 60 && score < 80:
                        remark = "Good";
                        color = "text-warning";
                        break;
                    case score >= 40 && score < 60:
                        remark = "Average";
                        color = "text-secondary";
                        break;
                    case score < 40:
                        remark = "Failed";
                        color = "text-danger";
                        break;
                    default:
                        break;
                }

                return {percentage: `${score}%`, remark: remark, color: color}
            }
        },
        props:      ['slug'],
    }
</script>