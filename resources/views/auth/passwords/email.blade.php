@extends('layouts.auth')
@section('title','Reset Password')
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
                <div class="card-header text-center">
                    <h4 class="card-title">Reset Password</h4>
                    <p class="card-subtitle">Provide us with yout email</p>
                </div>
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-light border-1 border-left-3 border-left-primary d-flex" role="alert">
                            <i class="material-icons text-success mr-3">check_circle</i>
                            <div class="text-body">{{session('status')}}</div>
                        </div>
                    @endif

                <form action="{{route('password.email')}}" method="POST">
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
                    <div class="form-group ">
                        <button type="submit" class="btn btn-primary btn-block">Send Reset Link</button>
                    </div>
                    <div class="text-center">
                        <a href="{{route('login')}}" class="text-black-70"
                           style="text-decoration: underline;">Login?</a>
                    </div>
                </form>
            </div>
            <div class="card-footer text-center text-black-50">
                Not yet a student? <a href="{{route('register')}}">Sign up</a>
            </div>
        </div>
    </div>
    </div>
@endsection
