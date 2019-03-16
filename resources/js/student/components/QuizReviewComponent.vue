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
                        <h4 class="text-warning mb-0"><strong>{{correctAnswers}}</strong></h4>
                        <small class="text-muted-light">CORRECT</small>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body text-center">
                        <h4 :class="`${score.color} mb-0`"><strong>{{score.percentage}}</strong></h4>
                        <small class="text-muted-light">{{score.remark}}</small>
                    </div>
                </div>
            </div>
            <div class="tab-content" id="v-pills-tabContent">
                <div :class="{'tab-pane fade show active':index==0,'tab-pane fade':index!==0}" :id="`question_${index}`" role="tabpanel" :aria-labelledby="`question_${index}-tab`" v-for="(answer, index) in answers">
                    <div class="card-body">
                        <div class="media align-items-center">
                            <div class="media-left">
                                <h4 class="mb-0 mr-3"><strong>#{{index + 1}}</strong></h4>
                            </div>
                            <div class="media-body">
                                <div v-if="answer.question.question_image.length>0" v-viewer="{movable: false}" class="text-center mb-4">
                                    <img class="img-thumbnail" :src="answer.question.question_image" style="cursor: pointer; max-width:60%;">
                                </div>
                                <div class="card" v-html="answer.question.question"></div>
                            </div>
                        </div>
                    </div>
                    <div class="card" v-if="answer.answer_type=='radio'">
                        <div class="card-body">
                            <ul class="list-group">
                                <li :class="{'list-group-item':option.id!==answer.option_id,'list-group-item list-group-item-success':option.id==answer.option_id && answer.correct,'list-group-item list-group-item-danger':option.id==answer.option_id && !answer.correct}" v-for="(option,index1) in answer.question.options">
                                    {{option.option_text}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="card" v-else-if="answer.answer_type=='input'">
                        <div class="card-header">
                            <h4 class="card-title">Answer</h4>
                        </div>
                        <div class="card-body">
                            <p v-if="answer.answer_text">{{answer.answer_text}}</p>
                            <div class="alert alert-light border-1 border-left-3 border-left-warning" role="alert" v-else>
                                <div class="text-black-70">You didn't give any input.</div>
                            </div>
                        </div>
                        <div class="card-header">
                            <h4 class="card-title">Review</h4>
                        </div>
                        <div class="card-body">
                            <p v-if="answer.answer_review">{{answer.answer_review}}</p>
                            <div class="alert alert-light border-1 border-left-3 border-left-warning" role="alert" v-else>
                                <div class="text-black-70">Pending review by instructor.</div>
                            </div>
                        </div>
                    </div>
                    <div class="card" v-else-if="answer.answer_type=='textarea'">
                        <div class="card-header">
                            <h4 class="card-title">Answer</h4>
                        </div>
                        <div class="card-body">
                            <p v-if="answer.answer_text">{{answer.answer_text}}</p>
                            <div class="alert alert-light border-1 border-left-3 border-left-warning" role="alert" v-else>
                                <div class="text-black-70">You didn't give any input.</div>
                            </div>
                        </div>
                        <div class="card-header">
                            <h4 class="card-title">review</h4>
                        </div>
                        <div class="card-body">
                            <p v-if="answer.answer_review">{{answer.answer_review}}</p>
                            <div class="alert alert-light border-1 border-left-3 border-left-warning" role="alert" v-else>
                                <div class="text-black-70">Pending review by instructor.</div>
                            </div>
                        </div>

                    </div>
                    <div class="card" v-else-if="answer.answer_type=='richtext'">
                        <div class="card-header">
                            <h4 class="card-title">Answer</h4>
                        </div>
                        <div class="card-body">
                            <div v-html="answer.answer_text" v-if="answer.answer_text"></div>
                            <div class="alert alert-light border-1 border-left-3 border-left-warning" role="alert" v-else>
                                <div class="text-black-70">You didn't give any input.</div>
                            </div>
                        </div>
                        <div class="card-header">
                            <h4 class="card-title">review</h4>
                        </div>
                        <div class="card-body">
                            <p v-if="answer.answer_review">{{answer.answer_review}}</p>
                            <div class="alert alert-light border-1 border-left-3 border-left-warning" role="alert" v-else>
                                <div class="text-black-70">Pending review by instructor.</div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="nav d-block " role="tablist">
                            <button :class="{'btn btn-white disabled':index===0,'btn btn-white':index>0}" @click="showQuestion(index-1)">Previous</button>
                            <button :class="{'btn btn-primary float-right':index<totalQuestions-1,'btn btn-primary float-right disabled':index==totalQuestions-1}" @click="showQuestion(index+1)">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2 col-sm-3">
            <div class="card">
                <div class="card-body text-center">
                    <router-link :to="{name:'quiz-instructions',params:{id:quiz.id,slug:quiz.lesson.slug}}" class="btn btn-primary">Retake <i class="material-icons btn__icon--right">replay</i></router-link>
                </div>
            </div>
            <div class="card">
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">

                    <a :class="{'nav-link active':index==0,'nav-link':index!==0}" :id="`question_${index}-tab`" data-toggle="pill" :href="`#question_${index}`" role="tab" :aria-controls="`question_${index}`" :aria-selected="index==0" v-for="(answer,index) in answers">
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
                result:  [],
                answers: [],
                quiz:    [],
            }
        },
        created() {
            
        },
        mounted() {
            this.getQuiz();
        },
        components: {},
        computed:   {
            correctAnswers() {
                let answers = this.answers;
                let count = 0;
                for (let i = 0; i < answers.length; i++) {
                    answers[i].correct ? count++ : count;
                }
                return count;
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
            totalQuestions() {
                return this.answers.length;
            },
        },
        methods:    {
            getQuiz() {
                axios.get(`/api/quizes/${this.$route.params.id}/review`)
                    .then(({data}) => {
                        this.quiz = data.quiz;
                        this.result = data.result;
                        this.answers = data.result.answers;
                    });
            },
            showQuestion(index) {
                if (index >= 0 && index < this.answers.length) {
                    jQuery(".tab-pane").removeClass('active show');
                    jQuery(`#question_${index}`).addClass('active show');
                    jQuery(".nav-link").attr("aria-selected", "false").removeClass('active show');
                    jQuery(`#question_${index}-tab`).addClass('active show').attr("aria-selected", "true");
                    
                }
            }
        },
    }
</script>

