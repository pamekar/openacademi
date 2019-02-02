<template>
    <div>

        <vue-headful
                :title="pageTitle + ' - OpenAcademi'"
                :description="course.summary"
        ></vue-headful>
        <breadcrumb-component
                :breadcrumbs="breadcrumbs"
                :title="pageTitle"
                :button="{title:'Save',method:editCourse,class:'btn btn-success'}"
        ></breadcrumb-component>

        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Basic Information</h4>
                    </div>
                    <div class="card-body">
                        <form action="javascript:void(0)" @submit="editCourse">

                            <div class="form-group">
                                <label class="form-label" for="title">Title</label>
                                <input type="text" id="title" class="form-control" placeholder="Write a title" v-model="course.title" value="" required>
                            </div>

                            <div class="form-group mb-0">
                                <label class="form-label">Description</label>
                                <div class="card">
                                    <ckeditor :editor="editor" v-model="course.description"></ckeditor>
                                </div>
                            </div>

                            <div class="form-group">
                                <label class="form-label" for="title">Tags</label>
                                <input-tags id="tags" placeholder="Add a tag" v-model="course.tags" validate="text" :limit="3"></input-tags>
                            </div>
                        </form>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Lessons</h4>
                    </div>
                    <div class="card-body">
                        <p>
                            <router-link :to="{name:'add-lesson'}" class="btn btn-primary">Add Lesson <i class="material-icons">add</i></router-link>
                        </p>
                        <div class="nestable" id="nestable-handles">
                            <lessons-list-component :lessons="course.lessons"></lessons-list-component>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div v-if="course.course_image_type == 'image'">
                        <img :src="course.course_image_main" :alt="course.slug" width="100%"/>
                    </div>
                    <div class="embed-responsive embed-responsive-16by9" v-if="course.course_image_type == 'video'">
                        <iframe class="embed-responsive-item" :src="course.course_image_main" allowfullscreen=""></iframe>
                    </div>
                    <div class="card-body">
                        <input type="text" class="form-control" value=""/>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Meta</h4>
                        <p class="card-subtitle">Extra Options </p>
                    </div>

                    <form class="card-body" action="javascript:void(0)" @submit="editCourse">

                        <div class="form-group">
                            <label class="form-label" for="category">Category</label>
                            <select id="category" class="custom-select form-control" v-model="course.category" required>
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
                        <div class="flex">
                            <label class="form-label" for="purchased">Publish your course</label><br>
                            <div class="custom-control custom-checkbox-toggle custom-control-inline mr-1">
                                <input type="checkbox" id="purchased" class="custom-control-input" v-model="course.published">
                                <label class="custom-control-label" for="purchased">{{course.published}}</label>
                            </div>
                            <label class="form-label" for="purchased">{{course.published}}</label>
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
    import LessonsListComponent from '../components/LessonsListComponent.vue';

    export default {
        data() {
            return {
                editor:       InlineEditor,
                editorConfig: {},
                breadcrumbs:  [
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
            }
        },
        created() {
            this.$store.dispatch('courses/fetch', this.$route.params.id);
        },
        mounted() {
        },
        components: {
            'ckeditor':               CKEditor.component,
            'lessons-list-component': LessonsListComponent,
            'vue-numeric':            VueNumeric,
            'input-tags':             InputTag
        },
        computed:   {
            ...mapState(
                {
                    course:     state => state.courses.course,
                    categories: state => state.courses.categories,
                    pageTitle:  state => state.courses.pageTitle
                })
        },
        methods:    {
            editCourse: function () {
                this.$store.dispatch('courses/edit', this.course);
            }
        }

    }
</script>
