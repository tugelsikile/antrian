<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $datas = collect();
        $datas->push((object)[
            'email' => 'admin@antri.com',
            'password' => 'admin@antri.com',
            'name' => 'Administrator',
            'type' => 'admin'
        ]);
        $this->command->getOutput()->progressStart($datas->count());
        foreach ($datas as $data) {
            if (User::where('email', $data->email)->get('id')->count() == 0) {
                $user = new User();
                $user->id = Uuid::uuid4()->toString();
                $user->name = $data->name;
                $user->email = $data->email;
                $user->password = Hash::make($data->password);
                $user->type = $data->type;
                $user->saveOrFail();
            }
            $this->command->getOutput()->progressAdvance();
        }
        $this->command->getOutput()->progressFinish();
    }
}
