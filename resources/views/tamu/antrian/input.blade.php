@extends('layouts.guest')

@section('title', 'Antrian ' . config('app.name'))

@section('contents')
    <div id="antrian-input"></div>
@endsection

@section('scripts')
    <script src="{{asset('js/react/antrian/input.js')}}"></script>
@endsection
