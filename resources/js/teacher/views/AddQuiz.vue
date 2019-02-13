<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Basic</h4>
            </div>
            <div class="card-body">
                <form action="javascript:void(0)" @submit="addQuiz">
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
                    </div><div class="form-group row">
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
                pageTitle:   'Add New Lesson',
                editor:      InlineEditor,
                quiz:        {
                    title:       '',
                    course_id:   null,
                    lesson_id:   null,
                    description: "<h3>Course content</h3><p>Write Content ...</p><h3>Sample List</h3><ul><li>Item</li><li>Item</li><li>Item</li></ul>",
                    published:   false,
                    duration:    0,
                },
                timePicker:  {
                    HH: "",
                    mm: "",
                    ss: ""
                }
            }
        },
        created() {
            this.$store.dispatch('quizes/fetch_add');
        },
        components: {
            'ckeditor':    CKEditor.component,
            'time-picker': Timepicker,
        },
        computed:   {
            ...mapState(
                {
                    courses: state => state.quizes.courses,
                    lessons: state => state.quizes.lessons
                })
        },
        methods:    {
            addQuiz: function () {
                this.$store.dispatch('quizes/add', this.quiz);
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