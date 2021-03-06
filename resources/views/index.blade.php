@extends('layouts.home')
@section('title','Home')
@section('main')
    <section class="flat-title-page parallax parallax12 undescription">
        <div class="overlay"></div>
        <div class="container wrap-title-page bg-img ">
            <div class="title-page">
                <h2 class="title font-weight-700"><a href="#">Learn a Course Today</a></h2>
                <p>Browse through our course collection, and pick a topic to learn today.</p>
                <a href="#" class="flat-button btn-start-slider border-ra4 mt-3"> START A COURSE</a>
            </div>
        </div>
    </section> <!-- /.flat-title-page -->
    <div class="flat-counter style2">
        <div class="wrap-counter">
            <div class="container">
                <div class="counters clear-sub-columns style2">
                    <div class="counter style2 one-of-three">
                        <div class="overlay">
                            <img src="{{$public}}/png/img-hover-1.png" alt="openacademi" class="img-hover-1">
                            <img src="{{$public}}/png/img-hover-2.png" alt="openacademi" class="img-hover-2">
                        </div>
                        <div class="icon">
                                    <span class="icon-online-learning">
                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span><span class="path22"></span><span class="path23"></span><span class="path24"></span><span class="path25"></span><span class="path26"></span><span class="path27"></span><span class="path28"></span>
                                    </span>
                        </div>
                        <div class="content">
                            <p class="numb color-2ba2db"  data-from="0" data-to="1400" data-speed="2000" data-inviewport="yes">1400</p>
                            <h6 class="title color-2ba2db">ONLINE COURSES</h6>
                        </div>
                    </div>
                    <div class="counter style2  one-of-three active">
                        <div class="overlay">
                            <img src="{{$public}}/png/img-hover-1.png" alt="openacademi" class="img-hover-1">
                            <img src="{{$public}}/png/img-hover-2.png" alt="openacademi" class="img-hover-2">
                        </div>
                        <div class="icon">
                                    <span class="icon-teacher">
                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span><span class="path22"></span><span class="path23"></span><span class="path24"></span><span class="path25"></span><span class="path26"></span><span class="path27"></span><span class="path28"></span><span class="path29"></span><span class="path30"></span><span class="path31"></span><span class="path32"></span><span class="path33"></span><span class="path34"></span><span class="path35"></span><span class="path36"></span><span class="path37"></span><span class="path38"></span><span class="path39"></span><span class="path40"></span><span class="path41"></span><span class="path42"></span><span class="path43"></span><span class="path44"></span><span class="path45"></span><span class="path46"></span><span class="path47"></span><span class="path48"></span><span class="path49"></span><span class="path50"></span>
                                    </span>
                        </div>
                        <div class="content">
                            <p class="numb color-0dc9ac"  data-from="0" data-to="1200" data-speed="2000" data-inviewport="yes">1200</p>
                            <h6 class="title color-0dc9ac">EXPERT INSTRUCTORS</h6>
                        </div>
                    </div>
                    <div class="counter style2  one-of-three">
                        <div class="overlay">
                            <img src="{{$public}}/png/img-hover-1.png" alt="openacademi" class="img-hover-1">
                            <img src="{{$public}}/png/img-hover-2.png" alt="openacademi" class="img-hover-2">
                        </div>
                        <div class="icon">
                                    <span class="icon-education">
                                        <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span><span class="path18"></span><span class="path19"></span><span class="path20"></span><span class="path21"></span><span class="path22"></span><span class="path23"></span><span class="path24"></span><span class="path25"></span><span class="path26"></span>
                                    </span>
                        </div>
                        <div class="content">
                            <p class="numb color-f05455"  data-from="0" data-to="1000" data-speed="2000" data-inviewport="yes">1000</p>
                            <h6 class="title color-f05455">SUCCESS STORIES</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> <!-- /.flat-counter -->

    <section class="flat-popular-courses style3">
        <div class="container-fluid">
            <div class="flat-title flat-text-center">
                <h2 class="title">Discover Our Popular Courses</h2>
                <p class="description">Smply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                    the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of
                    type and scrambled it to make a type specimen book.</p>
            </div> <!-- /.flat-title -->
            <div class="flat-courses clear-sub-columns clearfix isotope-courses style2">
                @foreach($courses as $course)
                    <div class="course style2 one-of-four text-{{$colors[array_rand($colors)]}}">
                        <div class="course-border border-f-e6f3ff border-ra4 transition-vline">
                            <div class="course-img img-vline">
                                <a href="{{ route('courses.show', [$course->slug]) }}"><img
                                            src="{{$course->course_image_preview}}" alt="{{$course->title}}"></a>
                                <div class="overlay">
                                    <span class="vline"></span>
                                    <span class="vline vline-bottom"></span>
                                </div>
                            </div>
                            <div class="course-content">
                                <div class="text-wrap border-bt-e6f3ff">
                                    <h6 class="title"><a
                                                href="{{ route('courses.show', [$course->slug]) }}">{{$course->title}}</a>
                                    </h6>
                                    <p class="teacher"><a href="#">{{$course->instructor->full_name}}</a></p>
                                    @php

                                            @endphp
                                    <p class="description">{{$course->summary}}
                                    </p>
                                </div>
                                <div class="wrap-rating-price">
                                    <div class="wrap-rating">
                                        <star-rating :rating="{{explode(';',$course->rating)[0]}}"
                                                     :increment="0.01" :read-only="true" :star-size="14"
                                                     :show-rating="false"></star-rating>
                                        <span>{{explode(';',$course->rating)[0]}} ({{explode(';',$course->rating)[1]}}
                                            )</span>
                                    </div>
                                    <span class="price">&#8358;{{ number_format($course->price) }}</span>
                                </div>
                            </div>
                        </div>
                    </div> <!-- /.course -->
                @endforeach
            </div> <!-- /.flat-courses -->
            <div class="wrap-btn flat-text-center">
                <a href="{{route('courses.all')}}" class="flat-button btn-all-sourses font-Poppins font-weight-700 border-ra4">BROWSE ALL COURSES</a>
            </div>
        </div>
    </section> <!-- /.flat-popular-courses -->

    <section class="flat-register-now flat-popular-courses">
        <div class="overlay"></div>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="flat-tabs">
                        <ul class="tab-title clearfix style4 text-center">
                            @foreach($categories as $category)
                                <li class="item-title {{$category->slug}}">
                                    <i class="{{$category->icon}} d-block"></i>
                                    <span class="inner"> {{$category->title}}</span>
                                </li>
                            @endforeach
                        </ul>
                        <div class="tab-content-wrap">
                            @foreach($categories as $category)
                                <div class="tab-content" style="display: none;">
                                    <div class="item-content">
                                        <div class="flat-carousel" data-column="4" data-column2="2" data-loop="false"
                                             data-column3="1" data-gap="0" data-dots="false" data-nav="true">
                                            <div class="flat-courses clearfix owl-carousel">
                                                @foreach(\App\Course::where('published', 1)->where('category',$category->id)->inRandomOrder()->limit(8)->get() as $course)
                                                    <div class="course  text-{{$colors[array_rand($colors)]}}">
                                                        <div class="course-border border-f-e6f3ff border-ra4 transition-vline">
                                                            <div class="course-img img-vline">
                                                                <a href="{{ route('courses.show', [$course->slug]) }}"><img
                                                                            src="{{$course->course_image_preview}}"
                                                                            alt="{{$course->title}}"></a>
                                                                <div class="overlay">
                                                                    <span class="vline"></span>
                                                                    <span class="vline vline-bottom"></span>
                                                                </div>
                                                            </div>
                                                            <div class="course-content">
                                                                <div class="text-wrap border-bt-e6f3ff">
                                                                    <h6 class="title"><a
                                                                                href="{{ route('courses.show', [$course->slug]) }}">{{$course->title}}</a>
                                                                    </h6>
                                                                    <p class="teacher"><a
                                                                                href="#">{{$course->instructor->full_name}}</a>
                                                                    </p>
                                                                </div>
                                                                <div class="wrap-rating-price">
                                                                    <div class="wrap-rating">
                                                                        <star-rating
                                                                                :rating="{{explode(';',$course->rating)[0]}}"
                                                                                :increment="0.01" :read-only="true"
                                                                                :star-size="18"
                                                                                :show-rating="false"></star-rating>
                                                                        <span>{{explode(';',$course->rating)[0]}}
                                                                            ({{explode(';',$course->rating)[1]}}
                                                                            )</span>
                                                                    </div>
                                                                    <span class="price">&#8358;{{ number_format($course->price) }}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                @endforeach
                                            </div>
                                        </div>
                                    </div> <!-- /.flat-courses -->
                                    <div class="wrap-btn flat-text-center">
                                        <a href="{{route('courses.all',['category'=>$category->slug])}}" class="flat-button btn-all-sourses font-Poppins font-weight-700 border-ra4">BROWSE {{strtoupper($category->title)}} COURSES</a>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div> <!-- /.flat-tabs -->
                </div>
            </div>
        </div>
    </section> <!-- /.flat-register-now -->
@endsection

@section('scripts')

@endsection