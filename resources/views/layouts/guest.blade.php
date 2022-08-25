<!DOCTYPE html>
<html dir="ltr" lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" type="image/png" sizes="16x16" href={{asset('adminmart/assets/images/favicon.png')}}>
    <title>@yield('title')</title>

    <link href="{{asset('adminmart/assets/extra-libs/c3/c3.min.css')}}" rel="stylesheet">

    <link href="{{asset('adminmart/dist/css/style.min.css')}}" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>

@yield('contents')

<script src="{{asset('adminmart/assets/libs/jquery/dist/jquery.min.js')}}"></script>
<script src="{{asset('adminmart/assets/libs/popper.js/dist/umd/popper.min.js')}}"></script>
<script src="{{asset('adminmart/assets/libs/bootstrap/dist/js/bootstrap.min.js')}}"></script>
<!-- apps -->
<!-- apps -->
<script src="{{asset('adminmart/dist/js/app-style-switcher.js')}}"></script>
<script src="{{asset('adminmart/dist/js/feather.min.js')}}"></script>
<script src="{{asset('adminmart/assets/libs/perfect-scrollbar/dist/perfect-scrollbar.jquery.min.js')}}"></script>
<script src="{{asset('adminmart/dist/js/sidebarmenu.js')}}"></script>
<!--Custom JavaScript -->
<script src="{{asset('adminmart/dist/js/custom.min.js')}}"></script>
<!--This page JavaScript -->
<script src="{{asset('adminmart/assets/extra-libs/c3/d3.min.js')}}"></script>
{{--<script src="{{asset('adminmart/assets/extra-libs/c3/c3.min.js')}}"></script>--}}
<script src="{{asset('adminmart/assets/libs/chartist/dist/chartist.min.js')}}"></script>
<script src="{{asset('adminmart/assets/libs/chartist-plugin-tooltips/dist/chartist-plugin-tooltip.min.js')}}"></script>
<script src="{{asset('adminmart/assets/extra-libs/jvector/jquery-jvectormap-2.0.2.min.js')}}"></script>
<script src="{{asset('adminmart/assets/extra-libs/jvector/jquery-jvectormap-world-mill-en.js')}}"></script>
{{--<script src="{{asset('adminmart/dist/js/pages/dashboards/dashboard1.min.js')}}"></script>--}}

@yield('scripts')

</body>

</html>
