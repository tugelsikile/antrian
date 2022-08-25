<?php


namespace App\Repositories;


use App\Models\Queue;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AntrianRepository
{
    protected $polyRepository;
    protected $doctorRepository;
    public function __construct()
    {
        $this->polyRepository = new PoliRepository();
        $this->doctorRepository = new DokterRepository();
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
