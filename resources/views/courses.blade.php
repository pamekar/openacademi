@extends('layouts.home')

@section('main')

    <section class="flat-title-page parallax parallax8 style4">
        <div class="overlay style2"></div>
        <div class="container wrap-title-page bg-img ">
            <div class="title-page">
                <h2 class="title font-weight-700"><a href="#">{{$isCategory ? $isCategory->title : 'Courses'}}</a></h2>
                <p class="text">All our courses are self-paced and have been designed by subject matter experts, to give
                    you an interactive and enriched learning experience.</p>
            </div>
            <div class="breadcrumbs ">
                <ul>
                    <li><a href="{{url('')}}">Home</a></li>
                    <li><a href="{{route('courses.all')}}">Courses</a></li>
                    @if($isCategory)
                        <li><a href="{{route('courses.all',['category'=>$isCategory->slug])}}">{{$isCategory->title}}</a></li>
                    @endif
                </ul>
            </div>
        </div>
    </section> <!-- /.flat-title-page -->
    <courses :colors="{{json_encode($colors)}}" category="{{$isCategory ? $isCategory->slug : ''}}"></courses>
@endsection