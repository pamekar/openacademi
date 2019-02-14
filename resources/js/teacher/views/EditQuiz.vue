<template>
    <div>
        <vue-headful
                :title="pageTitle + ' - OpenAcademi'"
                :description="quiz.about_quiz"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
                :button="{title:'Save Quiz',method:editQuiz,class:'btn btn-success'}"
        ></breadcrumb-component>
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Basic</h4>
            </div>
            <div class="card-body">
                <form action="javascript:void(0)" @submit="editQuiz">
                    <div class="form-group row">
                        <label for="quiz_title" class="col-sm-3 col-form-label form-label">Quiz Title:</label>
                        <div class="col-sm-9">
                            <input id="quiz_title" type="text" class="form-control" placeholder="Title" v-model="quiz.title">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="course_title" class="col-sm-3 col-form-label form-label">Course:</label>
                        <div class="col-sm-9 col-md-4">
                            <select id="course_title" class="custom-select form-control" v-model="quiz.course_id">
                                <option :value="null" disabled>Attach to a course</option>
                                <option :value="course[0]" v-for="course in getArray(courses)">{{course[1]}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="lesson_title" class="col-sm-3 col-form-label form-label">Lesson:</label>
                        <div class="col-sm-9 col-md-4">
                            <select id="lesson_title" class="custom-select form-control" v-model="quiz.lesson_id">
                                <option :value="null" disabled>Choose to a lesson</option>
                                <option :value="lesson.id" v-for="lesson in lessons" v-if="lesson.course_id == quiz.course_id">{{lesson.title}}</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label form-label">Description:</label>
                        <div class="col-sm-9 col-md-9">
                            <ckeditor id="quiz_description" :editor="editor" v-model="quiz.description"></ckeditor>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-3 col-form-label form-label">About quiz:</label>
                        <div class="col-sm-9 col-md-9">
                            <textarea class="form-control" id="quiz_about_quiz" v-model="quiz.about_quiz" placeholder="What is this test for?"></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="cmn-toggle" class="col-sm-3 col-form-label form-label">Has Duration</label>
                        <div class="col-sm-9">
                            <div class="form-group">
                                <div class="custom-control custom-checkbox-toggle">
                                    <input id="cmn-toggle" type="checkbox" aria-checked="false" class="custom-control-input" role="switch" v-model="hasDuration">
                                    <label class="custom-control-label" for="cmn-toggle"><span class="sr-only">Duration</span></label>
                                </div>
                            </div>
                            <div class="custom-control" v-if="hasDuration">
                                <label for="cmn-toggle" class="col-sm-3 col-form-label form-label">Set Duration</label>
                                <div class="custom-control">
                                    <time-picker id="duration" v-model="timePicker" format="HH:mm:ss" @change="timePickerChanged"></time-picker>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="cmn-toggle" class="col-sm-3 col-form-label form-label">Published</label>
                        <div class="col-sm-9">
                            <div class="form-group">
                                <div class="custom-control custom-checkbox-toggle">
                                    <input type="checkbox" id="purchased" class="custom-control-input" v-model="quiz.published">
                                    <label class="custom-control-label" for="purchased">Yes</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row mb-0">
                        <div class="col-sm-9 offset-sm-3">
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!--
        drg >>> View Test questions, and add questions to test
        -->
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Questions</h4>
            </div>
            <div class="card-header">
                <a href="#" data-toggle="modal" data-target="#editQuiz" class="btn btn-outline-secondary">Add Question <i class="material-icons">add</i></a>
            </div>
            <div class="nestable" id="nestable">
                <ul class="list-group list-group-fit nestable-list-plain mb-0">
                    <li class="list-group-item nestable-item" v-for="question in quiz.questions">
                        <div class="media align-items-center">
                            <div class="media-left">
                                <a href="#" class="btn btn-default nestable-handle"><i class="material-icons">menu</i></a>
                            </div>
                            <div class="media-body">
                                {{question.question}}
                            </div>
                            <div class="media-right text-right">
                                <div style="width:100px">
                                    <a href="#" data-toggle="modal" data-target="#editQuiz" class="btn btn-primary btn-sm"><i class="material-icons">edit</i></a>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex';
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import InlineEditor from '@ckeditor/ckeditor5-build-inline';
    import Timepicker from 'vue2-timepicker'
    
    export default {
        data() {
            return {
                hasDuration: false,
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
                editor:      InlineEditor,
            }
        },
        created() {
            this.$store.dispatch('quizes/fetch_edit', this.$route.params.id);
        },
        components: {
            'ckeditor':    CKEditor.component,
            'time-picker': Timepicker,
        },
        computed:   {
            ...mapState(
                {
                    quiz:       state => state.quizes.quiz,
                    courses:    state => state.quizes.courses,
                    lessons:    state => state.quizes.lessons,
                    pageTitle: state => state.quizes.pageTitle,
                })
        },
        methods:    {
            editQuiz: function () {
                this.$store.dispatch('quizes/edit', this.quiz);
            },
            getArray(obj) {
                // drg >> convert JSON object into array
                let arr = Object.keys(obj).map(function (key) {
                    return [Number(key), obj[key]];
                });
                
                return arr;
            },
            timePickerChanged(e) {
                let t = e.data;
                let time = (Number(t.HH) * 3600) + (Number(t.mm) * 60) + (Number(t.ss));
                this.quiz.duration = time;
            },
        }
    }
</script>