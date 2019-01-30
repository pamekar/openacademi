<!DOCTYPE html>
<html lang="en">

<!-- Mirrored from brandio.io/envato/iofrm/html/login16.html by HTTrack Website Copier/3.x [XR&CO'2014], Sun, 20 Jan 2019 20:31:11 GMT -->
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title','Authentication')</title>
    <link rel="stylesheet" type="text/css" href="{{asset("$public/auth/css/bootstrap.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("$public/auth/css/fontawesome-all.min.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("$public/auth/css/iofrm-style.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("$public/auth/css/iofrm-theme16.css")}}">
</head>
<body>
    <div class="form-body without-side">
        <div class="website-logo">
            <a href="{{url('')}}">
                <div class="logo">
                    <img class="logo-size" src="{{asset("$public/auth/svg/logo-light.svg")}}" alt="">
                </div>
            </a>
        </div>
        <div class="row">
            <div class="img-holder">
                <div class="bg"></div>
                <div class="info-holder">
                    <img src="{{asset("$public/auth/svg/graphic3.svg")}}" alt="">
                </div>
            </div>
            <div class="form-holder">
                @yield('content')
            </div>
        </div>
    </div>
<script src="{{asset("$public/auth/js/jquery.min.js")}}"></script>
<script src="{{asset("$public/auth/js/popper.min.js")}}"></script>
<script src="{{asset("$public/auth/js/bootstrap.min.js")}}"></script>
<script src="{{asset("$public/auth/js/main.js")}}"></script>
</body>


</html>