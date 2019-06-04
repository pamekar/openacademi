@extends('layouts.home')
@php
    $smallImages=["$public/png/img-small-2.png"];
@endphp
@section('main')
    <section class="flat-title-page parallax parallax11 style4">
        <div class="overlay style4"></div>
        <div class="container wrap-title-page bg-img ">
            <div class="title-page">
                <h2 class="title font-weight-700"><a href="#">{{$course->title}}</a></h2>
                <p class="text">{{$course->summary}}</p>
            </div>
            <div class="breadcrumbs">
                <ul>
                    <li><a href="{{route('home')}}">Home</a></li>
                    <li><a href="{{route('courses.all')}}">Courses</a></li>
                    <li><a href="{{ route('courses.show', [$course->slug]) }}">{{$course->title}}</a></li>
                </ul>
            </div>
            <img src="{{$public}}/png/bg-white.png" alt="openacademi" class="bg-breadcrumbs style2">
        </div>
    </section> <!-- /.flat-title-page -->

    <div class="content-wrap  courses-single-page">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-12">
                    <div class="content-page-wrap">
                        <div class="course-single">
                            <div class="img-single">
                                <a href="#"><img src="{{$course->course_image}}" alt="openacademi"></a>
                            </div>
                            <div class="content">
                                <div class="heading">
                                    <h6 class="title"><a href="#">{{$course->title}}</a></h6>
                                    <p class="description">{{$course->summary}}</p>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="price-wrap">
                                            <span class="sale-price color-f3728b">&#8358;{{ number_format($course->price) }}</span>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="wrap-cart flat-text-right">
                                            <a href="#" class="btn-cart">Add To Cart</a>
                                            <a href="#" class="flat-button btn-buy border-ra4 float-right">BUY NOW</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="author border-t-e6f3ff">
                                    <div class="author-avata">
                                        <img src="{{$public}}/png/author-teacher.png" alt="openacademi">
                                    </div>
                                    <div class="author-info">
                                        <h6 class="name"><a href="#">{{$course->instructor->full_name}}</a></h6>
                                        <div class="wrap-list">
                                            <ul class="list meta-list">
                                                <li>
                                                    <span class="title">Categories:</span>
                                                    <a href="#"><span> {{$course->course_cat}} </span></a>
                                                </li>
                                                <li>
                                                    <a href="#"><span>49,997</span></a>
                                                    <span class="title">Students Enrolled</span>
                                                </li>
                                            </ul>
                                            <ul class="list meta-rate">
                                                <li>
                                                    <star-rating :rating="{{explode(';',$course->rating)[0]}}"
                                                                 :increment="0.01" :read-only="true" :star-size="14"
                                                                 :show-rating="false"></star-rating>
                                                    <span class="font-weight-700">{{explode(';',$course->rating)[0]}}
                                                        ({{explode(';',$course->rating)[1]}}
                                                        )</span>
                                                </li>
                                                <li>
                                                    <span class="font-weight-700"> {{$course->created_at}}</span>
                                                </li>
                                                <li>
                                                    <span class="font-weight-700"> Updated {{$course->last_updated}}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- /.course-single -->
                        <div class="flat-tabs bg-fff border-ra4 border-f-e6f3ff">
                            <ul class="tab-title style1 clearfix border-bt-e6f3ff">
                                <li class="item-title  overview">
                                    <span class="inner">OVERVIEW</span>
                                </li>
                                <li class="item-title event">
                                    <span class="inner">DESCRIPTION</span>
                                </li>
                                <li class="item-title requirements">
                                    <span class="inner">REQUIREMENTS</span>
                                </li>
                                <li class="item-title review">
                                    <span class="inner">REVIEW</span>
                                </li>
                            </ul>
                            <div class="tab-content-wrap">
                                <div class="tab-content">
                                    <div class="item-content">
                                        <div class="text-wrap img-right clearfix">
                                            <div class="img-single-small flat-text-center">
                                                <img src="{{$course->course_image_preview}}" class="img img-thumbnail" alt="openacademi" style="max-width:200px;">
                                            </div>
                                            <h6 class="title"><a href="#">About This Course</a></h6>
                                            <p class="text">                                            {!! $course->description !!}
                                            </p>
                                        </div>
                                        <div class="text-wrap img-left clearfix">
                                            <div class="img-single-small flat-text-center">
                                                <img src="{{$smallImages[array_rand($smallImages)]}}" alt="openacademi">
                                            </div>
                                            <h6 class="title"> Here some of the things you will Learn: </h6>
                                            <p class="text">Lorem Ipsn gravida nibh vel velit auctor aliquet sollic
                                                elorem quis bibendum auci elit conseo.</p>
                                            <ul class="list-skill">
                                                <li> Top-secret tricks for shortcut enthusiasts</li>
                                                <li> Assigning and converting color profiles</li>
                                                <li> Using Smart Filters for creative effects</li>
                                                <li> Turning a cityscape into a tiny planet</li>
                                                <li> Hunting down seams with the Offset filter</li>
                                                <li> Using blur and noise to focus attention & simulate motion</li>
                                            </ul>
                                        </div>
                                        <div class="wrap-checkmark-tag clearfix">
                                            <div class="tags one-of-two">
                                                @foreach($course->tags as $tag)
                                                    <a href="#"
                                                       class="tag-item bg-{{$background[array_rand($background)]}}">{{$tag}}</a>
                                                @endforeach
                                            </div>
                                            <div class="checkmark one-of-two flat-text-right">
                                                <span>Was this review helpful?</span>
                                                <a href="#" class="btn-yes">Yes</a>
                                                <a href="#" class="btn-no">No</a>
                                                <span class="report">Report</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-content">
                                    <div class="item-content">
                                        <div class="img-single-small flat-text-center">
                                            <img src="{{$public}}/png/img-small.png" alt="openacademi">
                                        </div>
                                        <div class="text-wrap">
                                            <h6 class="title"><a href="#">Limitless Learning, Limitless
                                                    Possibilities</a></h6>
                                            <p class="text">Lorem Ipsn gravida nibh vel velit auctor aliquet. Aenean
                                                sollicitudin, lorem quis bibendum auci elit consequat ipsutis sem nibh
                                                id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet mauris.
                                                Morbi accum dolor same mipsum rvelit. </p>
                                        </div>
                                        <div class="text-wrap">
                                            <h6 class="title"><a href="#">About This Event</a></h6>
                                            <p class="text">Per inceptos himenaeos. Mauris in erat justo. Nullam ac urna
                                                eu felis dapibus condimentum sit amet a augue. Sed non mauris vitae erat
                                                consequat auctor eu in elit. Class aptent tacitio sociosqu ad litora
                                                torquent.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-content">
                                    <div class="item-content">
                                        <h1>No Review</h1>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- /.flat-tabs -->
                    </div> <!-- /.content-page-wrap -->
                </div>
                <div class="col-lg-4 col-md-12">
                    <div class="sidebar-right">
                        <h3 class="title mb-3"><a
                                    href="{{route('courses.all',['category'=>$course->category])}}">{{$course->course_cat}}
                                Courses </a></h3>
                        <div class="flat-courses style3">
                            @foreach($featuredCourses as $course)
                                <div class="course style3 text-2ebd59">
                                    <div class="course-border border-f-e6f3ff border-ra4 transition-vline">
                                        <div class="course-img img-vline">
                                            <a href="{{route('courses.show',['slug'=>$course->slug])}}"><img
                                                        src="{{$course->course_image_preview}}" alt="openacademi"></a>
                                            <div class="overlay">
                                                <span class="vline"></span>
                                                <span class="vline vline-bottom"></span>
                                            </div>
                                        </div>
                                        <div class="course-content">
                                            <div class="text-wrap border-bt-e6f3ff">
                                                <p class="teacher"><a href="#">{{$course->instructor->full_name}}</a>
                                                </p>
                                                <h6 class="title"><a href="{{route('courses.show',['slug'=>$course->slug])}}">{{$course->title}}</a></h6>
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
                                                <span class="price v2">&#8358;{{ number_format($course->price) }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div> <!-- /.course -->
                            @endforeach
                        </div>
                    </div>
                </div>
            </div>
        </div> <!-- /.container -->
    </div> <!-- /.content-wrap -->

@endsection