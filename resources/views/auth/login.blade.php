@extends('layouts.auth')
@section('title','Login')
@section('content')
    <div class="d-flex align-items-center" style="min-height: 100vh">
        <div class="col-sm-8 col-md-6 col-lg-4 mx-auto" style="min-width: 300px;">
            <div class="d-flex justify-content-center my-3 navbar-light">
                <!-- Brand -->
                <a href="/" class="navbar-brand m-0">
                    <img src="{{$public}}/png/logo-alt.png" alt="openacademi" width="157">
                </a>
            </div>
            <div class="card navbar-shadow">
                <div class="card-body">
                    <div class="list-inline text-center">
                        <div class="list-inline-item">
                            <a href="{{route('login.social',['provider'=>'facebook'])}}" class=""
                               style="color:#4266b2" title="Login via Facebook">
                                <span class="fab fa-facebook fa-3x"></span>
                            </a>
                        </div>
                        <div class="list-inline-item">
                            <a href="{{route('login.social',['provider'=>'google'])}}" class=""
                               style="color:#ea4535" title="Login via Google">
                                <span class="fab fa-google-plus fa-3x"></span>
                            </a>
                        </div>
                        {{--<div class="list-inline-item">
                            <a href="{{route('login.social',['provider'=>'twitter'])}}" class=""
                               style="color:#1da1f2" title="Login via Twitter">
                                <span class="fab fa-twitter fa-3x"></span>
                            </a>
                        </div>--}}
                        <div class="list-inline-item">
                            <a href="{{route('login.social',['provider'=>'linkedin'])}}" class=""
                               style="color:#0073b1" title="Login via Linkedin">
                                <span class="fab fa-linkedin fa-3x"></span>
                            </a>
                        </div>
                    </div>
                    <div class="page-separator">
                        <div class="page-separator__text">or</div>
                    </div>
                    <form action="{{route('login')}}" method="POST" src="">
                        @csrf
                        <div class="form-group">
                            <label class="form-label" for="email">Your email address:</label>
                            <div class="input-group input-group-merge">
                                <input id="email" name="email" type="email" required=""
                                       class="form-control form-control-prepended {{ $errors->has('email') ? ' is-invalid' : '' }}"
                                       value="{{ old('email') }}" autofocus placeholder="Your email address">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <span class="far fa-envelope"></span>
                                    </div>
                                </div>
                                @if ($errors->has('email'))
                                    <div class="invalid-feedback">
                                        {{ $errors->first('email') }}
                                    </div>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="password">Your password:</label>
                            <div class="input-group input-group-merge">
                                <input id="password" name="password" type="password" required=""
                                       class="form-control form-control-prepended" placeholder="Your password">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <span class="fa fa-key"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group ">
                            <button type="submit" class="btn btn-primary btn-block">Login</button>
                        </div>
                        @if(Route::has('password.request'))
                            <div class="text-center">
                                <a href="{{route('password.request')}}" class="text-black-70"
                                   style="text-decoration: underline;">Forgot Password?</a>
                            </div>
                        @endif
                    </form>
                </div>
                <div class="card-footer text-center text-black-50">
                    Not yet a student? <a href="{{route('register')}}">Sign up</a>
                </div>
            </div>
        </div>
    </div>
@endsection
