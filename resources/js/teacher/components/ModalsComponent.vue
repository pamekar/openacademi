<template>
    <div>
        <div class="modal fade" id="editQuestion">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title text-white">Edit Question</h4>
                        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="javascript:void(0)" @submit="create_updateQuestion">
                            <div class="form-group row">
                                <label class="col-form-label form-label col-md-3">Question:</label>
                                <div class="col-md-9">
                                    <ckeditor id="question_content" :editor="classicEditor" v-model="question.question"></ckeditor>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="avatar" class="col-sm-3 col-form-label form-label">Quiz Image</label>
                                <div class="col-sm-9 row">
                                    <div :class="question_image || question.question_image? 'col-md-6':''">
                                        <div class="custom-file" style="width: auto;">
                                            <label class="custom-file-label">Choose Image</label>
                                            <input type="file" id="avatar" class="custom-file-input" accept="image/*" v-on:change="questionImageChanged">

                                        </div>
                                    </div>
                                    <div class="col-md-6" v-if="question_image || question.question_image">
                                        <img :src="question_image" style="max-width:80%; margin-left:10%; cursor: pointer;" alt="" class="thumbnail" v-if="question_image">
                                        <img :src="question.question_image" style="max-width:80%; margin-left:10%; cursor: pointer;" alt="" class="thumbnail" v-else-if="question.question_image">
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="type" class="col-form-label form-label col-md-3">Type:</label>
                                <div class="col-md-4">
                                    <select id="type" class="custom-control custom-select form-control" v-model="question.type">
                                        <option value="input">Input</option>
                                        <option value="textarea">Textarea</option>
                                        <option value="richtext">Richtext</option>
                                        <option value="radio">Radio</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="touch-spin-2" class="col-form-label form-label col-md-3">Question Score:</label>
                                <div class="col-md-4">
                                    <input id="touch-spin-2" data-toggle="touch-spin" data-min="0" data-max="100" data-step="5" type="text" name="demo2" class="form-control" v-model="question.score"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="touch-spin-2" class="col-form-label form-label col-md-3">Tests:</label>
                                <div class="col-md-9">
                                    <multiselect v-model="question.tests" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="title" track-by="value" :options="tests" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-8 offset-md-3">
                                    <button type="submit" class="btn btn-success">Save</button>
                                </div>
                            </div>
                        </form>
                        <div class="card" v-if="question.options && question.type==='radio'">
                            <div class="card-header">
                                <h4 class="card-title">Options</h4>
                            </div>

                            <div class="card-body">
                                <div class="card-body" v-if="question.options.length>0">
                                    <div class="form-group float-left" v-if="question.options.length<5">
                                        <div class="form-label">Add Options</div>
                                        <div class="custom-control custom-checkbox-toggle custom-control-inline mr-1">
                                            <input type="checkbox" class="custom-control-input" id="add-options" v-model="addOptions">
                                            <label class="custom-control-label" for="add-options">{{addOptions}}</label>
                                        </div>
                                        <label class="form-label" for="add-options">{{addOptions}}</label>
                                    </div>
                                    <div class="form-group float-right">
                                        <div class="form-label">Disable Options</div>
                                        <div class="custom-control custom-checkbox-toggle custom-control-inline mr-1">
                                            <input type="checkbox" class="custom-control-input" id="disable-options" v-model="disabledOptions">
                                            <label class="custom-control-label" for="disable-options">{{disabledOptions}}</label>
                                        </div>
                                        <label class="form-label" for="disable-options">{{disabledOptions}}</label>
                                    </div>
                                </div>
                                <div v-if="addOptions && question.options.length<5">

                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th class="text-center">New Option</th>
                                            <th class="text-center">Is Correct</th>
                                            <th class="text-center">?</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td style="min-width:70%;">
                                                <ckeditor class="card mb-0" :editor="inlineEditor" v-model="option.option" title="Click to edit">...</ckeditor>
                                            </td>
                                            <td class="text-center"><input type="checkbox" v-model="option.correct"></td>
                                            <td>
                                                <button class="btn btn-sm btn-success" @click="addOption(option)" title="Update Option"><i class="material-icons">add</i> Add</button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th class="text-center">#</th>
                                        <th class="text-center">Option</th>
                                        <th class="text-center">Is Correct</th>
                                        <th class="text-center">?</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(option,index) in question.options">
                                        <td class="text-center">{{index + 1}}</td>
                                        <td>
                                            <ckeditor class="card mb-0" :editor="inlineEditor" :disabled="disabledOptions" v-model="question.options[index].option_text" title="Click to edit"></ckeditor>
                                        </td>
                                        <td class="text-center"><input type="checkbox" v-model="question.options[index].correct"></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-danger" @click="deleteOption(option.id)" title="Delete Option"><i class="material-icons">delete_outline</i></button>
                                            <button class="btn btn-sm btn-outline-success" @click="editOption(question.options[index])" title="Update Option" v-if="!disabledOptions"><i class="material-icons">check</i></button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="form-group row">
                                    <div class="col-md-8 offset-md-3">
                                        <button type="submit" class="btn btn-success">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--drg >> Modal to add question-->
        <div class="modal fade" id="addQuestion">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary">
                        <h4 class="modal-title text-white">Add Question</h4>
                        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form id="addQuestionForm" action="javascript:void(0)" @submit="create_updateQuestion">
                            <div class="form-group row">
                                <label class="col-form-label form-label col-md-3">Question:</label>
                                <div class="col-md-9">
                                    <ckeditor :editor="classicEditor" v-model="question.question"></ckeditor>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="avatar" class="col-sm-3 col-form-label form-label">Quiz Image</label>
                                <div class="col-sm-9 row">
                                    <div :class="question_image || question.question_image? 'col-md-6':''">
                                        <div class="custom-file" style="width: auto;">
                                            <label class="custom-file-label">Choose Image</label>
                                            <input type="file" class="custom-file-input" accept="image/*" v-on:change="questionImageChanged">

                                        </div>
                                    </div>
                                    <div class="col-md-6" v-if="question_image || question.question_image">
                                        <img :src="question_image" style="max-width:80%; margin-left:10%; cursor: pointer;" alt="" class="thumbnail" v-if="question_image">
                                        <img :src="question.question_image" style="max-width:80%; margin-left:10%; cursor: pointer;" alt="" class="thumbnail" v-else-if="question.question_image">
                                    </div>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="type" class="col-form-label form-label col-md-3">Type:</label>
                                <div class="col-md-4">
                                    <select class="custom-control custom-select form-control" v-model="question.type">
                                        <option value="input">Input</option>
                                        <option value="textarea">Textarea</option>
                                        <option value="richtext">Richtext</option>
                                        <option value="radio">Radio</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="touch-spin-2" class="col-form-label form-label col-md-3">Question Score:</label>
                                <div class="col-md-4">
                                    <input data-toggle="touch-spin" data-min="0" data-max="100" data-step="5" type="text" name="demo2" class="form-control" v-model="question.score"/>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="touch-spin-2" class="col-form-label form-label col-md-3">Tests:</label>
                                <div class="col-md-9">
                                    <multiselect v-model="question.tests" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="title" track-by="value" :options="tests" :multiple="true" :taggable="true" @tag="addTag"></multiselect>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-8 offset-md-3">
                                    <button type="submit" class="btn btn-success">Save</button>
                                </div>
                            </div>
                        </form>
                        <div class="card" v-if="question.options && question.type==='radio'">
                            <div class="card-header"><h4 class="card-title">Options</h4></div>

                            <div class="card-body">
                                <div class="col-md-9" v-if="question.options.length<5">
                                    <a href="#" class="btn btn-default"><i class="material-icons">add</i> Add Options</a>
                                </div>
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th class="text-center">#</th>
                                        <th class="text-center">Option</th>
                                        <th class="text-center">Is Correct</th>
                                        <th class="text-center">?</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(option,index) in question.options">
                                        <td class="text-center">{{index + 1}}</td>
                                        <td>
                                            <ckeditor class="card mb-0" :editor="inlineEditor" v-model="question.options[index].option_text" title="Click to edit"></ckeditor>
                                        </td>
                                        <td class="text-center"><input type="checkbox" v-model="question.options[index].correct"></td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-danger" @click="deleteOptions(option.id)" title="Delete result"><i class="material-icons">delete_outline</i></button>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="form-group row">
                                    <div class="col-md-8 offset-md-3">
                                        <button type="submit" class="btn btn-success">Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex';
    import CKEditor from '@ckeditor/ckeditor5-vue';
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import InlineEditor from '@ckeditor/ckeditor5-build-inline';
    import InputTag from 'vue-input-tag';
    import Multiselect from 'vue-multiselect';
    import swal from 'sweetalert';

    export default {
        data() {
            return {
                classicEditor:   ClassicEditor,
                inlineEditor:    InlineEditor,
                question_image:  '',
                disabledOptions: true,
                addOptions:      true
            }
        },
        created() {
            
        },
        components: {
            'ckeditor':    CKEditor.component,
            'input-tags':  InputTag,
            'multiselect': Multiselect
        },
        computed:   {
            ...mapState(
                {
                    option:   state => state.questions.option,
                    question: state => state.questions.question,
                    quiz:     state => state.quizes.quiz,
                    tests:    state => state.questions.tests,
                }),
            question_id() {
                return this.question.id;
            }
        },
        methods:    {
            addOption(option) {
                option.question_id = this.question_id;
                this.$store.dispatch('questions/add_option', option);
            },
            create_updateQuestion() {
                // drg >> check if we're creating a new question
                this.question.origin_id = this.$route.params.id
                this.question.is_new ?
                    this.$store.dispatch('questions/add', this.question)
                    :
                    this.$store.dispatch('questions/edit', this.question, this.$route.params.id);
                jQuery(".modal").modal("hide");

            },
            createImage(file) {
                let reader = new FileReader();
                this.media_title = file.name;
                
                reader.onload = (e) => {
                    this.question_image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            deleteOption(id) {
                this.$store.dispatch('questions/delete_option', id);
            },
            editOption(option) {
                this.$store.dispatch('questions/edit_option', option);
            },
            questionImageChanged(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.question.question_image = files[0];
                this.createImage(files[0]);
            },
            addTag(newTag) {
                const tag = {
                    name: newTag,
                    code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
                };
                this.options.push(tag);
                this.value.push(tag);
            },
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
    .dropdown-menu, .ck.ck-balloon-panel {
        z-index: 1060 !important;
    }
</style>