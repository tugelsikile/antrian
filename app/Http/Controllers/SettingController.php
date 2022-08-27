<?php

namespace App\Http\Controllers;

use App\Repositories\SettingRepository;
use App\Validations\SettingValidation;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    protected $validation;
    protected $repository;
    public function __construct()
    {
        $this->repository = new SettingRepository();
        $this->validation = new SettingValidation();
    }
    public function settingPrinter(Request $request) {
        try {
            $code = 400; $message = 'Undefined method'; $params = null;
            switch (strtolower($request->method())){
                case 'post' :
                    $params = $this->repository->getSettingPrinter();
                    $code = 200; $message = 'ok'; break;
                case 'patch' :
                    $valid = $this->validation->saveSettingPrinter($request);
                    $params = $this->repository->saveSettingPrinter($valid);
                    $code = 200; $message = 'Setting berhasil disimpan'; break;
            }
            return responseFormat($code, $message, $params);
        } catch (\Exception $exception) {
            return responseFormat($exception->getCode(), $exception->getMessage());
        }
    }
    public function settingAplikasi(Request $request) {
        try {
            $code = 400; $message = 'Undefined method'; $params = null;
            switch (strtolower($request->method())){
                case 'post' :
                    $params = $this->repository->getSettingAplikasi();
                    $code = 200; $message = 'ok'; break;
                case 'patch' :
                    $valid = $this->validation->saveSettingAplikasi($request);
                    $params = $this->repository->saveSettingAplikasi($valid);
                    $code = 200; $message = 'Setting berhasil disimpan'; break;
            }
            return responseFormat($code, $message, $params);
        } catch (\Exception $exception) {
            return responseFormat($exception->getCode(), $exception->getMessage());
        }
    }
}
