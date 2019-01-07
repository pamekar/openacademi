@php
    $public='';
        if(config('app.env') == 'production')
            $public ='/public';
@endphp
@extends('layouts.home')

@section('main')
    <section>
        <div class="block no-padding">
            <div class="row">
                <div class="col-md-12">
                    <div class="creative-slider">
                        <div id="rev_slider_4_1_wrapper" class="rev_slider_wrapper fullwidthbanner-container"
                             data-alias="classicslider1">
                            <div id="rev_slider_4_1" class="rev_slider fullwidthabanner" style="display:none;">
                                <ul>
                                    <li data-index="rs-1" data-transition="fade" data-slotamount="7"
                                        data-easein="Power4.easeInOut" data-easeout="Power4.easeInOut"
                                        data-masterspeed="2000" data-title="Slide 1">
                                        <!-- MAIN IMAGE -->
                                        <img src="{{asset("$public/jpg/slider1.jpg")}}" alt=""
                                             data-bgposition="center center" data-bgfit="cover"
                                             data-bgrepeat="no-repeat" data-bgparallax="4" class="rev-slidebg"
                                             data-no-retina>
                                        <!-- LAYER NR. 1 -->
                                        <div class="tp-caption layer1 tp-resizeme"
                                             id="slide-1-layer-1"
                                             data-x="center" data-hoffset=""
                                             data-y="center" data-voffset="-110"
                                             data-width="['auto','auto','auto','auto']"
                                             data-height="['auto','auto','auto','auto']"
                                             data-transform_idle="o:1;"
                                             data-transform_in="x:[-105%];z:0;rX:0deg;rY:0deg;rZ:-90deg;sX:1;sY:1;skX:0;skY:0;s:2000;e:Power4.easeInOut;"
                                             data-transform_out="s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;"
                                             data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
                                             data-start="1500"
                                             data-splitin="chars"
                                             data-splitout="none"
                                             data-responsive_offset="on"
                                             data-elementdelay="0.05"
                                             style="font-size:18px;letter-spacing:0.3px">Education Needs Complete
                                            Solution
                                        </div>

                                        <!-- LAYER NR. 2 -->
                                        <div class="tp-caption layer2 tp-resizeme"
                                             id="slide-1-layer-2"
                                             data-x="center" data-hoffset=""
                                             data-y="center" data-voffset="-65"
                                             data-width="['auto','auto','auto','auto']"
                                             data-height="['auto','auto','auto','auto']"
                                             data-transform_idle="o:1;"
                                             data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power3.easeInOut;"
                                             data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                                             data-mask_in="x:0px;y:[100%];s:inherit;e:inherit;"
                                             data-start="2000"
                                             data-splitin="none"
                                             data-splitout="none"
                                             data-responsive_offset="on"
                                             data-elementdelay="0.05"
                                             style="font-size:42px;letter-spacing:0.3px;line-height:45px">START LEARNING
                                            <span>TODAY!</span>
                                        </div>

                                        <!-- LAYER NR. 3 -->
                                        <div title="" class="tp-caption layer3 tp-resizeme"
                                             id="slide-1-layer-3"
                                             data-x="center" data-hoffset=""
                                             data-y="center" data-voffset=""
                                             data-width="['auto','auto','auto','auto']"
                                             data-height="['auto','auto','auto','auto']"
                                             data-transform_idle="o:1;"
                                             data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power3.easeInOut;"
                                             data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                                             data-mask_in="x:0px;y:[100%];s:inherit;e:inherit;"
                                             data-start="2200"
                                             data-splitin="none"
                                             data-splitout="none"
                                             data-responsive_offset="on"
                                             data-elementdelay="0.05"
                                             style="font-size:16px;letter-spacing:0.3; line-height:28px">Join our
                                            community to get Updates and Special Offers. You can <br> unsubscribe at any
                                            time (we can still be friends)!”
                                        </div>

                                        <!-- LAYER NR. 4 -->
                                        <a href="#" title="" class="tp-caption layer4 tp-resizeme"
                                           id="slide-1-layer-4"
                                           data-x="center" data-hoffset=""
                                           data-y="center" data-voffset="90"
                                           data-width="['auto','auto','auto','auto']"
                                           data-height="['auto','auto','auto','auto']"
                                           data-transform_idle="o:1;"
                                           data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power3.easeInOut;"
                                           data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                                           data-mask_in="x:0px;y:[100%];s:inherit;e:inherit;"
                                           data-start="2500"
                                           data-splitin="none"
                                           data-splitout="none"
                                           data-responsive_offset="on"
                                           data-elementdelay="0.05"
                                           style="font-size:12px;letter-spacing:0.3;padding:8px 35px">Classes Schdule
                                        </a>
                                    </li>
                                    <li data-index="rs-2" data-transition="fade" data-slotamount="7"
                                        data-easein="Power4.easeInOut" data-easeout="Power4.easeInOut"
                                        data-masterspeed="2000" data-title="Slide 2">
                                        <!-- MAIN IMAGE -->
                                        <img src="{{asset("$public/jpg/slider2.jpg")}}" alt=""
                                             data-bgposition="center center" data-bgfit="cover"
                                             data-bgrepeat="no-repeat" data-bgparallax="4" class="rev-slidebg"
                                             data-no-retina>
                                        <!-- LAYER NR. 1 -->
                                        <div class="tp-caption layer1 tp-resizeme"
                                             id="slide-2-layer-1"
                                             data-x="left" data-hoffset="575"
                                             data-y="center" data-voffset="-150"
                                             data-width="['auto','auto','auto','auto']"
                                             data-height="['auto','auto','auto','auto']"
                                             data-transform_idle="o:1;"
                                             data-transform_in="x:[-105%];z:0;rX:0deg;rY:0deg;rZ:-90deg;sX:1;sY:1;skX:0;skY:0;s:2000;e:Power4.easeInOut;"
                                             data-transform_out="s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;"
                                             data-mask_in="x:0px;y:0px;s:inherit;e:inherit;"
                                             data-start="1500"
                                             data-splitin="chars"
                                             data-splitout="none"
                                             data-responsive_offset="on"
                                             data-elementdelay="0.05"
                                             style="font-size:18px;letter-spacing:0.3px">Education Needs Complete
                                            Solution
                                        </div>

                                        <!-- LAYER NR. 2 -->
                                        <div class="tp-caption layer5 tp-resizeme"
                                             id="slide-2-layer-2"
                                             data-x="left" data-hoffset="575"
                                             data-y="center" data-voffset="-110"
                                             data-width="['auto','auto','auto','auto']"
                                             data-height="['auto','auto','auto','auto']"
                                             data-transform_idle="o:1;"
                                             data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power3.easeInOut;"
                                             data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                                             data-mask_in="x:0px;y:[100%];s:inherit;e:inherit;"
                                             data-start="2000"
                                             data-splitin="none"
                                             data-splitout="none"
                                             data-responsive_offset="on"
                                             data-elementdelay="0.05"
                                             style="font-size:30px;line-height:30px">Helping Students
                                        </div>

                                        <!-- LAYER NR. 3 -->
                                        <div class="tp-caption layer6 tp-resizeme"
                                             id="slide-2-layer-3"
                                             data-x="left" data-hoffset="575"
                                             data-y="center" data-voffset="-65"
                                             data-width="['auto','auto','auto','auto']"
                                             data-height="['auto','auto','auto','auto']"
                                             data-transform_idle="o:1;"
                                             data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power3.easeInOut;"
                                             data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                                             data-mask_in="x:0px;y:[100%];s:inherit;e:inherit;"
                                             data-start="2000"
                                             data-splitin="none"
                                             data-splitout="none"
                                             data-responsive_offset="on"
                                             data-elementdelay="0.05"
                                             style="font-size:42px;letter-spacing:0.3px;line-height:45px">REACH THEIR
                                            GOALS
                                        </div>

                                        <!-- LAYER NR. 4 -->
                                        <div title="" class="tp-caption layer7 tp-resizeme"
                                             id="slide-2-layer-4"
                                             data-x="left" data-hoffset="575"
                                             data-y="center" data-voffset=""
                                             data-width="['auto','auto','auto','auto']"
                                             data-height="['auto','auto','auto','auto']"
                                             data-transform_idle="o:1;"
                                             data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power3.easeInOut;"
                                             data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                                             data-mask_in="x:0px;y:[100%];s:inherit;e:inherit;"
                                             data-start="2200"
                                             data-splitin="none"
                                             data-splitout="none"
                                             data-responsive_offset="on"
                                             data-elementdelay="0.05"
                                             style="font-size:16px;letter-spacing:0.3; line-height:28px">Join our
                                            community to get Updates and Special Offers. You can <br> unsubscribe at any
                                            time (we can still be friends)!”
                                        </div>

                                        <!-- LAYER NR. 5 -->
                                        <a href="#" title="" class="tp-caption layer4 tp-resizeme"
                                           id="slide-2-layer-5"
                                           data-x="left" data-hoffset="575"
                                           data-y="center" data-voffset="90"
                                           data-width="['auto','auto','auto','auto']"
                                           data-height="['auto','auto','auto','auto']"
                                           data-transform_idle="o:1;"
                                           data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power3.easeInOut;"
                                           data-transform_out="s:1000;e:Power3.easeInOut;s:1000;e:Power3.easeInOut;"
                                           data-mask_in="x:0px;y:[100%];s:inherit;e:inherit;"
                                           data-start="2500"
                                           data-splitin="none"
                                           data-splitout="none"
                                           data-responsive_offset="on"
                                           data-elementdelay="0.05"
                                           style="font-size:12px;letter-spacing:0.3;padding:8px 35px">Classes Schdule
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div><!-- Creative Slider  -->
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="block">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="easyedu-services style2">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="edu-service">
                                        <img src="{{asset("$public/png/service1.png")}}" alt=""/>
                                        <i>Our Popular Courses</i>
                                        <h3>Update My Information</h3>
                                        <p>Mauris eleifend nisi justo, in volutpat magna nterdum et male suada
                                            fames. </p>
                                    </div><!-- Edu Service -->
                                </div>
                                <div class="col-md-4">
                                    <div class="edu-service">
                                        <img src="{{asset("$public/png/service2.png")}}" alt=""/>
                                        <i>Our Popular Courses</i>
                                        <h3>Courses Management </h3>
                                        <p>Mauris eleifend nisi justo, in volutpat magna nterdum et male suada
                                            fames. </p>
                                    </div><!-- Edu Service -->
                                </div>
                                <div class="col-md-4">
                                    <div class="edu-service">
                                        <img src="{{asset("$public/png/service3.png")}}" alt=""/>
                                        <i>Our Popular Courses</i>
                                        <h3>Books And Library</h3>
                                        <p>Mauris eleifend nisi justo, in volutpat magna nterdum et male suada
                                            fames. </p>
                                    </div><!-- Edu Service -->
                                </div>
                            </div>
                        </div><!-- Edu Services -->
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section>
        <div class="block gray">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="title">
                            <h2>Explore All Courses</h2>
                            <span>Choose Your Courses</span>
                            <p>Vestibulum at magna tellus. Vivamus sagittis et nunc ut in orci aliquam, ac vulputa leo
                                vehicula. Mauris porttit magna tellus. Vivamus sagittis et nunc.</p>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <section class="options">
                            <div class="option-isotop">
                                <ul id="filter" class="option-set filters-nav" data-option-key="filter">
                                    <li><a href="#" class="selected" data-option-value="*">All Courses</a></li>
                                    @foreach($categories as $category)
                                        <li>
                                            <a href="#" data-option-value=".course-{{$category->id+32132}}">
                                                {{$category->title}}</a>
                                        </li>
                                    @endforeach
                                </ul>
                            </div>

                            <div class="button-set">
                                <a class="button active" href="{{route('courses.all')}}" title="">View All Courses</a>
                            </div>
                        </section><!-- FILTER BUTTONS -->
                    </div>
                    <div class="col-md-9">
                        <div class="featured-courses style2">
                            <div class="row">
                                <div class="masonary">
                                    @foreach($courses as $course)
                                        <div class="col-md-4 course-{{$course->category+32132}}">
                                            <div class="edu-course">
                                                <div class="edu-img">
                                                    <a href="{{ route('courses.show', [$course->slug]) }}" title=""><img
                                                                src="{{Storage::url($course->course_image)}}"
                                                                alt=""/></a>
                                                </div>
                                                <div class="edu-detail">
                                                    <i>Online Course </i>
                                                    <h3><a href="{{ route('courses.show', [$course->slug]) }}"
                                                           title="">{{$course->title}}</a></h3>
                                                    <div class="admin-name"> Eric Lee</div>
                                                    <div class="course-bar">
                                                        <span>&#8358;{{ number_format($course->price/100) }}</span>
                                                        <div class="stars">
                                                            @for ($star = 1; $star <= 5; $star++)
                                                                @if ($course->rating >= $star)
                                                                    <a href="#" title=""><i class="fa fa-star"></i></a>
                                                                @else
                                                                    <a href="#" title=""><i
                                                                                class="fa fa-star-o"></i></a>
                                                                @endif
                                                            @endfor
                                                        </div>
                                                    </div>
                                                </div>
                                            </div><!-- Edu Course -->
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div><!-- Feartured Courses -->
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="block remove-bottom blackish">
            <div class="fixed-bg bg1"></div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="parallax-title">
                            <i>Its time to change in yourself</i>
                            <h2>Welcome & Register now</h2>
                            <span>Learning Email Marketing</span>
                            <p>Vestibulum at magna tellus nunc utin orci aliquam, new equipment digest delivers <br> the
                                latest industrial product information ac vulputate ipsmcon.</p>
                        </div>

                        <div class="register-video">
                            <a class="button active" href="{{route('auth.register')}}" title="">Register Now</a>
                            <div class="video-img">
                                <img src="{{asset("$public/jpg/video.jpg")}}" alt=""/>
                                <a class="html5lightbox"
                                   href="https://player.vimeo.com/video/1084537?title=0&amp;byline=0&amp;portrait=0"
                                   title=""><img src="{{asset("$public/png/play.png")}}" alt=""/></a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="block">
            <div class="container">
                <div class="col-md-12">
                    <div class="easyedu-counter">
                        <div class="row">
                            <div class="col-md-3">
                                <div class="counter">
                                    <img src="{{asset("$public/png/edu-counter1.png")}}" alt=""/>
                                    <div class="counter-inner">
                                        <strong><i class="count">10</i> k</strong>
                                        <span>EDU Students</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="counter">
                                    <img src="{{asset("$public/png/edu-counter2.png")}}" alt=""/>
                                    <div class="counter-inner">
                                        <strong><i class="count">18</i></strong>
                                        <span>EDU Teachers</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="counter">
                                    <img src="{{asset("$public/png/edu-counter3.png")}}" alt=""/>
                                    <div class="counter-inner">
                                        <strong><i class="count">100</i> +</strong>
                                        <span>Research Labs</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <div class="counter">
                                    <img src="{{asset("$public/png/edu-counter4.png")}}" alt=""/>
                                    <div class="counter-inner">
                                        <strong><i class="count">3060</i></strong>
                                        <span>Wining Awards</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>


    <section>
        <div class="block">
            <div class="fixed-bg stop bg4"></div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="title">
                            <h2>Our Education staff</h2>
                            <span>Learn From Best Staff</span>
                            <p>Vestibulum at magna tellus. Vivamus sagittis et nunc ut in orci aliquam, ac vulputa leo
                                vehicula. Mauris porttit magna tellus. Vivamus sagittis et nunc.</p>
                        </div>

                        <div class="educational-staff">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="staff">
                                        <div class="staff-img"><img src="{{asset("$public/jpg/staff1.jpg")}}" alt=""/>
                                        </div>
                                        <div class="staff-detail">
                                            <h4><a href="team-detail.html" title="">Jeremy Remark</a></h4>
                                            <span>Multi Teacher</span>
                                            <div class="connected">
                                                <strong>Stay Connected</strong>
                                                <a href="#" title=""><i class="fa fa-facebook"></i></a>
                                                <a href="#" title=""><i class="fa fa-twitter"></i></a>
                                                <a href="#" title=""><i class="fa fa-linkedin"></i></a>
                                            </div>
                                        </div>
                                    </div><!-- Staff -->
                                </div>
                                <div class="col-md-4">
                                    <div class="staff">
                                        <div class="staff-img"><img src="{{asset("$public/jpg/staff2.jpg")}}" alt=""/>
                                        </div>
                                        <div class="staff-detail">
                                            <h4><a href="team-detail.html" title="">Maria Lehman</a></h4>
                                            <span>IT Expert & Teacher</span>
                                            <div class="connected">
                                                <strong>Stay Connected</strong>
                                                <a href="#" title=""><i class="fa fa-facebook"></i></a>
                                                <a href="#" title=""><i class="fa fa-twitter"></i></a>
                                                <a href="#" title=""><i class="fa fa-linkedin"></i></a>
                                            </div>
                                        </div>
                                    </div><!-- Staff -->
                                </div>
                                <div class="col-md-4">
                                    <div class="staff">
                                        <div class="staff-img"><img src="{{asset("$public/jpg/staff3.jpg")}}" alt=""/>
                                        </div>
                                        <div class="staff-detail">
                                            <h4><a href="team-detail.html" title="">Arnold Chesku</a></h4>
                                            <span>Accounting and Finance</span>
                                            <div class="connected">
                                                <strong>Stay Connected</strong>
                                                <a href="#" title=""><i class="fa fa-facebook"></i></a>
                                                <a href="#" title=""><i class="fa fa-twitter"></i></a>
                                                <a href="#" title=""><i class="fa fa-linkedin"></i></a>
                                            </div>
                                        </div>
                                    </div><!-- Staff -->
                                </div>
                            </div>
                        </div><!-- Educational Staff -->

                        <div class="button-set">
                            <a class="button active" href="contact.html" title="">Get In Touch</a>
                            <a class="button" href="team.html" title="">All Teachers</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section>
        <div class="block no-padding blackish">
            <div class="fixed-bg bg3"></div>
            <div class="row">
                <div class="col-md-12">
                    <div class="edu-event">
                        <div class="event-img"><img src="{{asset("$public/jpg/upcoming-event.jpg")}}" alt=""/></div>
                        <div class="event-detail">
                            <div class="event-date"><span>15</span> September</div>
                            <div class="event-description">
                                <i>Upcoming Event</i>
                                <h3><a href="event-detail.html" title="">Annual Meetup And Scholarship Presentation</a>
                                </h3>
                                <span class="loc"><i
                                            class="fa fa-map-marker"></i> 363 Oakwood Avenue Irmo, SC 29063 </span>
                                <p>Estibulum orci felis, ullamcorper non condimentum ultrices ac nunc. Mauris non ligula
                                    suscipit, vulputa. Consectetur adipiscing elites. Nulla convallis egestas rhoncusa.
                                    Donec loremvel proin vestibulum.</p>
                            </div>
                            <a class="event-btn" href="event-detail.html" title="">Join This Event</a>
                        </div>
                    </div><!-- Edu Event -->
                </div>
            </div>
        </div>
    </section>


    <section>
        <div class="block">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="title">
                            <h2>Our Education Gallery</h2>
                            <span>Hot News On The Spot</span>
                            <p>Vestibulum at magna tellus. Vivamus sagittis et nunc ut in orci aliquam, ac vulputa leo
                                vehicula. Mauris porttit magna tellus. Vivamus sagittis et nunc.</p>
                        </div>
                        <div class="fancy-gallery">
                            <div class="row">
                                <div class="masonary">
                                    <div class="edu-col col-md-2">
                                        <a class="html5lightbox" href="{{asset("$public/jpg/fancy-gallery1.jpg")}}"
                                           title=""><img src="{{asset("$public/jpg/fancy-gallery1.jpg")}}" alt=""/></a>
                                    </div>
                                    <div class="edu-col col-md-4">
                                        <a class="html5lightbox" href="{{asset("$public/jpg/fancy-gallery2.jpg")}}"
                                           title=""><img src="{{asset("$public/jpg/fancy-gallery2.jpg")}}" alt=""/></a>
                                    </div>
                                    <div class="edu-col col-md-4">
                                        <a class="html5lightbox" href="{{asset("$public/jpg/fancy-gallery3.jpg")}}"
                                           title=""><img src="{{asset("$public/jpg/fancy-gallery3.jpg")}}" alt=""/></a>
                                    </div>
                                    <div class="edu-col col-md-2">
                                        <a class="html5lightbox" href="{{asset("$public/jpg/fancy-gallery4.jpg")}}"
                                           title=""><img src="{{asset("$public/jpg/fancy-gallery4.jpg")}}" alt=""/></a>
                                    </div>
                                    <div class="edu-col col-md-2">
                                        <a class="html5lightbox" href="{{asset("$public/jpg/fancy-gallery5.jpg")}}"
                                           title=""><img src="{{asset("$public/jpg/fancy-gallery5.jpg")}}" alt=""/></a>
                                    </div>
                                    <div class="edu-col col-md-3">
                                        <a class="html5lightbox" href="{{asset("$public/jpg/fancy-gallery6.jpg")}}"
                                           title=""><img src="{{asset("$public/jpg/fancy-gallery6.jpg")}}" alt=""/></a>
                                    </div>
                                    <div class="edu-col col-md-3">
                                        <a class="html5lightbox" href="{{asset("$public/jpg/fancy-gallery7.jpg")}}"
                                           title=""><img src="{{asset("$public/jpg/fancy-gallery7.jpg")}}" alt=""/></a>
                                    </div>
                                    <div class="edu-col col-md-2">
                                        <a class="html5lightbox" href="{{asset("$public/jpg/fancy-gallery8.jpg")}}"
                                           title=""><img src="{{asset("$public/jpg/fancy-gallery8.jpg")}}" alt=""/></a>
                                    </div>
                                    <div class="edu-col col-md-2">
                                        <a class="html5lightbox" href="{{asset("$public/jpg/fancy-gallery9.jpg")}}"
                                           title=""><img src="{{asset("$public/jpg/fancy-gallery9.jpg")}}" alt=""/></a>
                                    </div>
                                </div>
                            </div>
                        </div><!-- Fancy Gallery -->
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section>
        <div class="block remove-gap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="title">
                            <h2>Education Tips & News</h2>
                            <span>Hot News On The Spot</span>
                            <p>Vestibulum at magna tellus. Vivamus sagittis et nunc ut in orci aliquam, ac vulputa leo
                                vehicula. Mauris porttit magna tellus. Vivamus sagittis et nunc.</p>
                        </div>

                        <div class="edu-blog">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="edu-post">
                                        <div class="post-img"><img src="{{asset("$public/jpg/post1.jpg")}}" alt=""/>
                                        </div>
                                        <div class="post-detail">
                                            <span>02 November 2016</span>
                                            <h3><a href="blog-details.html" title="">The Surprising Reason College
                                                    Tuition Is Crazy Expensive</a></h3>
                                            <ul class="meta">
                                                <li><a href="#" title="">03 Comment</a></li>
                                                <li>By: Addam Smith</li>
                                            </ul>
                                            <p>Estibulum orci felis, ullamcorper non condimentum ultrices ac nunc.
                                                Mauris non ligula suscipit, vulputa mi accumsan, dapibus felis. </p>
                                        </div>
                                    </div><!-- Edu Post -->
                                </div>
                                <div class="col-md-4">
                                    <div class="edu-post">
                                        <div class="post-img"><img src="{{asset("$public/jpg/post2.jpg")}}" alt=""/>
                                        </div>
                                        <div class="post-detail">
                                            <span>02 November 2016</span>
                                            <h3><a href="blog-details.html" title="">Atiam Ornare Condimentum Massa
                                                    Sceleri Sque</a></h3>
                                            <ul class="meta">
                                                <li><a href="#" title="">03 Comment</a></li>
                                                <li>By: Addam Smith</li>
                                            </ul>
                                            <p>Estibulum orci felis, ullamcorper non condimentum ultrices ac nunc.
                                                Mauris non ligula suscipit, vulputa mi accumsan, dapibus felis. </p>
                                        </div>
                                    </div><!-- Edu Post -->
                                </div>
                                <div class="col-md-4">
                                    <div class="edu-post">
                                        <div class="post-img"><img src="{{asset("$public/jpg/post3.jpg")}}" alt=""/>
                                        </div>
                                        <div class="post-detail">
                                            <span>02 November 2016</span>
                                            <h3><a href="blog-details.html" title="">Neque porro quisquam est dolorem
                                                    ipsum dolor</a></h3>
                                            <ul class="meta">
                                                <li><a href="#" title="">03 Comment</a></li>
                                                <li>By: Addam Smith</li>
                                            </ul>
                                            <p>Estibulum orci felis, ullamcorper non condimentum ultrices ac nunc.
                                                Mauris non ligula suscipit, vulputa mi accumsan, dapibus felis. </p>
                                        </div>
                                    </div><!-- Edu Post -->
                                </div>
                            </div>
                        </div><!-- Edu Blog -->
                        <div class="button-set">
                            <a class="button active" href="blog.html" title="">View ALL POSTS</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section>
        <div class="block gray">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="logos-carousel">
                            <a href="#" title=""><img src="{{asset("$public/png/logo1.png")}}" alt=""/></a>
                            <a href="#" title=""><img src="{{asset("$public/png/logo2.png")}}" alt=""/></a>
                            <a href="#" title=""><img src="{{asset("$public/png/logo3.png")}}" alt=""/></a>
                            <a href="#" title=""><img src="{{asset("$public/png/logo4.png")}}" alt=""/></a>
                            <a href="#" title=""><img src="{{asset("$public/png/logo5.png")}}" alt=""/></a>
                            <a href="#" title=""><img src="{{asset("$public/png/logo1.png")}}" alt=""/></a>
                            <a href="#" title=""><img src="{{asset("$public/png/logo2.png")}}" alt=""/></a>
                        </div><!-- Logos Carousel -->
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection