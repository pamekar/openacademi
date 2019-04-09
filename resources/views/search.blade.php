@extends('layouts.home')

@section('main')
    <search-courses searching="{{$search}}" :colors="{{json_encode($colors)}}"
                    :categories="{{json_encode($categories)}}"></search-courses>
@endsection