<template>
    <div>
        <vue-headful
                :title="pageTitle + ' | OpenAcademi'"
                description="As an instructor, you can add a new lesson at openacademi.com"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
                :button="{title:'Save',method:addLesson,class:'btn btn-success'}"
        ></breadcrumb-component>
        <div class="card">
            <div class="card-body">
                <form action="javascript:void(0)" @submit="addLesson">
                    <input type="submit" style="display: none">
                    <div class="form-group row">
                        <label for="image_preview" class="col-sm-3 col-form-label form-label">Preview Image</label>
                        <div class="col-sm-9">
                            <div class="media align-items-center">
                                <div class="media-left" v-if="lesson_image_preview" v-viewer="{movable: false}">
                                    <img :src="lesson_image_preview" style="cursor: pointer;" alt="" width="100" class="rounded">
                                </div>
                                <div class="media-body">
                                    <div class="custom-file" style="width: auto;">
                                        <input type="file" id="image_preview" class="custom-file-input" v-on:change="lessonImagePreviewChanged">
                                        <label for="image_preview" class="custom-file-label">Choose file</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="title" class="col-md-3 col-form-label form-label">Title</label>
                        <div class="col-md-6">
                            <input id="title" type="text" class="form-control" placeholder="Write an awesome title" v-model="lesson.title" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="course" class="col-md-3 col-form-label form-label">Course</label>
                        <div class="col-md-4">
                            <select id="course" class="custom-control custom-select form-control" v-model="lesson.course_id">
                                <option :value="null" disabled>Attach to a course</option>
                                <option :value="course[0]" v-for="course in getArray(courses)">{{course[1]}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-3 col-form-label form-label">Upload <strong v-if="lesson_video_image">Video</strong><strong v-else>Image</strong></label>
                        <div class="col-md-9">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <div class="custom-file" v-if="lesson_video_image">
                                            <input type="file" id="lesson_video_input" class="file_multi_video" accept="video/*" v-on:change="lessonVideoChanged">
                                            <label for="lesson_video_input" class="custom-file-label">Choose file</label>
                                        </div>
                                        <div class="custom-file" v-else>
                                            <input type="file" id="lesson_image_input" class="custom-file-input" accept="image/*" v-on:change="lessonImageChanged">
                                            <label for="lesson_image_input" class="custom-file-label">Choose file</label>

                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="custom-control custom-checkbox-toggle custom-control-inline mr-1">
                                            <input type="checkbox" id="video_image" class="custom-control-input" v-model="lesson_video_image">
                                            <label class="custom-control-label" for="video_image">Yes</label>
                                        </div>
                                        <label class="form-label" for="video_image">Toggle Image/Video</label>

                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card" v-if="lesson_image || lesson_video || lesson.lesson_image">
                                        <div class="card-body" v-if="lesson_video_image">
                                            <video width="400" controls>
                                                <source :src="lesson_video" width="100%" id="lesson_video">
                                                Your browser does not support HTML5 video.
                                            </video>

                                        </div>
                                        <div class="card-body" v-else v-viewer="{movable: false}">
                                            <img :src="lesson_image" style="max-width:100%; cursor: pointer;" alt="" class="thumbnail" v-if="lesson_image">
                                        </div>
                                        <div class="card-footer" v-if="media_title">
                                            <small>{{media_title}}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-md-3 col-form-label form-label" for="description">Description</label>
                        <div class="col-md-9 card">
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
                        <div class="col-sm-4">
                            <label class="form-label" for="duration">Duration</label>
                            <div class="custom-control">
                                <time-picker id="duration" v-model="timePicker" format="HH:mm:ss" @change="timePickerChanged"></time-picker>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <label class="form-label" for="purchased">Publish Lesson</label><br>
                            <div class="custom-control custom-checkbox-toggle custom-control-inline mr-1">
                                <input type="checkbox" id="purchased" class="custom-control-input" v-model="lesson.published">
                                <label class="custom-control-label" for="purchased">Yes</label>
                            </div>
                            <label class="form-label" for="purchased">Yes</label>
                        </div>
                        <div class="col-sm-4">
                            <label class="form-label" for="freeLesson">Free Lesson?</label><br>
                            <div class="custom-control custom-checkbox-toggle custom-control-inline mr-1">
                                <input type="checkbox" id="freeLesson" class="custom-control-input" v-model="lesson.free_lesson">
                                <label class="custom-control-label" for="freeLesson">Yes</label>
                            </div>
                            <label class="form-label" for="freeLesson">Yes</label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script>
    import {mapState} from 'vuex';
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import Timepicker from 'vue2-timepicker'

    export default {
        data() {
            return {
                breadcrumbs:           [
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
                editor:                ClassicEditor,
                uploadFileParams:      {
                    model_name: 'Lesson',
                    file_key:   'resource_files',
                    bucket:     'resource_files'
                },
                lesson:                {
                    title:                '',
                    course_id:            null,
                    resource_files_id:    [],
                    short_text:           '',
                    full_text:            "<h3>Lesson content</h3><p>Write Content ...</p><h3>Sample List</h3><ul><li>Item</li><li>Item</li><li>Item</li></ul>",
                    free_lesson:          false,
                    published:            false,
                    duration:             0,
                    lesson_image_preview: '',
                    lesson_image:         ''
                },
                pageTitle:             'Add New Lesson',
                lesson_image_preview:  null,
                lesson_image:          null,
                lesson_video:          null,
                lesson_video_image:    '',
                media_title:           null,
                timePicker:            {
                    HH: "",
                    mm: "",
                    ss: ""
                },
            }
        },
        created() {
            this.$store.dispatch('lessons/fetch_courses');
            this.lesson.course_id = this.$route.params.id;
        },
        components: {
            'ckeditor':    CKEditor.component,
            'time-picker': Timepicker,
        },
        computed:   {
            ...mapState(
                {
                    courses: state => state.lessons.courses,
                }),
            resource_files: {
                get: function () {
                    return this.resource_files_id;
                },
                set: function (id) {
                    this.resource_files_id.push(id);
                }
            }

        },
        methods:    {
            addLesson: function () {
                this.$store.dispatch('lessons/add', this.lesson);
            },
            createImage(file) {
                let reader = new FileReader();
                this.media_title = file.name;
                reader.onload = (e) => {
                    this.lesson_image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            createImagePreview(file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.lesson_image_preview = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            fileUploaded(files) {
                for (let i = 0; i < files.length; i++) {
                    let file = files[i].files;
                    if (file && Array.isArray(file) && file.length) {
                        for (let j = 0; j < file.length; j++) {
                            let resourceFiles = this.lesson.resource_files_id;
                            resourceFiles.push(file[j].id);
                            this.lesson.resource_files_id = [...new Set(resourceFiles)];
                        }
                    }

                }
            },
            getArray(obj) {
                // drg >> convert JSON object into array
                let arr = Object.keys(obj).map(function (key) {
                    return [Number(key), obj[key]];
                });

                return arr;
            },
            lessonImagePreviewChanged(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.lesson.lesson_image_preview = files[0];
                this.createImagePreview(files[0]);
            },
            lessonImageChanged(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.lesson.lesson_image = files[0];
                this.createImage(files[0]);
            },
            lessonVideoChanged(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.lesson.lesson_image = files[0];
                var source = jQuery('#lesson_video');
                this.lesson_video = URL.createObjectURL(files[0]);
                source.parent()[0].load();
            },
            timePickerChanged(e) {
                let t = e.data;
                let time = (Number(t.HH) * 3600) + (Number(t.mm) * 60) + (Number(t.ss));
                this.lesson.duration = time;
            },
        },
    }
</script>