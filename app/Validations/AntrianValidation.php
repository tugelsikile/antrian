<?php


namespace App\Validations;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AntrianValidation
{
    public function call(Request $request) {
        try {
            $valid = Validator::make($request->all(),[
                'nomor_antrian' => 'required|string|min:20|exists:queues,id',
            ]);
            if ($valid->fails()) throw new \Exception(collect($valid->errors()->all())->join("\n"),400);
            return $request;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),400);
        }
    }
}
