@extends('layouts.auth')
@section('title','Register')
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
                    <h4 class="card-title">Sign Up</h4>
                    <p class="card-subtitle">Create a new account</p>
                </div>
                <div class="card-body">

                    {{--<a href="" class="btn btn-light btn-block">
                        <span class="fab fa-google mr-2"></span>
                        Continue with Google
                    </a>

                    <div class="page-separator">
                        <div class="page-separator__text">or</div>
                    </div>
--}}
                    <form action="{{route('register')}}" method="POST">
                        @csrf
                        <div class="form-group">
                            <label class="form-label" for="name">Username:</label>
                            <div class="input-group input-group-merge">
                                <input id="name" type="text" name="name" required="" class="form-control form-control-prepended{{ $errors->has('name') ? ' is-invalid' : '' }}" placeholder="Username" value="{{ old('name') }}" >
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <span class="far fa-user"></span>
                                    </div>
                                </div>
                                @if ($errors->has('name'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('name') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="email">Email address:</label>
                            <div class="input-group input-group-merge">
                                <input id="email" type="email" name="email" required="" class="form-control form-control-prepended{{ $errors->has('email') ? ' is-invalid' : '' }}" placeholder="Your email address" value="{{ old('email') }}" >
                                <div class="input-group-prepend">
                                    <div class="input-group-text">
                                        <span class="far fa-envelope"></span>
                                    </div>
                                </div>
                                @if ($errors->has('email'))
                                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="password">Password:</label>
                            <div class="input-group input-group-merge">
                                <input id="password" type="password" name="password" required="" class="form-control form-control-prepended{{ $errors->has('password') ? ' is-invalid' : '' }}" placeholder="Choose a password">
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
                        <button type="submit" class="btn btn-primary btn-block mb-3">Sign Up</button>
                        <div class="form-group text-center mb-0">
                            <div class="custom-control custom-checkbox">
                                <input id="terms" type="checkbox" class="custom-control-input" required="">
                                <label for="terms" class="custom-control-label text-black-70">I agree to the <a href="#" class="text-black-70" style="text-decoration: underline;">Terms of Use</a></label>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="card-footer text-center text-black-50">Already signed up? <a href="{{route('login')}}">Log in</a></div>
            </div>
        </div>
    </div>

@endsection