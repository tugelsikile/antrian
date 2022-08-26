@extends('layouts.guest')

@section('title', 'Antrian ' . config('app.name'))

@section('contents')
    <div id="antrian-screen"></div>
@endsection

@section('scripts')
    <style>
        html, body {
            background: #000;
        }
    </style>
    <script src="{{asset('js/react/antrian/screen.js')}}"></script>
@endsection
