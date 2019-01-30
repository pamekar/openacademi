@extends('layouts._auth')
@section('title','Register')
@section('content')
    <div class="card-header text-center">
        <h4 class="card-title">Register</h4>
        <p class="card-subtitle">Start learning today</p>
    </div>
    <div class="card-body">

        <a href="" class="btn btn-light btn-block">
            <span class="fab fa-google mr-2"></span>
            Sign up with Google
        </a>

        <div class="page-separator">
            <div class="page-separator__text">or</div>
        </div>

        <form action="{{route('register')}}" novalidate method="post">
            {{csrf_field()}}
            <div class="form-group">
                <label class="form-label" for="name">Your username:</label>
                <div class="input-group input-group-merge">
                    <input name="name" id="name" type="text" required="" class="form-control form-control-prepended @if($errors->has('name') ) is-invalid @endif"
                           placeholder="Your username" value="{{old('name')}}">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <span class="far fa-user"></span>
                        </div>
                    </div>
                    <div class="invalid-feedback">{{$errors->first('name') }}</div>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label" for="email">Your email address:</label>
                <div class="input-group input-group-merge">
                    <input name="email" id="email" type="email" required="" class="form-control form-control-prepended @if($errors->has('email') ) is-invalid @endif"
                           placeholder="Your email address" value="{{old('email')}}">
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
                <label class="form-label" for="password-confirm">Confirm password:</label>
                <div class="input-group input-group-merge">
                    <input name="password_confirmation" id="password-confirm" type="password" required class="form-control form-control-prepended"
                           placeholder="Your password">
                    <div class="input-group-prepend">
                        <div class="input-group-text">
                            <span class="fa fa-key"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group ">
                <button type="submit" class="btn btn-primary btn-block">Register</button>
            </div>
        </form>
    </div>
    <div class="card-footer text-center text-black-50">
        Existing user? <a href="{{route('login')}}">Login here!</a>
    </div>

@endsection