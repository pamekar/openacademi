<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>@yield('title') | {{config('app.name')}}</title>

    <link rel="apple-touch-icon" sizes="180x180" href="{{$public}}/png/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="{{$public}}/png/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="{{$public}}/png/favicon-16x16.png">
    <link rel="manifest" href="{{$public}}/site.webmanifest">

    <link type="text/css" href="{{$public}}/assets/vendor/perfect-scrollbar.css" rel="stylesheet">
    <!-- Material Design Icons -->
    <link type="text/css" href="{{$public}}/assets/css/material-icons.css" rel="stylesheet">

    <!-- Font Awesome Icons -->
    <link type="text/css" href="{{$public}}/assets/css/fontawesome.css" rel="stylesheet">

    <!-- App CSS -->
    <link type="text/css" href="{{$public}}/assets/css/app.css" rel="stylesheet">
</head>

<body class="login">

@yield('content')

<!-- jQuery -->
<script src="{{$public}}/assets/vendor/jquery.min.js"></script>

<!-- Bootstrap -->
<script src="{{$public}}/assets/vendor/popper.min.js"></script>
<script src="{{$public}}/assets/vendor/bootstrap.min.js"></script>

<!-- Perfect Scrollbar -->
<script src="{{$public}}/assets/vendor/perfect-scrollbar.min.js"></script>

<!-- MDK -->
<script src="{{$public}}/assets/vendor/dom-factory.js"></script>
<script src="{{$public}}/assets/vendor/material-design-kit.js"></script>

<!-- App JS -->
<script src="{{$public}}/assets/js/app.js"></script>

<!-- Highlight.js -->
<script src="{{$public}}/assets/js/hljs.js"></script>

<script src="{{$public}}/assets/js/jquery.validate.min.js"></script>

@yield('scripts')
</body>

</html>