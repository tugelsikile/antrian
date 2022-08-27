const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix .js('resources/js/src/index.js', 'public/js/react')
    .js('resources/js/src/auth/login.js', 'public/js/react/auth')
    .js('resources/js/src/poli.js', 'public/js/react')
    .js('resources/js/src/dokter.js', 'public/js/react')
    .js('resources/js/src/antrian.js', 'public/js/react')
    .js('resources/js/src/antrian/screen.js', 'public/js/react/antrian')
    .js('resources/js/src/antrian/input.js', 'public/js/react/antrian')
    .js('resources/js/src/setting/aplikasi.js', 'public/js/react/setting')
    .js('resources/js/src/setting/printer.js', 'public/js/react/setting')
    .js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        //
    ]);
