<template>
    <div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Basic</h4>
            </div>
            <div class="card-body">
                <form action="#">
                    <div class="form-group row">
                        <label for="quiz_title" class="col-sm-3 col-form-label form-label">Quiz Title:</label>
                        <div class="col-sm-9">
                            <input id="quiz_title" type="text" class="form-control" placeholder="Title" value="Vue.js Introduction">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="course_title" class="col-sm-3 col-form-label form-label">Course:</label>
                        <div class="col-sm-9 col-md-4">
                            <select id="course_title" class="custom-select form-control">
                                <option value="#">HTML</option>
                                <option value="#">Angular JS</option>
                                <option value="#" selected="">Vue.js</option>
                                <option value="#">CSS / LESS</option>
                                <option value="#">Design / Concept</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="quiz_image" class="col-sm-3 col-form-label form-label">Quiz Image:</label>
                        <div class="col-sm-9 col-md-4">
                            <p><img src="assets/images/vuejs.png" alt="" width="150" class="rounded"></p>
                            <div class="custom-file">
                                <input type="file" id="quiz_image" class="custom-file-input">
                                <label for="quiz_image" class="custom-file-label">Choose file</label>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="cmn-toggle" class="col-sm-3 col-form-label form-label">Timeframe</label>
                        <div class="col-sm-9">
                            <div class="form-group">
                                <div class="custom-control custom-checkbox-toggle">
                                    <input id="cmn-toggle" type="checkbox" aria-checked="false" class="custom-control-input" role="switch">
                                    <label class="custom-control-label" for="cmn-toggle"><span class="sr-only">Timeframe</span></label>
                                </div>
                            </div>
                            <div class="form-inline">
                                <div class="form-group mr-2">
                                    <input type="number" class="form-control text-center" value="4" style="width:50px;">
                                </div>
                                <div class="form-group">
                                    <select class="custom-select">
                                        <option value="hour" selected="">Hours</option>
                                        <option value="minutes">Minutes</option>
                                    </select>
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
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Questions</h4>
            </div>
            <div class="card-header">
                <a href="#" data-toggle="modal" data-target="#editQuiz" class="btn btn-outline-secondary">Add Question <i class="material-icons">add</i></a>
            </div>
            <div class="nestable" id="nestable">
                <ul class="list-group list-group-fit nestable-list-plain mb-0">
                    <li class="list-group-item nestable-item">
                        <div class="media align-items-center">
                            <div class="media-left">
                                <a href="#" class="btn btn-default nestable-handle"><i class="material-icons">menu</i></a>
                            </div>
                            <div class="media-body">
                                Installation
                            </div>
                            <div class="media-right text-right">
                                <div style="width:100px">
                                    <a href="#" data-toggle="modal" data-target="#editQuiz" class="btn btn-primary btn-sm"><i class="material-icons">edit</i></a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item nestable-item">
                        <div class="media align-items-center">
                            <div class="media-left">
                                <a href="#" class="btn btn-default nestable-handle"><i class="material-icons">menu</i></a>
                            </div>
                            <div class="media-body">
                                The MVC architectural pattern
                            </div>
                            <div class="media-right text-right">
                                <div style="width:100px">
                                    <a href="#" data-toggle="modal" data-target="#editQuiz" class="btn btn-primary btn-sm"><i class="material-icons">edit</i></a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item nestable-item">
                        <div class="media align-items-center">
                            <div class="media-left">
                                <a href="#" class="btn btn-default nestable-handle"><i class="material-icons">menu</i></a>
                            </div>
                            <div class="media-body">
                                Database Models
                            </div>
                            <div class="media-right text-right">
                                <div style="width:100px">
                                    <a href="#" data-toggle="modal" data-target="#editQuiz" class="btn btn-primary btn-sm"><i class="material-icons">edit</i></a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item nestable-item" data-id="4">
                        <div class="media align-items-center">
                            <div class="media-left">
                                <a href="#" class="btn btn-default nestable-handle"><i class="material-icons">menu</i></a>
                            </div>
                            <div class="media-body">
                                Database Access
                            </div>
                            <div class="media-right text-right">
                                <div style="width:100px">
                                    <a href="#" data-toggle="modal" data-target="#editQuiz" class="btn btn-primary btn-sm"><i class="material-icons">edit</i></a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item nestable-item" data-id="5">
                        <div class="media align-items-center">
                            <div class="media-left">
                                <a href="#" class="btn btn-default nestable-handle"><i class="material-icons">menu</i></a>
                            </div>
                            <div class="media-body">
                                Eloquent Basics
                            </div>
                            <div class="media-right text-right">
                                <div style="width:100px">
                                    <a href="#" data-toggle="modal" data-target="#editQuiz" class="btn btn-primary btn-sm"><i class="material-icons">edit</i></a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item nestable-item" data-id="6">
                        <div class="media align-items-center">
                            <div class="media-left">
                                <a href="#" class="btn btn-default nestable-handle"><i class="material-icons">menu</i></a>
                            </div>
                            <div class="media-body">
                                Take Quiz
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
    export default {}
</script>