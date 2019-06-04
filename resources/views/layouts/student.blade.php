@php
    $notification = session('notification');
@endphp
        <!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>{{setting('site.title')}}</title>

    <!-- Perfect Scrollbar -->
    <link type="text/css" href="{{asset("$public/assets/vendor/perfect-scrollbar.css")}}" rel="stylesheet">

    <!-- Material Design Icons -->
    <link type="text/css" href="{{asset("$public/assets/css/material-icons.css")}}" rel="stylesheet">

    <!-- Font Awesome Icons -->
    <link type="text/css" href="{{asset("$public/assets/css/fontawesome.css")}}" rel="stylesheet">
    <!-- App CSS -->
    <link type="text/css" href="{{asset("$public/assets/css/app.css")}}" rel="stylesheet">

    <link rel="apple-touch-icon" sizes="180x180" href="{{$public}}/png/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="{{$public}}/png/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="{{$public}}/png/favicon-16x16.png">
    <link rel="manifest" href="{{$public}}/site.webmanifest">
    <script>
        window.public_= "{{$public}}";
    </script>
</head>

<body class=" fixed-layout">
<div class="preloader">
    <div class="sk-double-bounce">
        <div class="sk-child sk-double-bounce1"></div>
        <div class="sk-child sk-double-bounce2"></div>
    </div>
</div>
@yield('content')

<form id="logout-form" action="{{ url('/logout') }}"
      method="POST" style="display: none;"
>{{ csrf_field() }}</form>

<!-- jQuery -->
<script src="{{asset("$public/assets/vendor/jquery.min.js")}}"></script>

<!-- Bootstrap -->
<script src="{{asset("$public/assets/vendor/popper.min.js")}}"></script>
<script src="{{asset("$public/assets/vendor/bootstrap.min.js")}}"></script>

@if(isset($notification))
    <script src="{{asset("$public/js/bootstrap-notify.min.js")}}"></script>
    <script>
        $.notify({
            // options
            message: '{{$notification->message}}',
        }, {
            // settings
            type: '{{$notification->type}}',
        });


    </script>
@endif
<script src="{{asset("$public/student/js/app.js")}}"></script>
<!-- Perfect Scrollbar -->
<script src="{{asset("$public/assets/vendor/perfect-scrollbar.min.js")}}"></script>

<!-- MDK -->
<script src="{{asset("$public/assets/vendor/dom-factory.js")}}"></script>
<script src="{{asset("$public/assets/vendor/material-design-kit.js")}}"></script>

<!-- App JS -->
<script src="{{asset("$public/assets/js/app.js")}}"></script>

<!-- Required by countdown -->
<script src="{{asset("$public/assets/vendor/moment.min.js")}}"></script>

<!-- Easy Countdown -->
<script src="{{asset("$public/assets/vendor/jquery.countdown.min.js")}}"></script>

<!-- Init -->
<script src="{{asset("$public/assets/js/countdown.js")}}"></script>


</body>

</html>