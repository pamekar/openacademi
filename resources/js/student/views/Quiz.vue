<template>
    <div>
        <vue-headful
                :title="pageTitle + ' | OpenAcademi'"
                :description="quiz.description"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
        ></breadcrumb-component>
        <div class="row">
            <div class="col-md-10 col-sm-9">
                <div class="card-group">
                    <div class="card">
                        <div class="card-body text-center">
                            <h4 class="text-primary mb-0"><strong>{{questions.length}}</strong></h4>
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
                            <div class="text-secondary mb-0"><h5 class="countdown" :data-value="timer" data-unit="seconds"></h5></div>
                            <small class="text-muted">TIME LEFT</small>
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
                                    <div v-if="question.question_image.length>0" v-viewer="{movable: false}" class="text-center">
                                        <img class="img-thumbnail" :src="question.question_image" style="cursor: pointer; max-width:60%;">
                                    </div>
                                    <div v-html="question.question"></div>
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
                            <a href="#" :class="{'btn btn-white disabled':questionIndex===0,'btn btn-white':questionIndex>0}">Previous</a>
                            <a href="#" :class="{'btn btn-primary float-right':questionIndex<questions.length-1,'btn btn-primary float-right disabled':questionIndex==questions.length-1}">Next<i class="material-icons btn__icon--right">send</i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2 col-sm-3">
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">

                    <a :class="{'nav-link active':index==0,'nav-link':index!==0}" :id="`question_${index}-tab`" data-toggle="pill" :href="`#question_${index}`" role="tab" :aria-controls="`question_${index}`" :aria-selected="index==0" v-for="(question,index) in questions" @click="questionIndex=index">
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
    import LessonsListComponent from '../components/LessonsListComponent.vue'
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

    export default {
        data() {
            return {
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
                questionIndex: 0,
                editor:          ClassicEditor,
                pageTitle:       "",
                result:          [],
                questions:   [],
                quiz:        [],
            }
        },
        created() {
            this.getQuiz();
        },
        mounted() {
            
        },
        components: {
            'lessons-list-component': LessonsListComponent,
            'ckeditor':               CKEditor.component,

        },
        methods:    {
            getQuiz() {
                axios.get(`/api/quizes/${this.$route.params.id}`)
                    .then(({data}) => {
                        this.quiz = data.quiz;
                        this.pageTitle = data.quiz.title;
                        this.breadcrumbs[2].title = data.quiz.title;
                        this.questions = data.quiz.questions;
                        this.result = data.result
                    });
            },
        },
        props:      ['slug'],
        computed:   {
            timer() {
                
            }
        }
    }
</script>
<style>
    [dir=ltr] .nav-pills .nav-link.active:hover, [dir=ltr] .nav-pills .show > .nav-link:hover {
        color: #fff;
        background-color: #2196f3;
    }
</style>
