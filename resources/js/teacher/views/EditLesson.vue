<template>
    <div>
        <vue-headful
                :title="pageTitle + ' | OpenAcademi'"
                description="As an instructor, you can edit a new lesson at openacademi.com"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
                :button="{title:'Update',method:editLesson,class:'btn btn-success'}"
        ></breadcrumb-component>
        <div class="card">
            <div class="card-body">
                <form action="javascript:void(0)" id="lessonForm" @submit="editLesson">
                    <div class="form-group row">
                        <label for="avatar" class="col-sm-3 col-form-label form-label">Preview Image</label>
                        <div class="col-sm-9">
                            <div class="media align-items-center" v-viewer="{movable: false}">
                                <div class="media-left" v-if="lesson_image_preview">
                                    <img :src="lesson_image_preview" alt="" width="100" style="cursor: pointer;" class="rounded">
                                </div>
                                <div class="media-left" v-else-if="lesson.lesson_image_preview">
                                    <img :src="lesson.lesson_image_preview" style="cursor: pointer;" alt="" width="100" class="rounded">
                                </div>
                                <div class="media-body">
                                    <div class="custom-file" style="width: auto;">
                                        <input type="file" id="avatar" class="custom-file-input" v-on:change="lessonImagePreviewChanged">
                                        <label for="avatar" class="custom-file-label">Choose file</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="title" class="col-md-3 col-form-label form-label">Title</label>
                        <div class="col-md-6">
                            <input id="title" type="text" class="form-control" placeholder="Write an awesome title" v-model="lesson.title">
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
                                            <input type="checkbox" id="video_image" class="custom-control-input" v-model="lesson_video_image" @change="mediaChanged">
                                            <label class="custom-control-label" for="video_image">Yes</label>
                                        </div>
                                        <label class="form-label" for="video_image">Toggle Image/Video</label>

                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="card" v-if="lesson_image || lesson_video || lesson.lesson_image">
                                        <div class="card-body" v-if="lesson_video_image">
                                            <video style="max-width: 100%" controls>
                                                <source :src="lesson_video" id="lesson_video">
                                                Your browser does not support HTML5 video.
                                            </video>

                                        </div>
                                        <div class="card-body" v-else v-viewer="{movable: false}">
                                            <img :src="lesson_image" style="max-width: 100%; cursor: pointer;" alt="" class="thumbnail" v-if="lesson_image">
                                            <img :src="lesson.lesson_image" style="max-width: 100%; cursor: pointer;" alt="" class="thumbnail image" v-else-if="lesson.lesson_image">

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
                            <label class="form-label" for="duration">Duration ({{timePicker.HH + " Hrs " + timePicker.mm + " Mins and " + timePicker.ss + " Secs"}})</label>
                            <div class="custom-control">
                                <time-picker id="duration" v-model="timePicker" format="HH:mm:ss"></time-picker>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <label class="form-label" for="purchased">Publish Lesson</label><br>
                            <div class="custom-control custom-checkbox-toggle custom-control-inline mr-1">
                                <input type="checkbox" id="purchased" class="custom-control-input" v-model="lesson.published">
                                <label class="custom-control-label" for="purchased">{{lesson.published}}</label>
                            </div>
                            <label class="form-label" for="purchased">{{lesson.published}}</label>
                        </div>
                        <div class="col-sm-4">
                            <label class="form-label" for="freeLesson">Free Lesson?</label><br>
                            <div class="custom-control custom-checkbox-toggle custom-control-inline mr-1">
                                <input type="checkbox" id="freeLesson" class="custom-control-input" v-model="lesson.free_lesson">
                                <label class="custom-control-label" for="freeLesson">{{lesson.free_lesson}}</label>
                            </div>
                            <label class="form-label" for="freeLesson">{{lesson.free_lesson}}</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-success">Update</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Downloadable Files</h4>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th class="text-center">?</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(file,index) in lesson.media" :class="{ 'table-warning': !lesson.downloadable_files_id.includes(file.id) }">
                            <td class="text-muted">{{index + 1}}</td>
                            <td><a :href="'/uploads/'+file.id+'/'+file.file_name">{{file.file_name}}</a></td>
                            <td class="text-muted">{{file.size}} KB</td>
                            <td class="text-center">
                                <a :href="'/uploads/'+file.id+'/'+file.file_name" class="btn btn-sm btn-outline-primary" :title="`Download ${file.file_name}`"><i class="material-icons">file_download</i></a>
                                <button class="btn btn-sm btn-outline-danger font-weight-bolder" :title="`Remove ${file.name}`" @click="removeDownload(file.id,file.name)" v-if="lesson.downloadable_files_id.includes(file.id)"><i class="material-icons">close</i></button>
                                <button class="btn btn-sm btn-outline-success font-weight-bolder" :title="`Include ${file.name}`" @click="includeDownload(file.id,file.name)" v-else><i class="material-icons">add</i></button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <button type="submit" form="lessonForm" class="btn btn-success pull">Update</button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Upload Files</h4>
            </div>
            <div class="card-body">
                <v-uploader language="en" :multiple="true" :itemLimit="0" :fileParams="uploadFileParams" uploadFileObjName="downloadable_files" fileTypeExts="jpeg,jpg,gif,png,aac,svg,html,css,js,php,mp3,mp4,doc,docx,xls,xlsx,pdf,ppt,pptx,zip,7z" fileSizeLimit="25MB" @done="fileUploaded"></v-uploader>
            </div>
        </div>
        <div class="form-group">
            <button type="submit" form="lessonForm" class="btn btn-success float-right">Update</button>
        </div>
    </div>

</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import Timepicker from 'vue2-timepicker';

    export default {
        data() {
            return {
                breadcrumbs:          [
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
                editor:               ClassicEditor,
                lesson_video_image:   null,
                lesson_image_preview: null,
                lesson_image:         null,
                lesson_video:         '',
                media_title:          '',
                uploadFileParams:     {
                    model_name: 'Lesson',
                    file_key:   'downloadable_files',
                    bucket:     'downloadable_files'
                },

            }
        },
        created() {
            this.$store.dispatch('lessons/fetch_edit', this.$route.params.id);
        },
        mounted() {
        },
        components: {
            'ckeditor':    CKEditor.component,
            'time-picker': Timepicker,
        },
        computed:   {
            ...mapState(
                {
                    lesson:    state => state.lessons.lesson,
                    courses:   state => state.lessons.courses,
                    pageTitle: state => state.lessons.pageTitle,
                })
            ,
            timePicker: {
                get: function () {
                    return this.$store.state.lessons.timePicker;
                },
                // setter
                set: function (time) {
                    this.$store.state.lessons.timePicker.HH = time.HH;
                    this.$store.state.lessons.timePicker.mm = time.mm;
                    this.$store.state.lessons.timePicker.ss = time.ss;
                    this.timePickerChanged(time);
                }
            }
        },
        methods:    {
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
            editLesson: function () {
                this.$store.dispatch('lessons/edit', this.lesson);
            },
            fileUploaded(files) {
                for (let i = 0; i < files.length; i++) {
                    let file = files[i].files;
                    if (file && Array.isArray(file) && file.length) {
                        for (let j = 0; j < file.length; j++) {
                            let downloadableFiles = this.lesson.downloadable_files_id;
                            downloadableFiles.push(file[j].id);
                            this.lesson.downloadable_files_id = [...new Set(downloadableFiles)];
                        }
                    }
                }
            },
            getArray(obj) {
                let arr = Object.keys(obj).map(function (key) {
                    return [Number(key), obj[key]];
                });

                return arr;
            },
            includeDownload(id, name) {
                let downloadableFiles = this.lesson.downloadable_files_id;
                downloadableFiles.push(id);
                this.lesson.downloadable_files_id = [...new Set(downloadableFiles)];
                jQuery.notify({
                    // options
                    message: `${name} has been included.`,
                }, {
                    // settings
                    type: 'success',
                });
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
            mediaChanged(){

            },
            removeDownload(id, name) {
                let downloadableFiles = this.lesson.downloadable_files_id;
                downloadableFiles.splice(downloadableFiles.indexOf(id), 1);
                this.lesson.downloadable_files_id = [...new Set(downloadableFiles)];
                jQuery.notify({
                    // options
                    message: `${name} has been removed.`,
                }, {
                    // settings
                    type: 'success',
                });
            },
            timePickerChanged(t) {
                this.lesson.duration = (Number(t.HH) * 3600) + (Number(t.mm) * 60) + (Number(t.ss));
            }
        }
    }
</script>
