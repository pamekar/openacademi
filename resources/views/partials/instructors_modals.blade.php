<div class="modal fade" id="editQuiz">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header bg-primary">
                <h4 class="modal-title text-white">Edit Question</h4>
                <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form action="#">
                    <div class="form-group row">
                        <label for="qtitle" class="col-form-label form-label col-md-3">Title:</label>
                        <div class="col-md-9">
                            <input id="qtitle" type="text" class="form-control" value="Database Access">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="type" class="col-form-label form-label col-md-3">Type:</label>
                        <div class="col-md-4">
                            <select id="type" class="custom-control custom-select form-control">
                                <option value="1">Input</option>
                                <option value="2">Textarea</option>
                                <option value="3">Checkbox</option>
                                <option value="3">Radio</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-form-label form-label col-md-3">Answers:</label>
                        <div class="col-md-9">
                            <a href="#" class="btn btn-default"><i class="material-icons">add</i> Add Answer</a>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="touch-spin-2" class="col-form-label form-label col-md-3">Question Score:</label>
                        <div class="col-md-4">
                            <input id="touch-spin-2" data-toggle="touch-spin" data-min="0" data-max="100" data-step="5" type="text" value="50" name="demo2" class="form-control" />
                        </div>
                    </div>
                    <div class="form-group row mb-0">
                        <div class="col-md-8 offset-md-3">
                            <button type="submit" class="btn btn-success">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
