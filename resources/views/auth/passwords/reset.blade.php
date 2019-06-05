@extends('layouts.auth')
@section('title','Change Password')
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
                    <h4 class="card-title">Change Password</h4>
                    <p class="card-subtitle">You can change your password here</p>
                </div>
                <div class="card-body">
                    <form action="{{route('password.update')}}" method="POST">
                        @csrf
                        <input type="hidden" name="token" value="{{ $token }}">

                        <div class="form-group">
                            <label class="form-label" for="email">Your email address:</label>
                            <div class="input-group input-group-merge">
                                <input id="email" name="email" type="email" required=""
                                        class="form-control form-control-prepended {{ $errors->has('email') ? ' is-invalid' : '' }}"
                                       value="{{ $email ?? old('email') }}" autofocus placeholder="Your email address">
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
                            <label class="form-label" for="password">New Password:</label>
                            <div class="input-group input-group-merge">
                                <input id="password" type="password" name="password" required="" class="form-control form-control-prepended{{ $errors->has('password') ? ' is-invalid' : '' }}" placeholder="Choose a new password">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <span class="fa fa-key"></span>
                                    </div>
                                </div>
                                @if ($errors->has('password'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="password2">Password Confirmation:</label>
                            <div class="input-group input-group-merge">
                                <input id="password2" type="password" name="password_confirmation" required="" class="form-control form-control-prepended" placeholder="Confirm password">
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <span class="fa fa-key"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group ">
                            <button type="submit" class="btn btn-primary btn-block">Reset Password</button>
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
