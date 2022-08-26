<?php


namespace App\Repositories;


use App\Models\Queue;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Mike42\Escpos\CapabilityProfile;
use Mike42\Escpos\EscposImage;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\PrintConnectors\WindowsPrintConnector;
use Ramsey\Uuid\Uuid;
use Mike42\Escpos\Printer;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class AntrianRepository
{
    protected $polyRepository;
    protected $doctorRepository;
    public function __construct()
    {
        $this->polyRepository = new PoliRepository();
        $this->doctorRepository = new DokterRepository();
    }

    public function currentAntrian(Request $request) {
        try {
            $response = '';
            $antrian = Queue::orderBy('call_at', 'desc')->whereNotNull('call_at')->where('poly', $request->poli)->whereDate('created_at', Carbon::now()->format('Y-m-d'))->first();
            if ($antrian != null) {
                $response = $antrian->polyObj->code . str_pad($antrian->poly_num,3,'0',STR_PAD_LEFT);
            }
            return $response;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
    private function sendToPrinter($queue){
        try {
            if (config('app.PRINTER_IP') == null || config('app.PRINTER_NAME') == null) {
                return false;
            } else {
                $printer_path = "smb://" . config('app.PRINTER_IP') . '/' . config('app.PRINTER_NAME');
                $profile = CapabilityProfile::load("simple");
                $connector = new WindowsPrintConnector($printer_path);
                $printer = new Printer($connector, $profile);
                $printer->setJustification(Printer::JUSTIFY_CENTER);
                $img = EscposImage::load(public_path() . '/adminmart/assets/images/logo-icon.png');
                $printer->graphics($img);
                $printer->text("\n ");
                $printer->setTextSize(1,1);
                $printer->text("\n" . config('app.name') . "\n");
                $printer->text("\n ");
                $printer->text("Nomor Antrian\n ");
                $printer->text("POLI " . $queue->meta->poli->label);
                $printer->text("\n ");
                $printer->setTextSize(3,6);
                $kodeantrian = $queue->meta->poli->meta->code . str_pad($queue->meta->numbers->poli,3,'0',STR_PAD_LEFT);
                $printer->text($kodeantrian . "\n ");
                $qrImagePath = $this->generateQrImage($kodeantrian);
                $qrImage = EscposImage::load($qrImagePath);
                $printer->graphics($qrImage);
                $printer->text("\n \n");
                $printer->setTextSize(1,1);
                $printer->text("Mohon tunggu nomor antrian untuk dipanggil");
                $printer->feed(3);
                $printer->cut();
                $printer->close();
                return true;
            }
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
    private function generateQrImage($kode) {
        try {
            $dir = public_path() . '/qr_code/' . Carbon::now()->format('Ymd') . '/' ;
            if (!file_exists($dir)) {
                File::makeDirectory($dir,0777,true);
            }
            $path = public_path() . '/qr_code/' . Carbon::now()->format('Ymd') . '/' . $kode . '.png';
            QrCode::format('png')->size(200)->errorCorrection('H')->generate($kode, $path);
            //Storage::disk('public')->put($path, $image);
            return $path;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
    public function submitAntrian(Request $request) {
        try {
            $now = Carbon::now();
            $antrian = new Queue();
            $antrian->id = Uuid::uuid4()->toString();
            $antrian->poly = $request->poli;
            $antrian->doctor = $request->dokter;
            $antrian->register_num = Queue::whereDate('created_at', $now->format('Y-m-d'))->count() + 1;
            $antrian->poly_num = Queue::whereDate('created_at', $now->format('Y-m-d'))->where('poly', $antrian->poly)->where('doctor', $antrian->doctor)->count() + 1;
            $antrian->saveOrFail();
            $response = $this->tableDashboard(new Request(['id' => $antrian->id]))->first();
            $this->sendToPrinter($response);
            return $response;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
    public function call(Request $request) {
        try {
            $queue = Queue::where('id', $request->nomor_antrian)->first();
            $queue->call_at = Carbon::now()->format('Y-m-d H:i:s');
            $queue->call_by = auth()->guard('api')->user()->id;
            $queue->saveOrFail();
            return $this->tableDashboard(new Request(['id' => $queue->id]))->first();
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
    public function tableDashboard(Request $request) {
        try {
            $response = collect();
            if (strlen($request->id) > 0) {
                $queues = Queue::where('id', $request->id)->get();
            } else {
                $queues = Queue::orderBy('poly_num', 'asc')
                    //->orderBy('call_at', 'desc')
                    ->where('poly', $request->poli)
                    ->whereDate('created_at', Carbon::now()->format('Y-m-d'))->get();
            }
            foreach ($queues as $queue) {
                $response->push((object)[
                    'value' => $queue->id,
                    'label' => $queue->poly_num,
                    'meta' => (object) [
                        'poli' => $this->polyRepository->table(new Request(['id' => $queue->poly]))->first(),
                        'doctor' => $this->doctorRepository->table(new Request(['id' => $queue->doctor]))->first(),
                        'numbers' => (object) [
                            'poli' => $queue->poly_num,
                            'register' => $queue->register_num
                        ],
                        'create' => Carbon::parse($queue->created_at)->format('Y-m-d H:i:s'),
                        'call' => $queue->call_at,
                    ]
                ]);
            }
            return $response;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
}
