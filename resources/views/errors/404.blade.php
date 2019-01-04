@extends('layouts.home')

@section('main')

    <section>
        <div class="block">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <div class="error-page">
                            <h1>404</h1>
                            <strong><span>Ooops</span>, Page Not Found</strong>
                            <p>We Can't Seem to find the page you're looking for.</p>
                            <a class="button small active" href="{{route('home')}}" title="">Back To Home</a>
                        </div><!-- Error Page -->
                    </div>
                </div>
            </div>
        </div>
    </section>



@endsection