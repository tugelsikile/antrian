<?php

namespace Database\Seeders;

use App\Models\Doctor;
use App\Models\Poly;
use App\Models\Queue;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Ramsey\Uuid\Uuid;

class fakerAntrian extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //$faker = Faker::create('id_ID');
        $tgl = Carbon::now();
        for ($i = 1; $i <= 50; $i++) {
            $antrian = new Queue();
            $antrian->id = Uuid::uuid4()->toString();
            $antrian->poly = Poly::inRandomOrder()->first()->id;
            $antrian->doctor = Doctor::inRandomOrder()->first()->id;
            $antrian->register_num = Queue::whereDate('created_at', $tgl->format('Y-m-d'))->count() + 1;
            $antrian->poly_num = Queue::whereDate('created_at', $tgl->format('Y-m-d'))->where('poly', $antrian->poly)->count() + 1;
            $antrian->saveOrFail();
        }
    }
}
