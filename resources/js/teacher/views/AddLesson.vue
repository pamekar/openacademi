<template>
    <div>
        <vue-headful
                :title="pageTitle + ' - OpenAcademi'"
                description="As an instructor, you can add a new lesson at openacademi.com"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
                :button="{title:'Save',method:addLesson,class:'btn btn-success'}"
        ></breadcrumb-component>
        <div class="card">
            <div class="card-body">
                <form action="#">
                    <div class="form-group row">
                        <label for="avatar" class="col-sm-3 col-form-label form-label">Preview</label>
                        <div class="col-sm-9">
                            <div class="media align-items-center">
                                <div class="media-left" v-if="lesson.lesson_image_preview">
                                    <img :src="lesson.lesson_image_preview" alt="" width="100" class="rounded">
                                </div>
                                <div class="media-body">
                                    <div class="custom-file" style="width: auto;">
                                        <input type="file" id="avatar" class="custom-file-input" v-on:change="lessonPreviewImageChanged">
                                        <label for="avatar" class="custom-file-label">Choose file</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="title" class="col-md-3 col-form-label form-label">Title</label>
                        <div class="col-md-6">
                            <input id="title" type="text" class="form-control" placeholder="Write an awesome title">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="course" class="col-md-3 col-form-label form-label">Course</label>
                        <div class="col-md-4">
                            <select id="course" class="custom-control custom-select form-control" v-model="lesson.course_id">
                                <option :value="null" disabled>Attach to a course</option>
                                <option :value="course.id" v-for="course in courses">{{course.title}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-3 col-form-label form-label">Upload Video</label>
                        <div class="col-md-9">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <input type="text" class="form-control" value="https://player.vimeo.com/video/97243285?title=0&amp;byline=0&amp;portrait=0">
                                        <small class="form-text text-muted d-flex align-items-center">
                                            <i class="material-icons font-size-16pt mr-1">ondemand_video</i>
                                            <span class="icon-text">Paste Video</span>
                                        </small>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div class="embed-responsive embed-responsive-16by9">
                                            <iframe class="embed-responsive-item" src="https://player.vimeo.com/video/97243285?title=0&amp;byline=0&amp;portrait=0" allowfullscreen=""></iframe>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-3 col-form-label form-label" for="description">Description</label>
                        <div class="col-md-9">
                            <ckeditor id="description" :editor="editor" v-model="lesson.full_text"></ckeditor>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-3 col-form-label form-label" for="summary">Summary</label>
                        <div class="col-md-9">
                            <textarea id="summary" class="form-control" v-model="lesson.short_text" placeholder="Summarize the lesson in few words."></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-3 col-form-label form-label" for="duration">Duration</label>
                        <div class="col-md-9">
                            <time-picker id="duration" class="form-control" v-model="lesson.duration"></time-picker>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Files</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <v-uploader language="en" :multiple="true" :itemLimit="1" fileTypeExts="jpeg,jpg,gif,png,mp4" fileSizeLimit="25MB"></v-uploader>
                </div>
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
                breadcrumbs: [
                    {
                        title: "Dashboard", link: 'dashboard'
                    },
                    {
                        title: "Courses", link: 'show-courses'
                    },
                    {
                        title: ""
                    }
                ],
                editor:      InlineEditor,
                lesson:      {
                    title:       '',
                    course_id:   null,
                    short_text:  '',
                    full_text:   "<h3>Description</h3><p>Write Content ...</p><h3>What you'll learn</h3><ul><li>Item</li><li>Item</li><li>Item</li></ul><h3>Requirements</h3><ul><li>Item</li><li>Item</li><li>Item</li></ul>",
                    free_lesson: false,
                    duration:    '',
                    lesson_image_preview:''
                },
                pageTitle:   'Add New Lesson'

            }
        },
        created() {
            this.$store.dispatch('courses/fetch_list');
            this.$store.dispatch('courses/fetch_categories');
        },
        components: {
            'ckeditor':    CKEditor.component,
            'time-picker': Timepicker,
        },
        computed:   {
            ...mapState(
                {
                    courses:    state => state.courses.courses,
                    categories: state => state.courses.categories,
                })
        },
        methods:    {
            addLesson: function () {
                this.$store.dispatch('courses/edit', this.course);
            },
            lessonPreviewImageChanged(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.lesson.lesson_image_preview = e.target.result;
                };
                reader.readAsDataURL(file);
            },
        }
    }
</script>