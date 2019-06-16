<!DOCTYPE html>
<!--[if IE 8 ]>
<html class="ie" xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US" lang="en-US"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en-US" lang="en-US">
<!--<![endif]-->

<head>
    <!-- Basic Page Needs -->
    <meta charset="utf-8">
    <!--[if IE]>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><![endif]-->
    <title>@yield('title') | {{setting('site.title')}}</title>

    <meta name="author" content="openacademi.com">

    <!-- Mobile Specific Metas -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <!-- Bootstrap  -->
    <link rel="stylesheet" type="text/css" href="{{$public}}/css/bootstrap.css">

    <!-- Theme Style -->
    <link rel="stylesheet" type="text/css" href="{{$public}}/css/style.css">
    <link rel="stylesheet" type="text/css" href="{{$public}}/css/responsive.css">
    <link rel="stylesheet" type="text/css" href="{{$public}}/css/color1.css" id="colors">

    <link rel="apple-touch-icon" sizes="180x180" href="{{$public}}/png/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="{{$public}}/png/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="{{$public}}/png/favicon-16x16.png">
    <link rel="manifest" href="{{$public}}/site.webmanifest">


</head>
<body class="bg-body3">
<div class="boxed" id="app">
    <div id="header" class="bg-fff style1">
        <div class="container">
            <div class="header-wrap clearfix">
                <div id="logo">
                    <a href="{{url('')}}"><img src="{{$public}}/png/logo.png" alt="openacademi" width="157" height="29"
                                               data-width="157" data-height="29"></a>
                </div>
                <div class="extra-menu float-left flat-text-left clearfix">
                    <div class="wrap-search-header">
                        <div class="search-header">
                            <form action="{{route('courses.search')}}" method="get">
                                <input type="search" name="q" placeholder="Search for Courses">
                                <button class="btn-search"><span class="icon-search"></span></button>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="nav-wrap flat-text-left style1">
                    <nav id="main-nav">
                        <ul class="menu">
                            <li class="active">
                                <a href="#">COURSES</a>
                                <ul class="submenu">
                                    <li class="active"><a href="{{route('courses.all')}}">Browse Course</a></li>
                                    <li><a href="{{route('courses.all')}}">My Courses</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#">CATEGORIES</a>
                                <ul class="submenu">
                                    @foreach($categories as $category)
                                        <li>
                                            <a href="{{route('courses.all',['category'=>$category->slug])}}">
                                                <i class="mr-3 {{$category->icon}}"></i> {{$category->title}}
                                            </a>
                                        </li>
                                    @endforeach
                                </ul>
                            </li>
                            @guest
                                <li class="d-md-none d-block"><a href="{{route('register')}}">Register</a></li>
                                <li class="d-md-none d-block"><a href="{{route('login')}}">Login</a></li>
                            @endguest
                            @auth
                                <li class="d-md-none d-block"><a href="{{route('user')}}">Dashboard</a></li>
                                <li class="d-md-none d-block"><a href="{{route('logout')}}" title=""
                                                                 onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Logout</a>
                                </li>
                            @endauth
                        </ul>
                    </nav>
                </div>
                <div class="nav-wrap flat-text-left float-right style1 d-none d-lg-block">
                    <nav id="main-nav">
                        <ul class="menu">
                            @guest
                                <li><a href="{{route('register')}}">Register</a></li>
                                <li><a href="{{route('login')}}">Login</a></li>
                            @endguest
                            @auth
                                <li><a href="{{route('user')}}">Dashboard</a></li>
                                <li><a href="{{route('logout')}}" title=""
                                       onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Logout</a>
                                </li>
                            @endauth
                        </ul>
                    </nav>
                </div>
                <div class="extra-menu flat-text-left clearfix">
                    <div class="cart nav-top-cart-wrapper">
                        <a href="#"><span class="bf-icon icon-cart"></span></a> <span class="count-cart">0</span>
                        <div class="nav-shop-cart">
                            <div class="widget_shopping_cart_content">
                                <div class="woocommerce-min-cart-wrap">
                                    <ul class="woocommerce-mini-cart cart_list product_list_widget flat-text-center">
                                        <li class="woocommerce-mini-cart-item mini_cart_item">
                                            <span>No Items in Shopping Cart</span>
                                        </li>
                                    </ul>
                                </div><!-- /.widget_shopping_cart_content -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mobile-button">
                    <span></span>
                </div>

            </div>
        </div>
    </div> <!-- #header -->

    @yield('main')
    <hr>
    <footer id="footer">
        <div class="container">
            <div class="row">
                <div class="col-md-4">
                    <div class="widget-about">
                        <div id="logo-ft">
                            <a href="{{url('')}}"><img src="{{$public}}/png/logo.png" alt="openacademi" width="157"
                                                       height="29" data-retina="images/logo/logo-ft@2x.png"
                                                       data-width="157" data-height="29"></a>
                        </div>
                        <p class="description">
                            {{setting('site.description')}}
                        </p>
                        <div class="list-info">
                            <ul>
                                <li class="address"><a href="#">1107 Wood Street Saginaw, MI New York 48607</a></li>
                                <li class="phone"><a href="#">+123 345 678 000</a></li>
                                <li class="mail"><a href="#">info@example.com</a></li>
                            </ul>
                        </div>
                        <div class="socails">
                            <ul class="list">
                                <li><a href="#"><span class="fa fa-twitter"></span></a></li>
                                <li><a href="#"><span class="fa fa-linkedin-square"></span></a></li>
                                <li><a href="#"><span class="fa fa-facebook-official"></span></a></li>
                                <li><a href="#"><span class="fa fa-skype"></span></a></li>
                                <li><a href="#"><span class="fa fa-pinterest-square"></span></a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="widget-link widget-ft">
                        <h6 class=" widget-title">USEFUL LINK</h6>
                        <div class="list-wrap clearfix">
                            <ul class="one-of-two">
                                <li><a href="#">Register Activation Key</a></li>
                                <li><a href="#"> Our Plans</a></li>
                                <li><a href="#"> Government Solutions</a></li>
                                <li><a href="#">Academic Solutions</a></li>
                                <li><a href="#">Intellectual Property</a></li>
                            </ul>
                            <ul class="one-of-two">
                                <li><a href="#">Free Trial</a></li>
                                <li><a href="#"> Support</a></li>
                                <li><a href="#">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="widget-recent-work widget-ft">
                        <h6 class="widget-title">RECENT WORK</h6>
                        <div class="flat-recentOwl" data-column="4" data-column2="3" data-loop="true" data-column3="2"
                             data-gap="0" data-dots="false" data-nav="true">
                            <div class="flat-imgbox style1 clearfix owl-carousel">
                                <div class="column">
                                    <div class="imgbox style1 transition-vline">
                                        <a href="#">
                                            <div class="imgbox-img img-vline">
                                                <img src="{{$public}}/png/work-1.png" alt="openacademi">
                                                <div class="overlay">
                                                    <span class="vline"></span>
                                                    <span class="vline vline-bottom"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="imgbox style1 transition-vline">
                                        <a href="#">
                                            <div class="imgbox-img img-vline">
                                                <img src="{{$public}}/png/work-5.png" alt="openacademi">
                                                <div class="overlay">
                                                    <span class="vline"></span>
                                                    <span class="vline vline-bottom"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="imgbox style1 transition-vline">
                                        <a href="#">
                                            <div class="imgbox-img img-vline">
                                                <img src="{{$public}}/png/work-2.png" alt="openacademi">
                                                <div class="overlay">
                                                    <span class="vline"></span>
                                                    <span class="vline vline-bottom"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="imgbox style1 transition-vline">
                                        <a href="#">
                                            <div class="imgbox-img img-vline">
                                                <img src="{{$public}}/png/work-6.png" alt="openacademi">
                                                <div class="overlay">
                                                    <span class="vline"></span>
                                                    <span class="vline vline-bottom"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="imgbox style1 transition-vline">
                                        <a href="#">
                                            <div class="imgbox-img img-vline">
                                                <img src="{{$public}}/png/work-3.png" alt="openacademi">
                                                <div class="overlay">
                                                    <span class="vline"></span>
                                                    <span class="vline vline-bottom"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="imgbox style1 transition-vline">
                                        <a href="#">
                                            <div class="imgbox-img img-vline">
                                                <img src="{{$public}}/png/work-7.png" alt="openacademi">
                                                <div class="overlay">
                                                    <span class="vline"></span>
                                                    <span class="vline vline-bottom"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="imgbox style1 transition-vline">
                                        <a href="#">
                                            <div class="imgbox-img img-vline">
                                                <img src="{{$public}}/png/work-4.png" alt="openacademi">
                                                <div class="overlay">
                                                    <span class="vline"></span>
                                                    <span class="vline vline-bottom"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="imgbox style1 transition-vline">
                                        <a href="#">
                                            <div class="imgbox-img img-vline">
                                                <img src="{{$public}}/png/work-8.png" alt="openacademi">
                                                <div class="overlay">
                                                    <span class="vline"></span>
                                                    <span class="vline vline-bottom"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="imgbox style1 transition-vline">
                                        <a href="#">
                                            <div class="imgbox-img img-vline">
                                                <img src="{{$public}}/png/work-1.png" alt="openacademi">
                                                <div class="overlay">
                                                    <span class="vline"></span>
                                                    <span class="vline vline-bottom"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="imgbox style1 transition-vline">
                                        <a href="#">
                                            <div class="imgbox-img img-vline">
                                                <img src="{{$public}}/png/work-2.png" alt="openacademi">
                                                <div class="overlay">
                                                    <span class="vline"></span>
                                                    <span class="vline vline-bottom"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="imgbox style1 transition-vline">
                                        <a href="#">
                                            <div class="imgbox-img img-vline">
                                                <img src="{{$public}}/png/work-3.png" alt="openacademi">
                                                <div class="overlay">
                                                    <span class="vline"></span>
                                                    <span class="vline vline-bottom"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="imgbox style1 transition-vline">
                                        <a href="#">
                                            <div class="imgbox-img img-vline">
                                                <img src="{{$public}}/png/work-4.png" alt="openacademi">
                                                <div class="overlay">
                                                    <span class="vline"></span>
                                                    <span class="vline vline-bottom"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="imgbox style1 transition-vline">
                                        <a href="#">
                                            <div class="imgbox-img img-vline">
                                                <img src="{{$public}}/png/work-5.png" alt="openacademi">
                                                <div class="overlay">
                                                    <span class="vline"></span>
                                                    <span class="vline vline-bottom"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="imgbox style1 transition-vline">
                                        <a href="#">
                                            <div class="imgbox-img img-vline">
                                                <img src="{{$public}}/png/work-6.png" alt="openacademi">
                                                <div class="overlay">
                                                    <span class="vline"></span>
                                                    <span class="vline vline-bottom"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="imgbox style1 transition-vline">
                                        <a href="#">
                                            <div class="imgbox-img img-vline">
                                                <img src="{{$public}}/png/work-7.png" alt="openacademi">
                                                <div class="overlay">
                                                    <span class="vline"></span>
                                                    <span class="vline vline-bottom"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="imgbox style1 transition-vline">
                                        <a href="#">
                                            <div class="imgbox-img img-vline">
                                                <img src="{{$public}}/png/work-8.png" alt="openacademi">
                                                <div class="overlay">
                                                    <span class="vline"></span>
                                                    <span class="vline vline-bottom"></span>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="wrap-btn">
                            <a href="#" class="btn-view-more">VIEW MORE</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer> <!-- #footer -->

    <div class="bottom bg-15222e">
        <div class="container">
            <div class="row">
                <div class="  col-md-6">
                    <div class="copyright flat-text-left">
                        <p>© Copyright {{date('Y')}} <a href="#">{{config('app.name')}}</a>. All Rights Reserved.</p>
                    </div>
                </div>
                <div class="  col-md-6">
                    <div class="widget flat-text-right no-border">
                        <ul class="list">
                            <li><a href="#">Privacy</a></li>
                            <li><a href="#">Terms</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                            <li><a href="#">Sitemap</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div> <!-- /.bottom -->

    <a id="scroll-top"></a>
</div>

<form id="logout-form" action="{{ url('/logout') }}"
      method="POST" style="display: none;"
>{{ csrf_field() }}</form>

<script src="{{$public.mix('js/academi-scripts-home.js')}}"></script>
<script src="{{$public.mix('js/app.js')}}"></script>
</body>
</html>