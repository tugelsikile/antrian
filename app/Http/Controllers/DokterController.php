<?php

namespace App\Http\Controllers;

use App\Repositories\DokterRepository;
use App\Validations\DokterValidation;
use Illuminate\Http\Request;

class DokterController extends Controller
{
    protected $validation;
    protected $repository;
    public function __construct()
    {
        $this->repository = new DokterRepository();
        $this->validation = new DokterValidation();
    }
    public function crud(Request $request) {
        try {
            $code = 400; $message = 'Undefined method'; $params = null;
            switch (strtolower($request->method())){
                case 'post' :
                    $params = $this->repository->table($request);
                    return responseDataTable($params, $request->draw);
                case 'put' :
                    $valid = $this->validation->create($request);
                    $params = $this->repository->create($valid);
                    $code = 200; $message = 'Dokter berhasil dibuat';
                    break;
                case 'patch' :
                    $valid = $this->validation->update($request);
                    $params = $this->repository->update($valid);
                    $code = 200; $message = 'Dokter berhasil diubah';
                    break;
                case 'delete' :
                    $valid = $this->validation->delete($request);
                    $params = $this->repository->delete($valid);
                    $code = 200; $message = 'Dokter berhasil dihapus';
                    break;
            }
            return responseFormat($code, $message, $params);
        } catch (\Exception $exception) {
            return responseFormat($exception->getCode(), $exception->getMessage());
        }
    }
}
