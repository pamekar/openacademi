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
                        <vue-countdown-timer
                                @start_callback="startCallBack('event started')"
                                @end_callback="endCallBack()"
                                :start-time="start_at"
                                :end-time="end_at?end_at:started_at"
                                :interval="1000"
                                :start-label="'STARTS IN'"
                                :end-label="'TIME LEFT'"
                                label-position="end"
                                :end-text="'TIME UP!'"
                                :day-txt="'day'"
                                :hour-txt="'hrs'"
                                :minutes-txt="'min'"
                                :seconds-txt="'sec'">

                            <template slot="countdown" slot-scope="scope">
                                <div>
                                    <p class="pl-1 pr-1">
                                        <span v-if="scope.props.days>0"><span class="h5 text-primary">{{scope.props.days}}</span> {{scope.props.dayTxt}} </span><span class="h5 text-primary">{{scope.props.hours}}</span> {{scope.props.hourTxt}} <span class="h5 text-primary">{{scope.props.minutes}}</span> {{scope.props.minutesTxt}} <span class="h5 text-primary">{{scope.props.seconds}}</span> {{scope.props.secondsTxt}}
                                    </p>
                                </div>
                            </template>
                            <template slot="end-text" slot-scope="scope">
                                <strong class="text-danger">{{ scope.props.endText}}</strong>
                            </template>
                            <template slot="end-label" slot-scope="scope">
                                <span class="text-muted" v-if="scope.props.startLabel !== '' && scope.props.tips && scope.props.labelPosition === 'end'">{{scope.props.startLabel}}:</span>
                                <span class="text-muted" v-if="scope.props.endLabel !== '' && !scope.props.tips && scope.props.labelPosition === 'end'">{{scope.props.endLabel}}:</span>
                            </template>
                        </vue-countdown-timer>
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
                            <div class="form-group" v-for="(option,index1) in question.options">
                                <div class="custom-control custom-checkbox">
                                    <input :id="`answer-${index}${index1}`" :name="`answer-${index}`" type="radio" class="custom-control-input" :value="option.id" v-model="questions[index].answer">
                                    <label :for="`answer-${index}${index1}`" class="custom-control-label">{{option.option_text}}<i class="fa fa-check" v-if="option.correct"></i></label>
                                </div>
                            </div>
                        </div>
                        <div class="card-body" v-else-if="question.type=='input'">
                            <div class="form-group">
                                <label class="form-label" :for="`answer-${index}`">Your Answer:</label>
                                <input type="text" :name="`answer-${index}`" class="form-control" :id="`answer-${index}`" placeholder="Enter your answer" v-model="questions[index].answer">
                            </div>
                        </div>
                        <div class="card-body" v-else-if="question.type=='textarea'">
                            <div class="form-group">
                                <label class="form-label" :for="`answer-${index}`">Your Answer:</label>
                                <textarea :name="`answer-${index}`" class="form-control" :id="`answer-${index}`" placeholder="Enter your answer" v-model="questions[index].answer"></textarea>
                            </div>
                        </div>
                        <div class="card-body" v-else-if="question.type=='richtext'">
                            <div class="form-group">
                                <label class="form-label" :for="`answer-${index}`">Your Answer:</label>
                                <ckeditor :id="`answer-${index}`" :editor="editor" v-model="questions[index].answer"></ckeditor>
                            </div>
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
                <div class="card-body text-center">
                    <button class="btn btn-lg btn-success" @click="completeQuiz">Submit</button>
                </div>
            </div>
            <div class="card">
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">

                    <a :class="{'nav-link active':index==0,'nav-link':index!==0}" :id="`question_${index}-tab`" data-toggle="pill" :href="`#question_${index}`" role="tab" :aria-controls="`question_${index}`" :aria-selected="index==0" v-for="(question,index) in questions" @click="submitQuiz">
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
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import swal from 'sweetalert';

    export default {
        data() {
            return {
                editor:     ClassicEditor,
                result:     [],
                answers:    [],
                questions:  [],
                quiz:       [],
                started_at: (new Date).getTime() + 30000
            }
        },
        created() {

        },
        mounted() {
            this.getQuiz();
        },
        components: {
            'ckeditor': CKEditor.component
        },
        computed:   {
            start_at() {
                return this.started_at;
            },
            end_at() {
                return this.started_at + parseInt(this.quiz.duration);
            },
            pendingQuestions() {
                let count = 0;
                for (let i = 0; i < this.totalQuestions; i++) {
                    this.questions[i].answer === null ? count++ : count;
                }
                return count;
            },
            totalQuestions() {
                return this.questions.length
            }

        },
        methods:    {
            completeQuiz() {
                let message = this.pendingQuestions > 0 ? `You have ${this.pendingQuestions} pending question(s) to answer. ` : "";

                swal({
                    title:      "Are you sure?",
                    text:       `${message}Do you want to submit now?`,
                    icon:       "warning",
                    dangerMode: true,
                    buttons:    ["No!", "Submit!"],
                })
                    .then(willSubmit => {
                        if (willSubmit) {
                            this.endQuiz();
                        }
                        else {
                            this.submitQuiz();
                        }
                    });
            },
            endQuiz() {
                let questions = this.questions;
                let form_data = [];
                for (let i = 0; i < questions.length; i++) {
                    form_data.push({
                        question: questions[i].id,
                        answer:   questions[i].answer
                    });
                }
                axios.post(`/api/quizes/submit/${this.$route.params.id}/1`, form_data)
                    .then(({data}) => {
                        swal({
                            text: "Your quiz has been submitted successfully",
                            icon: "success",
                        });
                    });
                this.$emit('completed');
            },
            getQuiz() {
                axios.get(`/api/quizes/${this.$route.params.id}`)
                    .then(({data}) => {
                        this.quiz = data.quiz;
                        this.questions = data.questions;
                        this.result = data.result;
                    });
                axios.get(`/api/quizes/start/${this.$route.params.id}`)
                    .then(({data}) => {
                        this.started_at = parseInt(data);
                    });
            },
            showQuestion(index) {
                if (index >= 0 && index < this.questions.length) {
                    jQuery(".tab-pane").removeClass('active show');
                    jQuery(`#question_${index}`).addClass('active show');
                    jQuery(".nav-link").attr("aria-selected", "false").removeClass('active show');
                    jQuery(`#question_${index}-tab`).addClass('active show').attr("aria-selected", "true");

                }
                this.submitQuiz();
            },
            submitQuiz() {
                let questions = this.questions;
                let form_data = [];
                for (let i = 0; i < questions.length; i++) {
                    form_data.push({
                        question: questions[i].id,
                        answer:   questions[i].answer
                    });
                }
                axios.post(`/api/quizes/submit/${this.$route.params.id}`, form_data)
                    .then(({data}) => {
                    });
            },
            startCallBack: function (x) {
            },
            endCallBack:   function (x) {
                this.endQuiz();
            }
        }
    }
</script>

