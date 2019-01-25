<template>
    <div>
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Basic Information</h4>
                    </div>
                    <div class="card-body">

                        <div class="form-group">
                            <label class="form-label" for="title">Title</label>
                            <input type="text" id="title" class="form-control" placeholder="Write a title" value="Basics of Vue.js">
                        </div>

                        <div class="form-group mb-0">
                            <label class="form-label">Description</label>
                            <div style="height: 150px;" data-toggle="quill" data-quill-placeholder="Quill WYSIWYG editor" data-quill-modules-toolbar='[["bold", "italic"], ["link", "blockquote", "code", "image"], [{"list": "ordered"}, {"list": "bullet"}]]'>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque necessitatibus distinctio adipisci eius, unde dignissimos maxime doloribus quisquam non harum?</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Lessons</h4>
                    </div>
                    <div class="card-body">
                        <p><a href="instructor-lesson-add.html" class="btn btn-primary">Add Lesson <i class="material-icons">add</i></a></p>
                        <div class="nestable" id="nestable-handles-primary">
                            <ul class="nestable-list">
                                <li class="nestable-item nestable-item-handle" data-id="2">
                                    <div class="nestable-handle"><i class="material-icons">menu</i></div>
                                    <div class="nestable-content">
                                        <div class="media align-items-center">
                                            <div class="media-left">
                                                <img src="assets/images/vuejs.png" alt="" width="100" class="rounded">
                                            </div>
                                            <div class="media-body">
                                                <h5 class="card-title h6 mb-0">
                                                    <a href="instructor-lesson-add.html">Awesome Vue.js with SASS Processing</a>
                                                </h5>
                                                <small class="text-muted">updated 1 month ago</small>
                                            </div>
                                            <div class="media-right">
                                                <a href="instructor-lesson-add.html" class="btn btn-white btn-sm"><i class="material-icons">edit</i></a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="nestable-item nestable-item-handle" data-id="1">
                                    <div class="nestable-handle"><i class="material-icons">menu</i></div>
                                    <div class="nestable-content">
                                        <div class="media align-items-center">
                                            <div class="media-left">
                                                <img src="assets/images/nodejs.png" alt="" width="100" class="rounded">
                                            </div>
                                            <div class="media-body">
                                                <h4 class="card-title h6 mb-0">
                                                    <a href="instructor-lesson-add.html">Github Webhooks for Beginners</a>
                                                </h4>
                                                <small class="text-muted">updated 1 month ago</small>
                                            </div>
                                            <div class="media-right">
                                                <a href="instructor-lesson-add.html" class="btn btn-white btn-sm"><i class="material-icons">edit</i></a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li class="nestable-item nestable-item-handle" data-id="2">
                                    <div class="nestable-handle"><i class="material-icons">menu</i></div>
                                    <div class="nestable-content">
                                        <div class="media align-items-center">
                                            <div class="media-left">
                                                <img src="assets/images/gulp.png" alt="" width="100" class="rounded">
                                            </div>
                                            <div class="media-body">
                                                <h4 class="card-title h6 mb-0">
                                                    <a href="instructor-lesson-add.html">Browserify: Writing Modular JavaScript</a>
                                                </h4>
                                                <small class="text-muted">updated 1 month ago</small>
                                            </div>
                                            <div class="media-right">
                                                <a href="instructor-lesson-add.html" class="btn btn-white btn-sm"><i class="material-icons">edit</i></a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
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
                            <select id="category" class="custom-select form-control">
                                <option value="#">HTML</option>
                                <option value="#">Angular JS</option>
                                <option value="#" selected>Vue.js</option>
                                <option value="#">CSS / LESS</option>
                                <option value="#">Design / Concept</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="duration">Duration</label>
                            <input type="text" id="duration" class="form-control" placeholder="No. of Days" value="10">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="start">Start Date</label>
                            <input id="start" type="text" class="form-control" placeholder="Start Date" data-toggle="flatpickr" value="01/28/2016">
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="end">End Date</label>
                            <input id="end" type="text" class="form-control" placeholder="Start Date" data-toggle="flatpickr" value="01/28/2016">
                        </div>

                        <div class="form-group mb-0">
                            <label class="form-label" for="option1">Completion Badge</label>
                            <div>
                                <div data-toggle="buttons">
                                    <label class="btn btn-primary btn-circle active">
                                        <input type="radio" class="d-none" name="options" id="option1" checked>
                                        <i class="material-icons">person</i>
                                    </label>
                                    <label class="btn btn-danger btn-circle">
                                        <input type="radio" class="d-none" name="options" id="option2">
                                        <i class="material-icons">star</i>
                                    </label>
                                    <label class="btn btn-success btn-circle">
                                        <input type="radio" class="d-none" name="options" id="option3">
                                        <i class="material-icons">shop</i>
                                    </label>
                                    <label class="btn btn-warning btn-circle">
                                        <input type="radio" class="d-none" name="options" id="option4">
                                        <i class="material-icons">monetization_on</i>
                                    </label>
                                    <label class="btn btn-info btn-circle">
                                        <input type="radio" class="d-none" name="options" id="option5">
                                        <i class="material-icons">enhanced_encryption</i>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {}
</script>