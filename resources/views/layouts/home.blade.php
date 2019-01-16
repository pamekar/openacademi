@php
    $public='';
    if(config('app.env') == 'production')
        $public ='/public';
@endphp
        <!DOCTYPE html>
<html class="no-js">

<!-- Mirrored from bitlers.com/html/easy-edu/ by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 01 Jan 2019 10:13:27 GMT -->
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{config('app.name')}}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content=""/>
    <meta name="keywords" content=""/>

    <!-- Styles -->
    <link rel="stylesheet" type="text/css" href="{{asset("$public/css/bootstrap.min.css")}}"/>
    <link rel="stylesheet" href="{{asset("$public/css/icons.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("$public/css/style.css")}}"/>
    <link rel="stylesheet" type="text/css" href="{{asset("$public/css/responsive.css")}}"/>
    <link rel="stylesheet" type="text/css" href="{{asset("$public/css/color.css")}}"/>

    <!-- REVOLUTION STYLE SHEETS -->
    <link rel="stylesheet" type="text/css" href="{{asset("$public/css/settings.css")}}">
    <link rel="stylesheet" type="text/css" href="{{asset("$public/css/navigation.css")}}">
</head>
<body>
<div class="theme-layout">
    <header>
        <div class="container">
            <div class="logo"><a href="{{route('home')}}" title=""><img src="{{asset("$public/png/logo.png")}}" alt=""/></a>
            </div><!-- Logo -->
            <div class="header-wrap">
                <div class="topbar">
                    <span>
							Stay Connected: 
							<span class="socials">
								<a href="#" title=""><i class="fa fa-facebook"></i></a>
								<a href="#" title=""><i class="fa fa-twitter"></i></a>
								<a href="#" title=""><i class="fa fa-linkedin"></i></a>
							</span>
						</span>

                    <div class="registration">
                        @guest
                            <a href="{{route('register')}}" title="">Register</a>
                            <a href="{{route('login')}}" title="">Sign in</a>
                        @endguest
                        @auth
                                <a href="{{route('dashboard')}}" title="">Dashboard</a>
                                <a href="{{route('logout')}}" title="" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">Logout</a>
                        @endauth
                    </div>
                </div><!-- Top Bar -->

                <div class="menubar">
                    <nav>
                        <ul>
                            <li><a href="{{route('home')}}" title="">Home</a></li>
                            <li><a href="{{route('courses.all')}}" title="">Courses</a></li>
                            <li>
                                <a href="javascript:void(0)" title="">Categories</a>
                                <ul style="min-width: 290px;">
                                    <li><a href="{{route('courses.all')}}"><i class="icon-list"></i> All Courses</a>
                                    </li>
                                    @foreach($categories as $category)
                                        <li>
                                            <a href="{{route('courses.all',['category'=>$category->slug])}}">
                                                <i class="{{$category->icon}}"></i> {{$category->title}}
                                            </a>
                                        </li>
                                    @endforeach
                                </ul>
                            </li>
                            <li><a href="{{route('faq')}}" title="">FAQ</a></li>
                        </ul>
                    </nav>

                    <div class="header-search-bar">
                        <form action="google.com" class="form-inline">
                            <div class="form-group">
                                <input class="form-control" placeholder="Search for Courses" type="text">
                            </div>
                            <button class="btn btn-info"><i class="icon-magnifier"></i></button>
                        </form>
                    </div>
                </div>
            </div><!-- Header Wrap -->
        </div>
    </header><!-- Header -->

    <div class="responsive-header">
        <div class="topbar">
            <span>For Free Consultation: <i>+(011) 345 6789</i></span>
            <span>
					Stay Connected: 
					<span class="socials">
						<a href="#" title=""><i class="fa fa-facebook"></i></a>
						<a href="#" title=""><i class="fa fa-twitter"></i></a>
						<a href="#" title=""><i class="fa fa-linkedin"></i></a>
					</span>
				</span>

            <div class="registration">
                <a href="login-registration.html" title="">Register</a> <a href="login-registration.html" title="">Sign
                    in</a>
            </div>
        </div><!-- Top Bar -->

        <div class="responsive-logobar">
            <div class="responsive-logo"><a href="index-2.html" title=""><img src="{{asset("$public/png/logo.png")}}"
                                                                              alt=""/></a></div>
            <a class="menu-button" href="#" title=""><i class="fa fa-bars"></i></a>
        </div><!-- Responsive Logbar -->
        <div class="responsive-menu">
            <a class="close-menu" href="#" title=""><i class="fa fa-remove"></i></a>
            <ul>
                <li><a href="index-2.html" title="">Home</a>
                    <ul>
                        <li><a href="index-2.html" title="">Homepage Style 1</a></li>
                        <li><a href="index2.html" title="">Homepage Style 2</a></li>
                    </ul>
                </li>
                <li><a href="#" title="">Pages</a>
                    <ul>
                        <li><a href="blog.html" title="">Blog</a>
                            <ul>
                                <li><a href="blog.html" title="">Blog Page</a></li>
                                <li><a href="blog-details.html" title="">Blog Detail Page</a></li>
                            </ul>
                        </li>
                        <li><a href="events.html" title="">Events</a>
                            <ul>
                                <li><a href="events.html" title="">Events Page</a></li>
                                <li><a href="event-detail.html" title="">Event Detail Page</a></li>
                            </ul>
                        </li>
                        <li><a href="team.html" title="">Team</a>
                            <ul>
                                <li><a href="team.html" title="">Team Page</a></li>
                                <li><a href="team-detail.html" title="">Team Detail Page</a></li>
                            </ul>
                        </li>
                        <li><a href="faqs.html" title="">FAQ'S Page</a></li>
                        <li><a href="404.html" title="">Error 404 Page</a></li>
                        <li><a href="search-found.html" title="">Search Found Page</a></li>
                        <li><a href="search-not-found.html" title="">Search Not Found Page</a></li>
                        <li><a href="login-registration.html" title="">Login / Registration Page</a></li>
                    </ul>
                </li>
                <li><a href="courses.html" title="">Courses</a>
                    <ul>
                        <li><a href="courses.html" title="">Courses Page Style 1</a></li>
                        <li><a href="courses2.html" title="">Courses Page Style 2</a></li>
                        <li><a href="course-detail.html" title="">Courses Detail</a></li>
                    </ul>
                </li>
                <li><a href="gallery1.html" title="">Gallery Styles</a>
                    <ul>
                        <li><a href="gallery1.html" title="">Gallery Style 1</a></li>
                        <li><a href="gallery2.html" title="">Gallery Style 2</a></li>
                        <li><a href="gallery3.html" title="">Gallery Style 3</a></li>
                    </ul>
                </li>
                <li><a href="about.html" title="">About Us</a></li>
                <li><a href="contact.html" title="">Contact Us</a></li>
            </ul>
        </div>
    </div><!-- Responsive Header -->

    @yield('main')
    <footer>
        <div class="container">
            <div class="footer-widgets">
                <div class="row">
                    <div class="col-md-4">
                        <div class="widget">
                            <div class="about-widget">
                                <div class="widget-logo"><a href="index-2.html" title=""><img
                                                src="{{asset("$public/png/logo2-2.png")}}" alt=""/></a></div>
                                <p>Rem iplsum dolor sit amet, consectetuer adipiscin gelit, sed diam nonummy nibh
                                    euismod tincidunt ut laoreet dolore magna aliquam erat volutpat euimod....</p>
                                <ul>
                                    <li><span><i class="fa fa-map-marker"></i></span> Washington NY, United States.</li>
                                    <li><span><i class="fa fa-envelope"></i></span> Support@domain.com</li>
                                    <li><span><i class="fa fa-phone"></i></span> (123)+ 124 45 67 678</li>
                                </ul>
                            </div>
                        </div><!-- Widget -->
                    </div>
                    <div class="col-md-2">
                        <div class="widget">
                            <div class="widget-title">
                                <h5><i>EDU</i> Information</h5>
                                <span>Our Programs</span>
                            </div>
                            <ul>
                                <li><a href="#" title=""><i class="fa fa-bookmark"></i> Arts & Social Sciences</a></li>
                                <li><a href="#" title=""><i class="fa fa-bookmark"></i> Sciences</a></li>
                                <li><a href="#" title=""><i class="fa fa-bookmark"></i> Studies & Language</a></li>
                                <li><a href="#" title=""><i class="fa fa-bookmark"></i> Pharmacy</a></li>
                                <li><a href="#" title=""><i class="fa fa-bookmark"></i> Veterinary Science</a></li>
                                <li><a href="#" title=""><i class="fa fa-bookmark"></i> Engineering</a></li>
                            </ul>
                        </div><!-- Widget -->
                    </div>
                    <div class="col-md-3">
                        <div class="widget">
                            <div class="widget-title">
                                <h5><i>EDU</i> Gallery Posts</h5>
                                <span>Education Images</span>
                            </div>
                            <div class="edu-gallery">
                                <div class="col-md-4"><a class="html5lightbox"
                                                         data-thumbnail="{{asset("$public/images/resource/gallery1.jpg")}}"
                                                         data-group="set1" title="Gallery 1"
                                                         href="{{asset("$public/jpg/gallery1.jpg")}}"
                                    ><img src="{{asset("$public/jpg/gallery1.jpg")}}" alt=""/></a></div>
                                <div class="col-md-4"><a class="html5lightbox"
                                                         data-thumbnail="{{asset("$public/images/resource/gallery2.jpg")}}"
                                                         data-group="set1" title="Gallery 2"
                                                         href="{{asset("$public/jpg/gallery2.jpg")}}"
                                    ><img src="{{asset("$public/jpg/gallery2.jpg")}}" alt=""/></a></div>
                                <div class="col-md-4"><a class="html5lightbox"
                                                         data-thumbnail="{{asset("$public/images/resource/gallery3.jpg")}}"
                                                         data-group="set1" title="Gallery 3"
                                                         href="{{asset("$public/jpg/gallery3.jpg")}}"
                                    ><img src="{{asset("$public/jpg/gallery3.jpg")}}" alt=""/></a></div>
                                <div class="col-md-4"><a class="html5lightbox"
                                                         data-thumbnail="{{asset("$public/images/resource/gallery4.jpg")}}"
                                                         data-group="set1" title="Gallery 4"
                                                         href="{{asset("$public/jpg/gallery4.jpg")}}"
                                    ><img src="{{asset("$public/jpg/gallery4.jpg")}}" alt=""/></a></div>
                                <div class="col-md-4"><a class="html5lightbox"
                                                         data-thumbnail="{{asset("$public/images/resource/gallery5.jpg")}}"
                                                         data-group="set1" title="Gallery 5"
                                                         href="{{asset("$public/jpg/gallery5.jpg")}}"
                                    ><img src="{{asset("$public/jpg/gallery5.jpg")}}" alt=""/></a></div>
                                <div class="col-md-4"><a class="html5lightbox"
                                                         data-thumbnail="{{asset("$public/images/resource/gallery6.jpg")}}"
                                                         data-group="set1" title="Gallery 6"
                                                         href="{{asset("$public/jpg/gallery6.jpg")}}"
                                    ><img src="{{asset("$public/jpg/gallery6.jpg")}}" alt=""/></a></div>
                                <div class="col-md-4"><a class="html5lightbox"
                                                         data-thumbnail="{{asset("$public/images/resource/gallery7.jpg")}}"
                                                         data-group="set1" title="Gallery 7"
                                                         href="{{asset("$public/jpg/gallery7.jpg")}}"
                                    ><img src="{{asset("$public/jpg/gallery7.jpg")}}" alt=""/></a></div>
                                <div class="col-md-4"><a class="html5lightbox"
                                                         data-thumbnail="{{asset("$public/images/resource/gallery8.jpg")}}"
                                                         data-group="set1" title="Gallery 8"
                                                         href="{{asset("$public/jpg/gallery8.jpg")}}"
                                    ><img src="{{asset("$public/jpg/gallery8.jpg")}}" alt=""/></a></div>
                                <div class="col-md-4"><a class="html5lightbox"
                                                         data-thumbnail="{{asset("$public/images/resource/gallery9.jpg")}}"
                                                         data-group="set1" title="Gallery 9"
                                                         href="{{asset("$public/jpg/gallery9.jpg")}}"
                                    ><img src="{{asset("$public/jpg/gallery9.jpg")}}" alt=""/></a></div>
                            </div>

                        </div><!-- Widget -->
                    </div>
                    <div class="col-md-3">
                        <div class="widget">
                            <div class="widget-title">
                                <h5><i>EDU</i> Newsletter</h5>
                                <span>For any updates</span>
                            </div>
                            <div class="newsletter-widget">
                                <p>Rem iplsum dolor sit amet, consectetuer sed diam nonummy nibh euismod.</p>
                                <form>
                                    <input type="text" placeholder="Your Email Address"/>
                                    <button class="button active small">Submit Now</button>
                                </form>
                            </div>
                        </div><!-- Widget -->
                    </div>
                </div>
            </div>
        </div>
    </footer><!-- Footer -->

    <div class="bottom-footer">
        <div class="container">
            <p>COPYRIGHT © 2016 - <a href="#" title="">Easy EDU</a>. ALL RIGHTS RESERVED </p>
            <ul>
                <li><a href="index-2.html" title="">Home</a></li>
                <li><a href="courses.html" title="">Courses</a></li>
                <li><a href="events.html" title="">Events</a></li>
                <li><a href="gallery1.html" title="">Gallery</a></li>
                <li><a href="blog.html" title="">Blog</a></li>
                <li><a href="contact.html" title="">Contact Us</a></li>
            </ul>
        </div>
    </div><!-- Bottom Footer -->
</div>

<form id="logout-form" action="{{ url('/logout') }}"
      method="POST" style="display: none;"
>{{ csrf_field() }}</form>
<script src="{{asset("$public/js/jquery.min.js")}}" type="text/javascript"></script>

<!-- REVOLUTION JS FILES -->
<script type="text/javascript" src="{{asset("$public/js/jquery.themepunch.tools.min.js")}}"></script>
<script type="text/javascript" src="{{asset("$public/js/jquery.themepunch.revolution.min.js")}}"></script>

<!-- SLIDER REVOLUTION 5.0 EXTENSIONS -->
<script type="text/javascript" src="{{asset("$public/js/revolution.extension.actions.min.js")}}"></script>
<script type="text/javascript" src="{{asset("$public/js/revolution.extension.carousel.min.js")}}"></script>
<script type="text/javascript" src="{{asset("$public/js/revolution.extension.kenburn.min.js")}}"></script>
<script type="text/javascript" src="{{asset("$public/js/revolution.extension.layeranimation.min.js")}}"></script>
<script type="text/javascript" src="{{asset("$public/js/revolution.extension.migration.min.js")}}"></script>
<script type="text/javascript" src="{{asset("$public/js/revolution.extension.navigation.min.js")}}"></script>
<script type="text/javascript" src="{{asset("$public/js/revolution.extension.parallax.min.js")}}"></script>
<script type="text/javascript" src="{{asset("$public/js/revolution.extension.slideanims.min.js")}}"></script>
<script type="text/javascript" src="{{asset("$public/js/revolution.extension.video.min.js")}}"></script>
<script type="text/javascript" src="{{asset("$public/js/revolution.initialize.js")}}"></script>

<script src="{{asset("$public/js/owl.carousel.min.js")}}"></script>
<script src="{{asset("$public/js/html5lightbox.js")}}"></script>
<script src="{{asset("$public/js/counter.js")}}"></script>
<script src="{{asset("$public/js/isotope.js")}}" type="text/javascript"></script>
<script src="{{asset("$public/js/script.js")}}" type="text/javascript"></script>
<script src="{{asset("$public/js/bootstrap.min.js")}}" type="text/javascript"></script>

</body>
<!-- Mirrored from bitlers.com/html/easy-edu/ by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 01 Jan 2019 10:28:39 GMT -->
</html>

