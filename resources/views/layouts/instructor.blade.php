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
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Styles -->
    <link type="text/css" href="{{asset("$public/assets/css/academi-styles.css")}}" rel="stylesheet">

    <script>
        window.public_ = "{{$public}}";
    </script>
</head>

<body class="layout-fluid">
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

<!-- Bootstrap -->
<script src="{{$public.mix("/assets/js/academi-scripts-instructor-1.js")}}"></script>
@if(isset($notification))
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
<script src="{{$public.mix('/teacher/js/app.js')}}"></script>
<script src="{{$public.mix("/assets/js/academi-scripts-instructor-2.js")}}"></script>
</body>

</html>