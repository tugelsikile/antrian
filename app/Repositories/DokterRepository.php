<?php


namespace App\Repositories;


use App\Models\Doctor;
use App\Models\Queue;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;

class DokterRepository
{
    protected $poliRepository;
    public function __construct()
    {
        $this->poliRepository = new PoliRepository();
    }
    public function delete(Request $request) {
        try {
            Doctor::where('id', $request->id)->delete();
            Queue::where('doctor', $request->id)->delete();
            return true;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
    public function update(Request $request) {
        try {
            $doctor = Doctor::where('id', $request->id)->first();
            $doctor->name = $request->nama_dokter;
            $doctor->poly = $request->poli;
            $doctor->description = $request->alamat;
            $doctor->updated_by = auth()->guard('api')->user()->id;
            $doctor->saveOrFail();
            return $this->table(new Request(['id' => $doctor->id]))->first();
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
    public function create(Request $request) {
        try {
            $doctor = new Doctor();
            $doctor->id = Uuid::uuid4()->toString();
            $doctor->name = $request->nama_dokter;
            $doctor->poly = $request->poli;
            $doctor->description = $request->alamat;
            $doctor->created_by = auth()->guard('api')->user()->id;
            $doctor->saveOrFail();
            return $this->table(new Request(['id' => $doctor->id]))->first();
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
    public function table(Request $request) {
        try {
            $keyword = isset ($request->search['value']) ? $request->search['value'] : '';
            $sortBy = 'name'; $sortDir = 'asc';
            if (isset($request->order)) {
                $sortBy = (int) $request->order[0]['column'];
                $sortBy = $request->columns[$sortBy]['name'];
                $sortDir = $request->order[0]['dir'];
            }

            $response = collect();

            $dokters = Doctor::orderBy($sortBy, $sortDir);
            if (strlen($request->poly) > 0) $dokters = $dokters->where('poly', $request->poly);
            if (strlen($request->id) > 0) $dokters = $dokters->where('id', $request->id);
            if (strlen($keyword) > 0) {
                $dokters = $dokters->where(function ($q) use ($keyword){
                    if (config('database.default') == 'mysql') {
                        $modifier = 'like';
                    } else {
                        $modifier = 'ilike';
                    }
                    $q->where('name', $modifier, "%$keyword%")
                        ->orWhere('description', $modifier, "%$keyword%")
                        ->orWhere('poly', $modifier, "%$keyword%");
                });
            }

            $dokters = $dokters->get();
            foreach ($dokters as $dokter) {
                $response->push((object)[
                    'value' => $dokter->id,
                    'label' => $dokter->name,
                    'meta' => (object) [
                        'poli' => $this->poliRepository->table(new Request(['id' => $dokter->poly]))->first(),
                        'description' => $dokter->description,
                    ]
                ]);
            }
            return $response;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
}
