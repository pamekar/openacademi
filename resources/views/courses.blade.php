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
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Courses</a></li>
                </ul>
            </div>
            <img src="{{$public}}/png/bg-white.png" alt="bookflare" class="bg-breadcrumbs">
        </div>
    </section> <!-- /.flat-title-page -->
    <courses :colors="{{json_encode($colors)}}" category="{{$isCategory ? $isCategory->slug : ''}}"></courses>
@endsection