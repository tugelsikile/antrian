<?php

namespace App\Http\Controllers;

use App\Repositories\PoliRepository;
use App\Validations\PoliValidation;
use Illuminate\Http\Request;

class PoliController extends Controller
{
    protected $validation;
    protected $repository;
    public function __construct()
    {
        $this->validation = new PoliValidation();
        $this->repository = new PoliRepository();
    }
    public function tamuPoli(Request $request) {
        try {
            $params = $this->repository->tamuPoli();
            return responseFormat(200,'ok', $params);
        } catch (\Exception $exception) {
            return responseFormat($exception->getCode(), $exception->getMessage());
        }
    }
    public function crud(Request $request) {
        try {
            $code = 400; $message = 'Undefined method'; $params = null;
            switch (strtolower($request->method())){
                case 'post' :
                    $params = $this->repository->table($request);
                    return responseDataTable($params, $request->draw);
                    $code = 200; $message = 'ok'; break;
                case 'put' :
                    $valid = $this->validation->create($request);
                    $params = $this->repository->create($valid);
                    $code = 200; $message = 'Poli berhasil dibuat';
                    break;
                case 'patch' :
                    $valid = $this->validation->update($request);
                    $params = $this->repository->update($valid);
                    $code = 200; $message = 'Poli berhasil diubah';
                    break;
                case 'delete' :
                    $valid = $this->validation->delete($request);
                    $params = $this->repository->delete($valid);
                    $code = 200; $message = 'Poli berhasil dihapus';
                    break;
            }
            return responseFormat($code, $message, $params);
        } catch (\Exception $exception) {
            return responseFormat($exception->getCode(), $exception->getMessage());
        }
    }
}
