<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin Inspekto',
            'email' => 'admin@uptd.com',
            'password' => Hash::make('password123'), // Passwordnya: password123
        ]);
    }
}