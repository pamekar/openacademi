<template>
    <div>
        <div class="card">
            <div class="card-body">
                <form action="#">
                    <div class="form-group row">
                        <label for="avatar" class="col-sm-3 col-form-label form-label">Preview</label>
                        <div class="col-sm-9">
                            <div class="media align-items-center">
                                <div class="media-left">
                                    <img src="assets/images/vuejs.png" alt="" width="100" class="rounded">
                                </div>
                                <div class="media-body">
                                    <div class="custom-file" style="width: auto;">
                                        <input type="file" id="avatar" class="custom-file-input">
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
                            <select id="course" class="custom-control custom-select form-control">
                                <option value="#">HTML</option>
                                <option value="#">Angular JS</option>
                                <option value="#" selected="">Vue.js</option>
                                <option value="#">CSS / LESS</option>
                                <option value="#">Design / Concept</option>
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
                </form>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <h4 class="card-title">Files</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6">
                        <form id="my-awesome-dropzone" action="/target" class="dropzone dz-clickable">
                            <div class="dz-default dz-message"><span>Drop files here to upload</span></div>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <div data-toggle="tree">
                            <ul style="display: none;" class="ui-fancytree-source fancytree-helper-hidden">
                                <li class="folder expanded">
                                    lesson files
                                    <ul>
                                        <li>lesson-1-install.zip</li>
                                        <li>lesson-1-steps.zip</li>
                                    </ul>
                                </li>
                            </ul>
                            <ul class="ui-fancytree fancytree-container fancytree-plain fancytree-ext-glyph" tabindex="0" role="tree" aria-multiselectable="true">
                                <li role="treeitem" aria-expanded="true" aria-selected="false" class="fancytree-lastsib"><span class="fancytree-node fancytree-expanded fancytree-folder fancytree-has-children fancytree-lastsib fancytree-exp-el fancytree-ico-ef"><span role="button" class="fancytree-expander  fa fa-caret-down fa-fw"></span><span role="presentation" class="fancytree-icon  fa fa-folder-open fa-fw"></span><span class="fancytree-title">lesson files</span></span>
                                    <ul role="group">
                                        <li role="treeitem" aria-selected="false"><span class="fancytree-node fancytree-exp-n fancytree-ico-c"><span class="fancytree-expander  "></span><span role="presentation" class="fancytree-icon  fa fa-file-o fa-fw"></span><span class="fancytree-title">lesson-1-install.zip</span></span></li>
                                        <li role="treeitem" aria-selected="false" class="fancytree-lastsib"><span class="fancytree-node fancytree-lastsib fancytree-exp-nl fancytree-ico-c"><span class="fancytree-expander  "></span><span role="presentation" class="fancytree-icon  fa fa-file-o fa-fw"></span><span class="fancytree-title">lesson-1-steps.zip</span></span></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    export default {}
</script>