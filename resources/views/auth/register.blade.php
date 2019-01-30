@extends('layouts.auth')
@section('title','Register')
@section('content')
    <div class="form-content">
        <div class="form-items">
            <h3>Register new account</h3>
            <p>Access to the most powerfull tool in the entire design and web industry.</p>
            <form action="{{route('register')}}" method="post">
                {{csrf_field()}}
                <input class="form-control" type="text" name="name" placeholder="Full Name" required>
                <input class="form-control" type="email" name="email" placeholder="E-mail Address" required>
                <input class="form-control" type="password" name="password" placeholder="Password" required>
                <input class="form-control" type="password" name="password_confirmation" placeholder="Confirm Password" required>
                <div class="form-button">
                    <button id="submit" type="submit" class="ibtn">Register</button>
                </div>
            </form>
            <div class="other-links">
                <div class="text">Or register with</div>
                <a href="#"><i class="fab fa-facebook-f"></i>Facebook</a><a href="#"><i class="fab fa-google"></i>Google</a><a
                        href="#"><i class="fab fa-linkedin-in"></i>Linkedin</a>
            </div>
            <div class="page-links">
                <a href="{{route('login')}}">Login to account</a>
            </div>
        </div>
    </div>

@endsection