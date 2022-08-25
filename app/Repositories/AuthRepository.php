<?php


namespace App\Repositories;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthRepository
{
    public function me(){
        try {
            $user = auth()->guard('api')->user();
            return (object)[
                'value' => $user->id,
                'label' => $user->name,
                'meta' => (object) [
                    'type' => $user->type,
                    'email' => $user->email
                ]
            ];
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
    public function login(Request $request) {
        try {
            $user = User::where('email', $request->nama_pengguna)->first();
            if (!Hash::check($request->kata_sandi, $user->password)) throw new \Exception('Kombinasi nama pengguna dan kata sandi tidak valid',400);
            auth()->login($user);
            return auth()->user()->createToken('login')->accessToken;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
}
