<?php

namespace App\Http\Controllers;

use App\Repositories\AuthRepository;
use App\Validations\AuthValidation;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $validation;
    protected $repository;
    public function __construct()
    {
        $this->validation = new AuthValidation();
        $this->repository = new AuthRepository();
    }
    public function login(Request $request) {
        try {
            $valid = $this->validation->login($request);
            $params = $this->repository->login($valid);
            return responseFormat(200,'Login berhasil', $params);
        } catch (\Exception $exception) {
            return responseFormat($exception->getCode(), $exception->getMessage());
        }
    }
    public function me() {
        try {
            return responseFormat(200,'ok', $this->repository->me());
        } catch (\Exception $exception) {
            return responseFormat($exception->getCode(), $exception->getMessage());
        }
    }
}
