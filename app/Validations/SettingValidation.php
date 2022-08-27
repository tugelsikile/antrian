<?php


namespace App\Validations;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SettingValidation
{
    public function saveSettingPrinter(Request $request) {
        try {
            $valid = Validator::make($request->all(),[
                'alamat_ip_komputer_printer' => 'required|string',
                'nama_share_printer' => 'nullable'
            ]);
            if ($valid->fails()) throw new \Exception(collect($valid->errors()->all())->join("\n"),400);
            return $request;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),400);
        }
    }
    public function saveSettingAplikasi(Request $request) {
        try {
            $valid = Validator::make($request->all(),[
                'nama_rumah_sakit' => 'required|string',
                'alamat' => 'nullable'
            ]);
            if ($valid->fails()) throw new \Exception(collect($valid->errors()->all())->join("\n"),400);
            return $request;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),400);
        }
    }
}
