<?php


namespace App\Repositories;


use App\Models\Doctor;
use App\Models\Poly;
use App\Models\Queue;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Ramsey\Uuid\Uuid;

class PoliRepository
{
    private function doctorPoly(Request $request){
        try {
            $response = collect();
            $doctors =  Doctor::where('poly', $request->poly)->get();
            foreach ($doctors as $doctor) {
                $response->push((object)[
                    'value' => $doctor->id,
                    'label' => $doctor->name
                ]);
            }
            return $response;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
    public function tamuPoli() {
        try {
            $response = collect();
            $polies = Poly::orderBy('code', 'asc')->get();
            foreach ($polies as $poly) {
                $response->push((object)[
                    'value' => $poly->id,
                    'label' => $poly->name,
                    'meta' => (object) [
                        'code' => $poly->code,
                        'icon' => $poly->icon,
                        'doctors' => $this->doctorPoly(new Request(['poly' => $poly->id])),
                    ]
                ]);
            }
            return $response;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
    public function delete(Request $request) {
        try {
            Poly::where('id', $request->id)->delete();
            Schedule::where('poly', $request->id)->delete();
            Doctor::where('poly', $request->id)->delete();
            Queue::where('poly', $request->id)->delete();
            return true;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
    public function update(Request $request) {
        try {
            $poli = Poly::where('id', $request->id)->first();
            $poli->name = $request->nama_poli;
            $poli->code = $request->kode_poli;
            $poli->description = $request->keterangan_poli;
            $poli->updated_by = auth()->guard('api')->user()->id;
            $poli->saveOrFail();
            return $this->table(new Request(['id' => $poli->id]))->first();
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
    public function create(Request $request) {
        try {
            $poli = new Poly();
            $poli->id = Uuid::uuid4()->toString();
            $poli->name = $request->nama_poli;
            $poli->code = $request->kode_poli;
            $poli->description = $request->keterangan_poli;
            $poli->created_by = auth()->guard('api')->user()->id;
            $poli->saveOrFail();
            return $this->table(new Request(['id' => $poli->id]))->first();
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

            $polies = Poly::orderBy($sortBy, $sortDir);
            if (strlen($keyword) > 0) {
                $polies = $polies->where(function ($q) use ($keyword){
                    if (config('database.default') == 'mysql') {
                        $modifier = 'like';
                    } else {
                        $modifier = 'ilike';
                    }
                    $q->where('name', $modifier, "%$keyword%")
                        ->orWhere('description', $modifier, "%$keyword%")
                        ->orWhere('code', $modifier, "%$keyword%");
                });
            }
            if (strlen($request->id) > 0) $polies = $polies->where('id', $request->id);
            $polies = $polies->get();
            foreach ($polies as $poly) {
                $response->push((object)[
                    'value' => $poly->id,
                    'label' => $poly->name,
                    'meta' => (object) [
                        'code' => $poly->code,
                        'description' => $poly->description === null ? '' : $poly->description,
                        'icon' => $poly->icon
                    ]
                ]);
            }
            return $response;
        } catch (\Exception $exception) {
            throw new \Exception($exception->getMessage(),500);
        }
    }
}
