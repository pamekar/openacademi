@php
    $public='';
        if(config('app.env') == 'production')
            $public ='/public';
@endphp
@extends('layouts.home')

@section('main')
    <div class="pagetop">
        <img src="jpg/pagetop.jpg" alt=""/>
        <div class="pagetop-inner">
            <div class="container">
                <h1>Education Courses</h1>
                <ul class="breadcrumbs">
                    <li><a href="#" title=""><i class="fa fa-home"></i> Home</a></li>
                    <li>Courses</li>
                </ul>
            </div>
        </div>
    </div><!-- PageTop -->

    <section>
        <div class="block less-space gray">
            <div class="container">
                <div class="row">
                    <div class="col-md-offset-1 col-md-3">
                        <div class="column-title">
                            <i>It's Time To Change In Yourself</i>
                            <h2>Find Next Course To <span>Boot Your Career</span></h2>
                        </div>
                    </div>

                    <div class="col-md-8">
                        <div class="search-course style2">
                            <form>
                                <div class="row">
                                    <div class="col-md-8"><input type="text" placeholder="Enter Your Course Name"/>
                                    </div>
                                    <div class="col-md-3">
                                        <button class="button active">Search Now</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section>
        <div class="block">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="featured-courses">
                            <div class="row">
                                @foreach($courses as $course)
                                    <div class="col-md-3">
                                        <div class="edu-course">
                                            <div class="edu-img">
                                                <a href="{{ route('courses.show', [$course->slug]) }}" title=""><img
                                                            src="{{Storage::url($course->course_image)}}"
                                                            alt=""/></a>
                                            </div>
                                            <div class="edu-detail">
                                                <h3><a href="{{ route('courses.show', [$course->slug]) }}"
                                                       title="">{{$course->title}}</a></h3>
                                                <p>{{$course->summary}}</p>
                                                <div class="course-bar">
                                                    <span>&#8358;{{ $course->price }}</span>
                                                    <div class="admin-name"><i>Carla Simpson</i></div>
                                                </div>
                                            </div>
                                        </div><!-- Edu Course -->
                                    </div>
                                @endforeach
                            </div>
                        </div><!-- Featured Courses -->

                        <ul class="pagination">
                            <li><a href="#" title=""><img src="png/arrow2.png" alt=""/></a></li>
                            <li><a href="#" title="">1</a></li>
                            <li><a class="active" href="#" title="">2</a></li>
                            <li><a href="#" title="">3</a></li>
                            <li><a href="#" title="">4</a></li>
                            <li><a href="#" title="">5</a></li>
                            <li> .......</li>
                            <li><a href="#" title="">9</a></li>
                            <li><a href="#" title=""><img src="png/arrow2.png" alt=""/></a></li>
                        </ul><!-- Pagination -->
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