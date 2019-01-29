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

                        <div class="form-group">
                            <label class="form-label" for="title">Title</label>
                            <input type="text" id="title" class="form-control" placeholder="Write a title" v-model="course.title" value="">
                        </div>

                        <div class="form-group mb-0">
                            <label class="form-label">Description</label>
                            <ckeditor :editor="editor" v-model="course.description"></ckeditor>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Lessons</h4>
                    </div>
                    <div class="card-body">
                        <p><router-link :to="{name:'add-lesson'}" class="btn btn-primary">Add Lesson <i class="material-icons">add</i></router-link></p>
                        <div class="nestable" id="nestable-handles" v-on:change="reorderLessons">
                            <lessons-list-component :lessons="course.lessons"></lessons-list-component>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="embed-responsive embed-responsive-16by9">
                        <iframe class="embed-responsive-item" src="https://player.vimeo.com/video/97243285?title=0&amp;byline=0&amp;portrait=0" allowfullscreen=""></iframe>
                    </div>
                    <div class="card-body">
                        <input type="text" class="form-control" value="https://player.vimeo.com/video/97243285?title=0&amp;byline=0&amp;portrait=0"/>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Meta</h4>
                        <p class="card-subtitle">Extra Options </p>
                    </div>

                    <form class="card-body" action="#">
                        <div class="form-group">
                            <label class="form-label" for="category">Category</label>
                            <select id="category" class="custom-select form-control" v-model="course.category">
                                <option :value="category.id" v-for="category in categories">{{category.title}}</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="duration">Summary</label>
                            <textarea id="duration" class="form-control" placeholder="Course Summary" v-model="course.summary" maxlength="60"></textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="start">Start Date</label>
                            <input id="start" type="date" class="form-control" placeholder="Start Date" data-toggle="flatpickr" v-model="course.start_date">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="end">End Date</label>
                            <input id="end" type="date" class="form-control" placeholder="Start Date" data-toggle="flatpickr" v-model="course.end_date">
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
    import LessonsListComponent from '../components/LessonsListComponent.vue';

    export default {
        data() {
            return {
                editor:       InlineEditor,
                editorData:   '<p>Content of the editor.</p>',
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
            this.$store.dispatch('app/fetch');
            this.$store.dispatch('courses/fetch', this.$route.params.id);
        },
        mounted() {},
        components: {
            'ckeditor':               CKEditor.component,
            'lessons-list-component': LessonsListComponent
        },
        computed:   {
            ...mapState(
                {
                    course: state => state.courses.course,
                    categories: state => state.courses.categories,
                    pageTitle: state => state.courses.pageTitle
                })
        },
        methods:    {
            reorderLessons: function (event) {
                console.log(event.target.tagname);
                console.log('hippie');
            },
            editCourse:     function () {
                this.$store.dispatch('courses/edit',this.course);
            }

        }

    }
</script>
