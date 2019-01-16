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
    <link type="text/css" href="{{asset("$public/assets/css/material-icons.rtl.css")}}" rel="stylesheet">

    <!-- Font Awesome Icons -->
    <link type="text/css" href="{{asset("$public/assets/css/fontawesome.css")}}" rel="stylesheet">
    <link type="text/css" href="{{asset("$public/assets/css/fontawesome.rtl.css")}}" rel="stylesheet">

    <!-- App CSS -->
    <link type="text/css" href="{{asset("$public/assets/css/app.css")}}" rel="stylesheet">
    <link type="text/css" href="{{asset("$public/assets/css/app.rtl.css")}}" rel="stylesheet">
</head>

<body class=" fixed-layout">


<div class="preloader">
    <div class="sk-double-bounce">
        <div class="sk-child sk-double-bounce1"></div>
        <div class="sk-child sk-double-bounce2"></div>
    </div>
</div>

<!-- Header Layout -->
<div class="mdk-header-layout js-mdk-header-layout">

    <!-- Header -->

    <div id="header" class="mdk-header bg-dark js-mdk-header m-0" data-fixed data-effects="waterfall">
        <div class="mdk-header__content">

            <!-- Navbar -->
            <nav id="default-navbar" class="navbar navbar-expand navbar-dark bg-primar m-0">
                <div class="container">
                    <!-- Toggle sidebar -->
                    <button class="navbar-toggler d-block" data-toggle="sidebar" type="button">
                        <span class="material-icons">menu</span>
                    </button>

                    <!-- Brand -->
                    <a href="{{route('home')}}" class="navbar-brand">
                        <img src="{{asset("$public/assets/images/logo/white.svg")}}" class="mr-2" alt="LearnPlus"/>
                        <span class="d-none d-xs-md-block">LearnPlus</span>
                    </a>

                    <!-- Search -->
                    <form class="search-form d-none d-md-flex">
                        <input type="text" class="form-control" placeholder="Search">
                        <button class="btn" type="button"><i class="material-icons font-size-24pt">search</i></button>
                    </form>
                    <!-- // END Search -->

                    <div class="flex"></div>

                    <!-- Menu -->
                    <ul class="nav navbar-nav flex-nowrap d-none d-lg-flex">
                        <li class="nav-item">
                            <a class="nav-link" href="fixed-student-forum.html">Forum</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="fixed-student-help-center.html">Get Help</a>
                        </li>
                    </ul>

                    <!-- Menu -->
                    <ul class="nav navbar-nav flex-nowrap">

                        <li class="nav-item d-none d-md-flex">
                            <a href="fixed-student-cart.html" class="nav-link">
                                <i class="material-icons">shopping_cart</i>
                            </a>
                        </li>


                        <!-- Notifications dropdown -->
                        <li class="nav-item dropdown dropdown-notifications dropdown-menu-sm-full">
                            <button class="nav-link btn-flush dropdown-toggle" type="button" data-toggle="dropdown"
                                    data-dropdown-disable-document-scroll data-caret="false">
                                <i class="material-icons">notifications</i>
                                <span class="badge badge-notifications badge-danger">2</span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right">
                                <div data-perfect-scrollbar class="position-relative">
                                    <div class="dropdown-header"><strong>Messages</strong></div>
                                    <div class="list-group list-group-flush mb-0">

                                        <a href="fixed-student-messages.html"
                                           class="list-group-item list-group-item-action unread">
                                                <span class="d-flex align-items-center mb-1">
                                                    <small class="text-muted">5 minutes ago</small>

                                                    <span class="ml-auto unread-indicator bg-primary"></span>

                                                </span>
                                            <span class="d-flex">
                                                    <span class="avatar avatar-xs mr-2">
                                                        <img src="{{asset("$public/assets/images/people/110/woman-5.jpg")}}"
                                                             alt="people"
                                                             class="avatar-img rounded-circle">
                                                    </span>
                                                    <span class="flex d-flex flex-column">
                                                        <strong>Michelle</strong>
                                                        <span class="text-black-70">Clients loved the new design.</span>
                                                    </span>
                                                </span>
                                        </a>

                                        <a href="fixed-student-messages.html"
                                           class="list-group-item list-group-item-action unread">
                                                <span class="d-flex align-items-center mb-1">
                                                    <small class="text-muted">5 minutes ago</small>

                                                    <span class="ml-auto unread-indicator bg-primary"></span>

                                                </span>
                                            <span class="d-flex">
                                                    <span class="avatar avatar-xs mr-2">
                                                        <img src="{{asset("$public/assets/images/people/110/woman-5.jpg")}}"
                                                             alt="people"
                                                             class="avatar-img rounded-circle">
                                                    </span>
                                                    <span class="flex d-flex flex-column">
                                                        <strong>Michelle</strong>
                                                        <span class="text-black-70">🔥 Superb job..</span>
                                                    </span>
                                                </span>
                                        </a>

                                    </div>

                                    <div class="dropdown-header"><strong>System notifications</strong></div>
                                    <div class="list-group list-group-flush mb-0">

                                        <a href="fixed-student-messages.html"
                                           class="list-group-item list-group-item-action border-left-3 border-left-danger">
                                                <span class="d-flex align-items-center mb-1">
                                                    <small class="text-muted">3 minutes ago</small>

                                                </span>
                                            <span class="d-flex">
                                                    <span class="avatar avatar-xs mr-2">
                                                        <span class="avatar-title rounded-circle bg-light">
                                                            <i class="material-icons font-size-16pt text-danger">account_circle</i>
                                                        </span>
                                                    </span>
                                                    <span class="flex d-flex flex-column">

                                                        <span class="text-black-70">Your profile information has not been synced correctly.</span>
                                                    </span>
                                                </span>
                                        </a>

                                        <a href="fixed-student-messages.html"
                                           class="list-group-item list-group-item-action">
                                                <span class="d-flex align-items-center mb-1">
                                                    <small class="text-muted">5 hours ago</small>

                                                </span>
                                            <span class="d-flex">
                                                    <span class="avatar avatar-xs mr-2">
                                                        <span class="avatar-title rounded-circle bg-light">
                                                            <i class="material-icons font-size-16pt text-success">group_add</i>
                                                        </span>
                                                    </span>
                                                    <span class="flex d-flex flex-column">
                                                        <strong>Adrian. D</strong>
                                                        <span class="text-black-70">Wants to join your private group.</span>
                                                    </span>
                                                </span>
                                        </a>

                                        <a href="fixed-student-messages.html"
                                           class="list-group-item list-group-item-action">
                                                <span class="d-flex align-items-center mb-1">
                                                    <small class="text-muted">1 day ago</small>

                                                </span>
                                            <span class="d-flex">
                                                    <span class="avatar avatar-xs mr-2">
                                                        <span class="avatar-title rounded-circle bg-light">
                                                            <i class="material-icons font-size-16pt text-warning">storage</i>
                                                        </span>
                                                    </span>
                                                    <span class="flex d-flex flex-column">

                                                        <span class="text-black-70">Your deploy was successful.</span>
                                                    </span>
                                                </span>
                                        </a>

                                    </div>
                                </div>
                            </div>
                        </li>
                        <!-- // END Notifications dropdown -->
                        <!-- User dropdown -->
                        <li class="nav-item dropdown ml-1 ml-md-3">
                            <a class="nav-link active dropdown-toggle" data-toggle="dropdown" href="#"
                               role="button"><img src="{{asset("$public/assets/images/people/50/guy-6.jpg")}}"
                                                  alt="Avatar"
                                                  class="rounded-circle" width="40"></a>
                            <div class="dropdown-menu dropdown-menu-right">
                                <a class="dropdown-item" href="fixed-student-account-edit.html">
                                    <i class="material-icons">edit</i> Edit Account
                                </a>
                                <a class="dropdown-item" href="fixed-student-profile.html">
                                    <i class="material-icons">person</i> Public Profile
                                </a>
                                <a class="dropdown-item" href="{{route('logout')}}" title=""
                                   onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    <i class="material-icons">lock</i> Logout
                                </a>
                            </div>
                        </li>
                        <!-- // END User dropdown -->

                    </ul>
                    <!-- // END Menu -->
                </div>
            </nav>
            <!-- // END Navbar -->

        </div>
    </div>

    <!-- // END Header -->

    <!-- Header Layout Content -->
    <div class="mdk-header-layout__content d-flex flex-column">

        @yield('content')
    <div class="page">
        <div class="container page__container">
            <div class="footer">
                Copyright &copy; {{date('Y')}} - <a
                        href="{{route('home')}}">{{config('app.name')}}</a>
            </div>
        </div>
    </div>
    </div>
    <!-- // END Header Layout Content -->

</div>
<!-- // END Header Layout -->


<div class="mdk-drawer js-mdk-drawer" id="default-drawer">
    <div class="mdk-drawer__content ">
        <div class="sidebar sidebar-left sidebar-dark bg-dark o-hidden" data-perfect-scrollbar>
            <div class="sidebar-p-y">
                <div class="sidebar-heading">APPLICATIONS</div>
                <ul class="sidebar-menu sm-active-button-bg">
                    <li class="sidebar-menu-item active">
                        <a class="sidebar-menu-button" href="fixed-student-dashboard.html">
                            <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">account_box</i> Student
                        </a>
                    </li>
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button" href="fixed-instructor-dashboard.html">
                            <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">school</i> Instructor
                        </a>
                    </li>
                </ul>
                <div class="sidebar-heading">Student</div>
                <ul class="sidebar-menu sm-active-button-bg">
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button" href="fixed-student-browse-courses.html">
                            <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">search</i> Browse
                            Courses
                        </a>
                    </li>
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button" href="fixed-student-view-course.html">
                            <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">import_contacts</i> View
                            Course
                        </a>
                    </li>
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button" href="fixed-student-take-course.html">
                            <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">class</i> Take Course
                            <span class="sidebar-menu-badge badge badge-primary ml-auto">PRO</span>
                        </a>
                    </li>
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button" href="fixed-student-take-quiz.html">
                            <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">dvr</i> Take a Quiz
                        </a>
                    </li>
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button" href="fixed-student-quiz-results.html">
                            <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">poll</i> Quiz Results
                        </a>
                    </li>
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button" href="fixed-student-account-edit.html">
                            <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">account_box</i> Edit
                            Account
                        </a>
                    </li>
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button" href="fixed-student-my-courses.html">
                            <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">school</i> My Courses
                        </a>
                    </li>
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button" data-toggle="collapse" href="#messages_menu">
                            <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">comment</i> Messages
                            <span class="ml-auto sidebar-menu-toggle-icon"></span>
                        </a>
                        <ul class="sidebar-submenu sm-indent collapse" id="messages_menu">
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-student-messages.html">
                                    <span class="sidebar-menu-text">Conversation</span>
                                    <span class="sidebar-menu-badge badge badge-primary badge-notifications ml-auto">2</span>
                                </a>
                            </li>
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-student-messages-2.html">
                                    <span class="sidebar-menu-text">Conversation - 2</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button" href="fixed-student-billing.html">
                            <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">monetization_on</i>
                            Billing
                            <span class="sidebar-menu-badge badge ml-auto">$25</span>
                        </a>
                    </li>
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button" href="guest-login.html">
                            <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">lock_open</i> Logout
                        </a>
                    </li>
                </ul>
                <!-- Components menu -->
                <div class="sidebar-heading">Components</div>
                <ul class="sidebar-menu">
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button sidebar-js-collapse" data-toggle="collapse"
                           href="#components_menu">
                            <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">tune</i>
                            Components
                            <span class="ml-auto sidebar-menu-toggle-icon"></span>
                        </a>
                        <ul class="sidebar-submenu sm-indent collapse" id="components_menu">
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-avatars.html">
                                    <span class="sidebar-menu-text">Avatars</span>
                                </a>
                            </li>
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-forms.html">
                                    <span class="sidebar-menu-text">Forms</span>
                                </a>
                            </li>
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-loaders.html">
                                    <span class="sidebar-menu-text">Loaders</span>
                                </a>
                            </li>
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-tables.html">
                                    <span class="sidebar-menu-text">Tables</span>
                                </a>
                            </li>
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-cards.html">
                                    <span class="sidebar-menu-text">Cards</span>
                                </a>
                            </li>
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-tabs.html">
                                    <span class="sidebar-menu-text">Tabs</span>
                                </a>
                            </li>
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-icons.html">
                                    <span class="sidebar-menu-text">Icons</span>
                                </a>
                            </li>
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-buttons.html">
                                    <span class="sidebar-menu-text">Buttons</span>
                                </a>
                            </li>
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-alerts.html">
                                    <span class="sidebar-menu-text">Alerts</span>
                                </a>
                            </li>
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-badges.html">
                                    <span class="sidebar-menu-text">Badges</span>
                                </a>
                            </li>
                            <!-- <li class="sidebar-menu-item">
    <a class="sidebar-menu-button" href="fixed-ui-modals.html">
      <span class="sidebar-menu-text">- Modals</span>
    </a>
  </li> -->
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-progress.html">
                                    <span class="sidebar-menu-text">Progress Bars</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button sidebar-js-collapse" data-toggle="collapse" href="#plugins_menu">
                            <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">folder</i>
                            Plugins
                            <span class="ml-auto sidebar-menu-toggle-icon"></span>
                        </a>
                        <ul class="sidebar-submenu sm-indent collapse" id="plugins_menu">
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-charts.html">
                                    <span class="sidebar-menu-text">Charts</span>
                                </a>
                            </li>
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-drag.html">
                                    <span class="sidebar-menu-text">Drag &amp; Drop</span>
                                </a>
                            </li>
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-calendar.html">
                                    <span class="sidebar-menu-text">Calendar</span>
                                </a>
                            </li>
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-nestable.html">
                                    <span class="sidebar-menu-text">Nestable</span>
                                </a>
                            </li>
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-tree.html">
                                    <span class="sidebar-menu-text">Tree</span>
                                </a>
                            </li>
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-maps-vector.html">
                                    <span class="sidebar-menu-text">Vector Maps</span>
                                </a>
                            </li>
                            <li class="sidebar-menu-item">
                                <a class="sidebar-menu-button" href="fixed-ui-sweet-alert.html">
                                    <span class="sidebar-menu-text">Sweet Alert</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <!-- // END Components Menu -->

                <div class="sidebar-heading">Layout</div>
                <ul class="sidebar-menu">
                    <li class="sidebar-menu-item">
                        <a class="sidebar-menu-button" href="student-dashboard.html">
                            <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">dashboard</i> Fluid
                            Layout
                        </a>
                    </li>
                    <li class="sidebar-menu-item active">
                        <a class="sidebar-menu-button" href="fixed-student-dashboard.html">
                            <i class="sidebar-menu-icon sidebar-menu-icon--left material-icons">dashboard</i> Fixed
                            Layout
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>


<!-- App Settings FAB -->
<div id="app-settings">
    <app layout-active="fixed" :layout-location="{
      'fixed': 'fixed-student-dashboard.html',
      'default': 'student-dashboard.html'
    }" sidebar-variant="bg-transparent border-0"></app>
</div>
<form id="logout-form" action="{{ url('/logout') }}"
      method="POST" style="display: none;"
>{{ csrf_field() }}</form>
<script src="{{asset("$public/js/app.js")}}"></script>
<!-- jQuery -->
<script src="{{asset("$public/assets/vendor/jquery.min.js")}}"></script>

<!-- Bootstrap -->
<script src="{{asset("$public/assets/vendor/popper.min.js")}}"></script>
<script src="{{asset("$public/assets/vendor/bootstrap.min.js")}}"></script>

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