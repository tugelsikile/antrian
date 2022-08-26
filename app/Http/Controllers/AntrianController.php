<?php

namespace App\Http\Controllers;

use App\Repositories\AntrianRepository;
use App\Validations\AntrianValidation;
use Illuminate\Http\Request;

class AntrianController extends Controller
{
    protected $repository;
    protected $validation;
    public function __construct()
    {
        $this->repository = new AntrianRepository();
        $this->validation = new AntrianValidation();
    }
    public function currentAntrian(Request $request) {
        try {
            $valid = $this->validation->currentAntrian($request);
            $params = $this->repository->currentAntrian($valid);
            return responseFormat(200,'ok', $params);
        } catch (\Exception $exception) {
            return responseFormat($exception->getCode(), $exception->getMessage());
        }
    }
    public function submitAntrian(Request $request) {
        try {
            $valid = $this->validation->submitAntrian($request);
            $params = $this->repository->submitAntrian($valid);
            return responseFormat(200,'ok', $params);
        } catch (\Exception $exception) {
            return responseFormat($exception->getCode(), $exception->getMessage());
        }
    }
    public function call(Request $request) {
        try {
            $valid = $this->validation->call($request);
            $params = $this->repository->call($valid);
            return responseFormat(200,'Antrian berhasil dipanggil', $params);
        } catch (\Exception $exception) {
            return responseFormat($exception->getCode(), $exception->getMessage());
        }
    }
    public function crud(Request $request) {
        try {
            $code = 400; $message = 'Undefined method'; $params = null;
            switch (strtolower($request->method())){
                case 'post' :
                    $params = $this->repository->tableDashboard($request);
                    $code = 200; $message = 'ok';
                    break;
            }
            return responseFormat($code, $message, $params);
        } catch (\Exception $exception) {
            return responseFormat($exception->getCode(), $exception->getMessage());
        }
    }
}
