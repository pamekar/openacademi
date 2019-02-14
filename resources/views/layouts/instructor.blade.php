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
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Perfect Scrollbar -->
    <link type="text/css" href="{{asset("$public/assets/vendor/perfect-scrollbar.css")}}" rel="stylesheet">

    <!-- Material Design Icons -->
    <link type="text/css" href="{{asset("$public/assets/css/material-icons.css")}}" rel="stylesheet">

    <!-- Font Awesome Icons -->
    <link type="text/css" href="{{asset("$public/assets/css/fontawesome.css")}}" rel="stylesheet">


    <!-- App CSS -->
    <link type="text/css" href="{{asset("$public/assets/css/app.css")}}" rel="stylesheet">
    <link type="text/css" href="{{asset("$public/assets/css/nestable.css")}}" rel="stylesheet">
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
<script src="{{asset("$public/assets/vendor/jquery.min.js")}}"></script>
<script src="{{asset("$public/assets/vendor/popper.min.js")}}"></script>
<script src="{{asset("$public/assets/vendor/bootstrap.min.js")}}"></script>

<script src="{{asset("$public/js/bootstrap-notify.min.js")}}"></script>
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
<!-- Perfect Scrollbar -->
<script src="{{asset("$public/assets/vendor/perfect-scrollbar.min.js")}}"></script>

<!-- MDK -->
<script src="{{asset("$public/assets/vendor/dom-factory.js")}}"></script>
<script src="{{asset("$public/assets/vendor/material-design-kit.js")}}"></script>
<!-- App JS -->
<script src="{{asset("$public/assets/js/app.js")}}"></script>

<script src="{{asset("$public/assets/vendor/jquery.nestable.js")}}"></script>
<script src="{{asset("$public/assets/js/nestable.js")}}"></script>
<!-- Highlight.js -->
<script src="{{asset("$public/assets/js/hljs.js")}}"></script>

<!-- App Settings (safe to remove) -->
<script src="{{asset("$public/assets/js/app-settings.js")}}"></script>

<script src="{{asset("$public/assets/js/settings.js")}}"></script>

<!-- Moment.js -->
<script src="{{asset("$public/assets/vendor/moment.min.js")}}"></script>
<script src="{{asset("$public/assets/vendor/moment-range.min.js")}}"></script>

<!-- Chart.js -->
<script src="{{asset("$public/assets/vendor/Chart.min.js")}}"></script>

<!-- UI Charts Page JS -->
<script src="{{asset("$public/assets/js/chartjs-rounded-bar.js")}}"></script>
<script src="{{asset("$public/assets/js/chartjs.js")}}"></script>

<!-- Chart.js Samples -->
<script>
    (function() {
        'use strict';

        Charts.init()

        var earnings = []

        // Create a date range for the last 7 days
        var start = moment().subtract(7, 'days').format('YYYY-MM-DD') // 7 days ago
        var end = moment().format('YYYY-MM-DD') // today
        var range = moment.range(start, end)

        // Create the earnings graph data
        // Iterate the date range and assign a random ($) earnings value for each day
        range.by('days', function(moment) {
            earnings.push({
                y: Math.floor(Math.random() * 300) + 10,
                x: moment.toDate()
            })
        })

        var Earnings = function(id, type = 'roundedBar', options = {}) {
            options = Chart.helpers.merge({
                barRoundness: 1.2,
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function(a) {
                                if (!(a % 10))
                                    return "$" + a
                            }
                        }
                    }],
                    xAxes: [{
                        offset: true,
                        ticks: {
                            padding: 10
                        },
                        maxBarThickness: 20,
                        gridLines: {
                            display: false
                        },
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function(a, e) {
                            var t = e.datasets[a.datasetIndex].label || "",
                                o = a.yLabel,
                                r = "";
                            return 1 < e.datasets.length && (r += '<span class="popover-body-label mr-auto">' + t + "</span>"), r += '<span class="popover-body-value">$' + o + "</span>"
                        }
                    }
                }
            }, options)

            var data = {
                datasets: [{
                    label: "Earnings",
                    data: earnings
                }]
            }

            Charts.create(id, type, options, data)
        }

        // Create Chart
        Earnings('#earningsChart')

    })()
</script>

<!-- List.js -->
<script src="{{asset("$public/assets/vendor/list.min.js")}}"></script>
<script src="{{asset("$public/assets/js/list.js")}}"></script>
<script src="{{asset("$public/teacher/js/app.js")}}"></script>

</body>

</html>