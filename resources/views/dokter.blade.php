@extends('layouts.app')

@section('title', config('app.name') . ' : DOKTER')

@section('contents')
    <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
         data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
    </div>
@endsection

@section('scripts')
    <script src="{{asset('js/react/dokter.js')}}"></script>
@endsection
