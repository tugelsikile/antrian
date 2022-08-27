<?php


namespace App\Repositories;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class SettingRepository
{
    public function saveSettingPrinter(Request $request) {
        try {
            $envPath = base_path(".env");
            if (file_exists($envPath)) {
                file_put_contents($envPath,
                    str_replace('MIX_PRINTER_IP=' . config('app.PRINTER_IP'),
                        'MIX_PRINTER_IP=' . $request->alamat_ip_komputer_printer,
                        file_get_contents($envPath))
                );
                file_put_contents($envPath,
                    str_replace('MIX_PRINTER_NAME='.config('app.PRINTER_NAME'),
                        'MIX_PRINTER_NAME='.$request->nama_share_printer,
                        file_get_contents($envPath))
                );
            }
            //putenv('APP_NAME="' . $request->nama_rumah_sakit .'"');
            //putenv('APP_ALAMAT="'.$request->alamat.'"');
            Artisan::call("config:cache");
            return $this->getSettingPrinter();
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
    public function getSettingPrinter() {
        try {
            $response = new \StdClass();
            $response->ip = config('app.PRINTER_IP');
            $response->nama = config('app.PRINTER_NAME');
            return $response;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(), 500);
        }
    }
    public function saveSettingAplikasi(Request $request) {
        try {
            $envPath = base_path(".env");
            if (file_exists($envPath)) {
                file_put_contents($envPath,
                    str_replace('APP_NAME="' . config('app.name') . '"',
                        'APP_NAME="' . $request->nama_rumah_sakit . '"',
                        file_get_contents($envPath))
                );
                file_put_contents($envPath,
                    str_replace('APP_ALAMAT="'.config('app.alamat').'"',
                    'APP_ALAMAT="'.$request->alamat.'"',
                    file_get_contents($envPath))
                );
            }
            //putenv('APP_NAME="' . $request->nama_rumah_sakit .'"');
            //putenv('APP_ALAMAT="'.$request->alamat.'"');
            Artisan::call("config:cache");
            return $this->getSettingAplikasi();
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
    public function getSettingAplikasi() {
        try {
            $response = new \StdClass();
            $response->nama = config('app.name');
            $response->alamat = config('app.alamat');
            return $response;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(), 500);
        }
    }
}
