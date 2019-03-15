<template>
    <div class="row">
        <div class="col-md-10 col-sm-9">
            <div class="card-group">
                <div class="card">
                    <div class="card-body text-center">
                        <h4 class="text-primary mb-0"><strong>{{totalQuestions}}</strong></h4>
                        <small class="text-muted-light">TOTAL</small>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body text-center">
                        <h4 class="text-warning mb-0"><strong>{{pendingQuestions}}</strong></h4>
                        <small class="text-muted-light">PENDING</small>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body text-center">
                        <div class="card-body text-center">
                            <h4 :class="`score.color mb-0`"><strong>{{score.percentage}}</strong></h4>
                            <small class="text-muted-light">{{score.remark}}</small>
                        </div>

                    </div>
                </div>
            </div>
            <div class="tab-content" id="v-pills-tabContent">
                <div :class="{'tab-pane fade show active':index==0,'tab-pane fade':index!==0}" :id="`question_${index}`" role="tabpanel" :aria-labelledby="`question_${index}-tab`" v-for="(question, index) in questions">
                    <div class="card-body">
                        <div class="media align-items-center">
                            <div class="media-left">
                                <h4 class="mb-0 mr-3"><strong>#{{index + 1}}</strong></h4>
                            </div>
                            <div class="media-body">
                                <div v-if="question.question_image.length>0" v-viewer="{movable: false}" class="text-center mb-4">
                                    <img class="img-thumbnail" :src="question.question_image" style="cursor: pointer; max-width:60%;">
                                </div>
                                <div class="card" v-html="question.question"></div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-body" v-if="question.type=='radio'">
                            <ul class="list-group">
                                <li :class="{'list-group-item':questions[index].answer!==option.id,'list-group-item list-group-item-success':question.answer==option.id}" v-for="(option,index1) in question.options">
                                    {{option.option_text}}
                                </li>
                            </ul>
                        </div>
                        <div class="card-body" v-else-if="question.type=='input'">
                            <p>{{question.answer}}</p>
                        </div>
                        <div class="card-body" v-else-if="question.type=='textarea'">
                            <p>{{question.answer}}</p>
                        </div>
                        <div class="card-body" v-else-if="question.type=='richtext'">
                            <div v-html="question.answer"></div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="nav d-block " role="tablist">
                            <button :class="{'btn btn-white disabled':index===0,'btn btn-white':index>0}" @click="showQuestion(index-1)">Previous</button>
                            <button :class="{'btn btn-primary float-right':index<questions.length-1,'btn btn-primary float-right disabled':index==questions.length-1}" @click="showQuestion(index+1)">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-3">
            <div class="card">
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">

                    <a :class="{'nav-link active':index==0,'nav-link':index!==0}" :id="`question_${index}-tab`" data-toggle="pill" :href="`#question_${index}`" role="tab" :aria-controls="`question_${index}`" :aria-selected="index==0" v-for="(question,index) in questions">
                                            <span class="media align-items-center">
                                                <span class="media-left">
                                                    <span class="btn btn-white btn-circle">#{{index + 1}}</span>
                                                </span>
                                            </span>
                    </a>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                result:      [],
                questions:   [],
                quiz:        [],
            }
        },
        created() {

        },
        mounted() {
        },
        components: {
        },
        computed:   {
            pendingQuestions() {
                let pending = 0;
                for (let i = 0; i < this.totalQuestions; i++) {
                    this.questions[i].answer == null ? pending++ : pending;
                }
                return pending;
            },
            totalQuestions() {
                return this.questions.length
            },
            score() {
                let result = this.result;
                let score = Math.round((result.test_result / result.total_score) * 100);
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

            },
        },
        methods:    {
            getQuiz() {
                axios.get(`/api/quizes/${this.$route.params.id}`)
                    .then(({data}) => {
                        this.quiz = data.quiz;
                        this.pageTitle = data.quiz.title;
                        this.breadcrumbs[2].title = data.quiz.title;
                        this.questions = data.questions;
                        this.result = data.result
                    });
            },
            showQuestion(index) {
                if (index >= 0 && index < this.questions.length) {
                    jQuery(".tab-pane").removeClass('active show');
                    jQuery(`#question_${index}`).addClass('active show');
                    jQuery(".nav-link").attr("aria-selected", "false").removeClass('active show');
                    jQuery(`#question_${index}-tab`).addClass('active show').attr("aria-selected", "true");

                }
            }
        },
        props:{
            result: Object,
            questions: Array,
            quiz: Object
        }
    }
</script>

