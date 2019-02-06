<template>
    <div>
        <vue-headful
                :title="pageTitle + ' - OpenAcademi'"
                :description="course.summary"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
                :button="{title:'Save',method:addCourse,class:'btn btn-success'}"
        ></breadcrumb-component>

        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h3>Upload <strong v-if="course_video_image">Video</strong><strong v-else>Image</strong></h3>
                    </div>
                    <div class="card-body">
                        <div class="custom-control custom-checkbox-toggle custom-control-inline mr-1">
                            <input type="checkbox" id="video_image" class="custom-control-input" v-model="course_video_image"> <!--v-on:change="changeMediaType"-->
                            <label class="custom-control-label" for="video_image">Yes</label>
                        </div>
                        <label class="form-label" for="video_image">Change to <span v-if="course_video_image"> image</span><span v-else>Video</span></label>

                    </div>
                    <div class="card-body" v-if="course_video_image">
                        <video style="width:100%;" controls>
                            <source :src="course_video" width="100%" id="course_video">
                            Your browser does not support HTML5 video.
                        </video>

                    </div>
                    <div class="card-body" v-else v-viewer="{movable: false}">
                        <img :src="course_image" style="max-width:80%; margin-left:10%; cursor: pointer;" alt="" class="thumbnail" v-if="course_image">
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <div class="custom-file" v-if="course_video_image">
                                <input type="file" id="course_video_input" class="file_multi_video" accept="video/*" v-on:change="courseVideoChanged">
                                <label for="course_video_input" class="custom-file-label">Choose Video</label>
                            </div>
                            <div class="custom-file" v-else>
                                <input type="file" id="course_image_input" class="custom-file-input" accept="image/*" v-on:change="courseImageChanged">
                                <label for="course_image_input" class="custom-file-label">Choose Image</label>

                            </div>
                        </div>
                    </div>
                    <div class="card-footer" v-if="media_title">
                        <small>{{media_title}}</small>
                    </div>

                </div>
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Basic Information</h4>
                    </div>
                    <div class="card-body">
                        <form action="javascript:void(0)" @submit="addCourse">

                            <div class="form-group">
                                <label class="form-label" for="title">Title</label>
                                <input type="text" id="title" class="form-control" placeholder="Write a title" v-model="course.title" value="" required>
                            </div>

                            <div class="form-group mb-0">
                                <label class="form-label">Description</label>
                                <ckeditor :editor="editor" v-model="course.description"></ckeditor>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="title">Tags</label>
                                <input-tags id="tags" placeholder="Add a tag" v-model="course.tags" validate="text" :limit="3"></input-tags>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Meta</h4>
                        <p class="card-subtitle">Extra Options </p>
                    </div>

                    <form class="card-body" action="javascript:void(0)" @submit="addCourse">

                        <div class="form-group">
                            <label class="form-label" for="category">Category</label>
                            <select id="category" class="custom-select form-control" v-model="course.category" required>
                                <option :value="null" disabled>Choose a category</option>
                                <option :value="category.id" v-for="category in categories">{{category.title}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="summary">Summary</label>
                            <textarea id="summary" class="form-control" placeholder="Course Summary" v-model="course.summary" maxlength="60" required></textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="price">Price</label>
                            <vue-numeric currency="NGN" id="price" class="form-control" separator="," v-model="course.price" required></vue-numeric>

                            <!--    <input type="text" id="price" class="form-control" placeholder="No. of Days" value="10">-->
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="start">Start Date</label>
                            <input id="start" type="date" class="form-control" placeholder="Start Date" data-toggle="flatpickr" v-model="course.start_date" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="end">End Date</label>
                            <input id="end" type="date" class="form-control" placeholder="Start Date" data-toggle="flatpickr" v-model="course.end_date" required>
                        </div>
                        <div class="form-group">
                            <label for="image_preview" class="form-label">Preview Image</label>
                            <div class="">

                                <div class="card-body" v-if="course_image_preview" v-viewer="{movable: false}">
                                    <img :src="course_image_preview" style=" width:80%; margin-left: 10%; cursor: pointer;" alt="" class="rounded">
                                </div>
                                <div>
                                    <div class="custom-file" style="width: auto;">
                                        <input type="file" id="image_preview" class="custom-file-input" v-on:change="courseImagePreviewChanged">
                                        <label for="image_preview" class="custom-file-label">Choose file</label>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="flex">
                            <label class="form-label" for="purchased">Publish your lesson</label><br>
                            <div class="custom-control custom-checkbox-toggle custom-control-inline mr-1">
                                <input type="checkbox" id="purchased" class="custom-control-input" v-model="course.published">
                                <label class="custom-control-label" for="purchased">Yes</label>
                            </div>
                            <label class="form-label" for="purchased">Yes</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex';
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import InlineEditor from '@ckeditor/ckeditor5-build-inline';
    import InputTag from 'vue-input-tag';
    import VueNumeric from 'vue-numeric';

    export default {
        data() {
            return {
                editor:               InlineEditor,
                editorConfig:         {},
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
                pageTitle:            'Add New Course',
                course:               {
                    title:       '',
                    category:    null,
                    tags:        [],
                    summary:     '',
                    description: "<h3>Description</h3><p>Write Content ...</p><h3>What you'll learn</h3><ul><li>Item</li><li>Item</li><li>Item</li></ul><h3>Requirements</h3><ul><li>Item</li><li>Item</li><li>Item</li></ul>",
                    price:       '',
                    start_date:  '',
                    end_date:    '',
                    published:   '',
                },
                course_image_preview: null,
                course_image:         null,
                course_video:         null,
                course_video_image:   null,
                media_title:          null
            }
        },
        created() {

        },
        mounted() {
            this.$store.dispatch('courses/fetch_empty');
            this.$store.dispatch('courses/fetch_categories');
        },
        components: {
            'ckeditor':    CKEditor.component,
            'vue-numeric': VueNumeric,
            'input-tags':  InputTag
        },
        computed:   {
            ...mapState(
                {
                    categories: state => state.courses.categories,
                })
        },
        methods:    {
            addCourse:       function () {
                this.$store.dispatch('courses/add', this.course);
            },
            changeMediaType: function (e) {
                this.course.course_image_type = this.course_video_image ? 'video' : 'image';
            },
            createImage(file) {
                let reader = new FileReader();
                this.media_title = file.name;

                reader.onload = (e) => {
                    this.course_image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            createImagePreview(file) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.course_image_preview = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            getArray(obj) {
                let arr = Object.keys(obj).map(function (key) {
                    return [Number(key), obj[key]];
                });

                return arr;
            },
            courseImagePreviewChanged(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.course.course_image_preview = files[0];
                this.createImagePreview(files[0]);
            },
            courseImageChanged(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.course.course_image = files[0];
                this.createImage(files[0]);
            },
            courseVideoChanged(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.course.course_image = files[0];
                var source = jQuery('#course_video');
                this.course_video = URL.createObjectURL(files[0]);
                source.parent()[0].load();
            },
            
        }

    }
</script>
