@php
    $notification = session('notification');
@endphp
        <!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>{{config('app.name')}}</title>

    <!-- Prevent the demo from appearing in search engines (REMOVE THIS) -->
    <meta name="robots" content="noindex">

    <!-- Perfect Scrollbar -->
    <link type="text/css" href="{{asset("$public/assets/vendor/perfect-scrollbar.css")}}" rel="stylesheet">

    <!-- Material Design Icons -->
    <link type="text/css" href="{{asset("$public/assets/css/material-icons.css")}}" rel="stylesheet">

    <!-- Font Awesome Icons -->
    <link type="text/css" href="{{asset("$public/assets/css/fontawesome.css")}}" rel="stylesheet">


    <!-- App CSS -->
    <link type="text/css" href="{{asset("$public/assets/css/app.css")}}" rel="stylesheet">
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
<script src="{{asset("$public/student/js/app.js")}}"></script>
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
<!-- Perfect Scrollbar -->
<script src="{{asset("$public/assets/vendor/perfect-scrollbar.min.js")}}"></script>

<!-- MDK -->
<script src="{{asset("$public/assets/vendor/dom-factory.js")}}"></script>
<script src="{{asset("$public/assets/vendor/material-design-kit.js")}}"></script>

<!-- App JS -->
<script src="{{asset("$public/assets/js/app.js")}}"></script>

<!-- Highlight.js -->
<script src="{{asset("$public/assets/js/hljs.js")}}"></script>

<!-- App Settings (safe to remove) -->
<script src="{{asset("$public/assets/js/app-settings.js")}}"></script>

</body>

</html>