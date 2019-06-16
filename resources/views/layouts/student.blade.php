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

    <link rel="apple-touch-icon" sizes="180x180" href="{{$public}}/png/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="{{$public}}/png/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="{{$public}}/png/favicon-16x16.png">
    <link rel="manifest" href="{{$public}}/site.webmanifest">

    <link type="text/css" href="{{$public.mix('assets/css/academi-styles.css')}}" rel="stylesheet">
    <script>
        window.public_ = "{{$public}}";
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
<script src="{{$public.mix("/assets/js/academi-scripts-student-1.js")}}"></script>
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
<script src="{{$public.mix('student/js/app.js')}}"></script>
<!-- Perfect Scrollbar -->
<script src="{{$public.mix("assets/js/academi-scripts-student-2.js")}}"></script>
</body>
</html>