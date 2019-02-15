<?php

namespace App\Http\Controllers\Instructor;

use App\Question;
use App\QuestionsOption;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Http\Controllers\Controller;
use App\Http\Requests\Instructor\StoreQuestionsRequest;
use App\Http\Requests\Instructor\UpdateQuestionsRequest;
use App\Http\Controllers\Traits\FileUploadTrait;

class QuestionsController extends Controller
{
    use FileUploadTrait;

    /**
     * Display a listing of Question.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (!Gate::allows('question_access')) {
            return abort(401);
        }

        if (request('show_deleted') == 1) {
            if (!Gate::allows('question_delete')) {
                return abort(401);
            }
            $questions = Question::onlyTrashed()->get();
        } else {
            $questions = Question::all();
        }

        return response()->json($questions);

    }

    /**
     * Show the form for creating new Question.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if (!Gate::allows('question_create')) {
            return abort(401);
        }
        $tests = [];

        foreach (\App\Test::get()->pluck('title', 'id') as $key => $value) {
            array_push($tests, ['title' => $value, 'value' => $key]);
        }

        return response()->json([
            'tests'          => $tests,
        ]);
    }

    /**
     * Store a newly created Question in storage.
     *
     * @param  \App\Http\Requests\StoreQuestionsRequest $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(StoreQuestionsRequest $request)
    {
        if (!Gate::allows('question_create')) {
            return abort(401);
        }
        $request = $this->saveFiles($request);
        $question = Question::create($request->all());
        $question->tests()->sync(array_filter((array)$request->input('tests')));

        for ($q = 1; $q <= 4; $q++) {
            $option = $request->input('option_text_' . $q, '');
            if ($option != '') {
                QuestionsOption::create([
                    'question_id' => $question->id,
                    'option_text' => $option,
                    'correct'     => $request->input('correct_' . $q)
                ]);
            }
        }

        return redirect()->route('instructor.questions.index');
    }


    /**
     * Show the form for editing Question.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if (!Gate::allows('question_edit')) {
            return abort(401);
        }
        $question = Question::with('options')->findOrFail($id);
        $question_tests =[];
        $tests =[];

        foreach (\App\Test::get()->pluck('title', 'id') as $key => $value) {
            array_push($tests, ['title' => $value, 'value' => $key]);
        }
        // drg >> get question tests
        foreach ($question->tests->pluck('title', 'id') as $key => $value) {
            array_push($question_tests, ['title' => $value, 'value' => $key]);
        }


        return response()->json([
            'question'       => $question,
            'tests'          => $tests,
            'question_tests' => $question_tests
        ]);

    }

    /**
     * Update Question in storage.
     *
     * @param  \App\Http\Requests\UpdateQuestionsRequest $request
     * @param  int                                       $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateQuestionsRequest $request, $id)
    {
        if (!Gate::allows('question_edit')) {
            return abort(401);
        }
        $request = $this->saveFiles($request);
        $question = Question::findOrFail($id);
        $question->update($request->all());
        $question->tests()->sync(array_filter((array)$request->input('tests')));


        return redirect()->route('instructor.questions.index');
    }


    /**
     * Display Question.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (!Gate::allows('question_view')) {
            return abort(401);
        }
        $questions_options = \App\QuestionsOption::where('question_id', $id)
            ->get();
        $tests = \App\Test::whereHas('questions',
            function ($query) use ($id) {
                $query->where('id', $id);
            })->get();

        $question = Question::findOrFail($id);

        return view('admin.questions.show',
            compact('question', 'questions_options', 'tests'));
    }


    /**
     * Remove Question from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if (!Gate::allows('question_delete')) {
            return abort(401);
        }
        $question = Question::findOrFail($id);
        $question->delete();

        return redirect()->route('instructor.questions.index');
    }

    /**
     * Delete all selected Question at once.
     *
     * @param Request $request
     */
    public function massDestroy(Request $request)
    {
        if (!Gate::allows('question_delete')) {
            return abort(401);
        }
        if ($request->input('ids')) {
            $entries = Question::whereIn('id', $request->input('ids'))->get();

            foreach ($entries as $entry) {
                $entry->delete();
            }
        }
    }


    /**
     * Restore Question from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function restore($id)
    {
        if (!Gate::allows('question_delete')) {
            return abort(401);
        }
        $question = Question::onlyTrashed()->findOrFail($id);
        $question->restore();

        return redirect()->route('instructor.questions.index');
    }

    /**
     * Permanently delete Question from storage.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function perma_del($id)
    {
        if (!Gate::allows('question_delete')) {
            return abort(401);
        }
        $question = Question::onlyTrashed()->findOrFail($id);
        $question->forceDelete();

        return redirect()->route('instructor.questions.index');
    }
}
