
@extends('layouts.home')

@section('main')
    <div class="pagetop">
        <img src="{{asset("$public/jpg/pagetop.jpg")}}" alt=""/>
        <div class="pagetop-inner">
            <div class="container">
                <h1>{{$course->title}}</h1>
                <ul class="breadcrumbs">
                    <li><a href="index-2.html" title=""><i class="fa fa-home"></i> Home</a></li>
                    <li><a href="courses.html" title=""> Courses</a></li>
                    <li>Course Details</li>
                </ul>
            </div>
        </div>
    </div><!-- PageTop -->


    <section>
        <div class="block">
            <div class="container">
                <div class="row">
                    <div class="col-md-9">
                        <div class="detail-page">
                            <div class="course-info">
                                <span><i>Category:</i> Graphic Designing</span>
                                <span><i>Class Size: </i> 33</span>
                            </div>
                            <h1 class="post-title">{{$course->title}}</h1>
                            <div class="abt-course">
                                <div class="course-teacher">
                                    <img src="{{asset("$public/jpg/teacher.jpg")}}" alt=""/>
                                    <strong>Teacher: <i>Rebeca Adams </i></strong>
                                </div>
                                <div class="review">
                                    <strong>Review:</strong>

                                    @for ($star = 1; $star <= 5; $star++)
                                        @if ($course->rating >= $star)
                                            <i class="fa fa-star fill"></i>
                                        @else
                                            <i class="fa fa-star"></i>
                                        @endif
                                    @endfor

                                </div>
                                <a class="button active "
                                   href="{{ route('register') }}?redirect_url={{ route('courses.show', [$course->slug]) }}">Enroll
                                    For This</a>
                            </div><!-- About Course -->
                            <div class="single-post-img">
                                <span class="course-price">&#8358;{{number_format($course->price/100)}}</span>
                                <img src="{{$course->course_image}}" alt=""/>
                            </div>

                            <div>

                                <p>{{ $course->description }}</p>

                            </div>
                        </div><!-- Detail Page -->

                        <div class="tags-share">
                            @php
                                $tags=explode(';',$course->tags);
                            @endphp
                            <div class="tags">
                                <strong class="gray-small-title">Tags</strong>
                                @foreach($tags as $tag)
                                    <a href="#" title="">{{$tag}},</a>
                                @endforeach
                            </div><!-- Tags -->

                            <div class="share-post">
                                <strong class="gray-small-title">Share This:</strong>
                                <a href="#" title=""><i class="fa fa-tumblr"></i></a>
                                <a href="#" title=""><i class="fa fa-facebook"></i></a>
                                <a href="#" title=""><i class="fa fa-twitter"></i></a>
                            </div><!-- Share -->
                        </div><!-- Tags & Share -->

                        <div class="edu-author inst">
                            <img src="{{asset("$public/jpg/edu-author.jpg")}}" alt=""/>
                            <div class="author-detail">
                                <span>About Instructor</span>
                                <h4>Maria Lehman <i>IT Expert</i></h4>
                                <p>Sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                                    ali et accusam et justo duo dolores. At vero eos et accusam et justo.</p>
                                <div class="connected">
                                    <strong>Stay Connected</strong>
                                    <a href="#" title=""><i class="fa fa-facebook"></i></a>
                                    <a href="#" title=""><i class="fa fa-twitter"></i></a>
                                    <a href="#" title=""><i class="fa fa-linkedin"></i></a>
                                </div>
                            </div>
                        </div><!-- Edu Author -->


                        <div class="comments-form">
                            <div class="simple-title">
                                <i>Please Leave Your Thinking</i>
                                <h2>Leave a Comment</h2>
                            </div>

                            <form>
                                <div class="row">
                                    <div class="col-md-6"><input type="text" placeholder="Full Name"/></div>
                                    <div class="col-md-6"><input type="text" placeholder="Full Name"/></div>
                                    <div class="col-md-12"><input type="text" placeholder="Full Name"/></div>
                                    <div class="col-md-12"><textarea placeholder="Detail"></textarea></div>
                                    <div class="col-md-12">
                                        <button class="button active">Comment Now</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <aside class="col-md-3 sidebar">
                        <div class="widget">
                            <form class="searchform">
                                <input type="text" placeholder="Enter Your keywords"/>
                                <button><i class="fa fa-search"></i></button>
                            </form>
                        </div><!-- Widget -->

                        <div class="widget">
                            <div class="widget-title">
                                <span>What You Get From Us</span>
                                <h4>Lessons</h4>
                            </div>
                            <div class="sidebar-blogs">
                                @foreach ($course->publishedLessons as $lesson)
                                    <div class="sidebar-post">
                                        <img src="{{Storage::url($lesson->lesson_image)}}" width="85" height="75"
                                             alt=""/>
                                        <div class="post-inner">
                                            <span>     <a
                                                        href="{{ route('lessons.show', [$lesson->course_id, $lesson->slug]) }}"
                                                        title="">{{strtoupper($lesson->title)}}</a></span>
                                            <h3>{{$lesson->short_text}}</h3>
                                            @if ($lesson->free_lesson)<small class="text-muted">*Free*</small>@endif

                                        </div>
                                    </div>
                                @endforeach
                            </div>
                        </div><!-- Widget -->
                    </aside>
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
                            <a href="#" title=""><img src="png/logo1.png" alt=""/></a>
                            <a href="#" title=""><img src="png/logo2.png" alt=""/></a>
                            <a href="#" title=""><img src="png/logo3.png" alt=""/></a>
                            <a href="#" title=""><img src="png/logo4.png" alt=""/></a>
                            <a href="#" title=""><img src="png/logo5.png" alt=""/></a>
                            <a href="#" title=""><img src="png/logo1.png" alt=""/></a>
                            <a href="#" title=""><img src="png/logo2.png" alt=""/></a>
                        </div><!-- Logos Carousel -->
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection