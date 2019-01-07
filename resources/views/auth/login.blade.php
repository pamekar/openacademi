@extends('layouts.auth')
@section('content')
    <div class="card-header text-center">
        <h4 class="card-title">Login</h4>
        <p class="card-subtitle">Access your account</p>
    </div>
    <div class="card-body">

        <a href="" class="btn btn-light btn-block">
            <span class="fab fa-google mr-2"></span>
            Continue with Google
        </a>

        <div class="page-separator">
            <div class="page-separator__text">or</div>
        </div>

        <form action="{{route('auth.login')}}" novalidate method="post">
            {{csrf_field()}}
            <div class="form-group">
                <label class="form-label" for="email">Your email address:</label>
                <div class="input-group input-group-merge">
                    <input name="email" id="email" type="email" required="" class="form-control form-control-prepended @if($errors->has('email') ) is-invalid @endif"
                           placeholder="Your email address" {{old('email')}}>
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <span class="far fa-envelope"></span>
                        </div>
                    </div>
                    <div class="invalid-feedback">{{$errors->first('email') }}</div>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label" for="password">Your password:</label>
                <div class="input-group input-group-merge">
                    <input name="password" id="password" type="password" required class="form-control form-control-prepended @if($errors->has('password') ) is-invalid @endif"
                           placeholder="Your password">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <span class="fa fa-key"></span>
                        </div>
                    </div>
                    <div class="invalid-feedback">{{$errors->first('password') }}</div>
                </div>
            </div>
            <div class="form-group">
                <div class="custom-control custom-checkbox">
                    <input class="custom-control-input" value="" id="remember" required="" name="remembered" type="checkbox">
                    <label class="custom-control-label" for="remember">
                        Remember
                    </label>
                </div>
            </div>
            <div class="form-group ">
                <button type="submit" class="btn btn-primary btn-block">Login</button>
            </div>
            <div class="text-center">
                <a href="{{route('auth.password.reset')}}" class="text-black-70" style="text-decoration: underline;">Forgot Password?</a>
            </div>
        </form>
    </div>
    <div class="card-footer text-center text-black-50">
        Not yet a student? <a href="{{'auth.register'}}">Sign up</a>
    </div>

@endsection