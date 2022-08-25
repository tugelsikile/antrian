<!DOCTYPE html>
<html dir="ltr">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <link rel="icon" type="image/png" sizes="16x16" href="{{asset('adminmart/assets/images/favicon.png')}}">
    <title>{{config('app.name')}}</title>

    <link href="{{asset('adminmart/dist/css/style.min.css')}}" rel="stylesheet">
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>

<body>
<div class="main-wrapper" id="login-page"></div>

<script src="{{asset('adminmart/assets/libs/jquery/dist/jquery.min.js')}} "></script>
<!-- Bootstrap tether Core JavaScript -->
<script src="{{asset('adminmart/assets/libs/popper.js/dist/umd/popper.min.js')}}"></script>
<script src="{{asset('adminmart/assets/libs/bootstrap/dist/js/bootstrap.min.js')}}"></script>
<script src="{{asset('js/react/auth/login.js')}}"></script>

<script>
    $(".preloader ").fadeOut();
</script>
</body>

</html>
