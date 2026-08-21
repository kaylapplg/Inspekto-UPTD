<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    public function test_reset_password_link_screen_can_be_rendered(): void
    {
        $response = $this->get('/forgot-password');

        $response->assertStatus(200);
    }

    public function test_reset_password_link_can_be_requested(): void
    {
        Mail::fake();

        $user = User::factory()->create();

        $response = $this->post('/forgot-password', ['email' => $user->email]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('password.reset', ['email' => $user->email]));

        $this->assertDatabaseHas('password_reset_tokens', [
            'email' => $user->email,
        ]);
    }

    public function test_reset_password_screen_can_be_rendered(): void
    {
        $user = User::factory()->create();

        $response = $this->get(route('password.reset', ['email' => $user->email]));

        $response->assertStatus(200);
    }

    public function test_otp_can_be_verified_with_valid_token(): void
    {
        $user = User::factory()->create();
        $otp = '123456';

        DB::table('password_reset_tokens')->insert([
            'email' => $user->email,
            'token' => Hash::make($otp),
            'created_at' => now(),
        ]);

        $response = $this->post(route('password.otp.verify'), [
            'email' => $user->email,
            'otp' => $otp,
        ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('password.reset', ['email' => $user->email]));

        $this->assertSame($user->email, session('password_reset_verified_email'));
    }

    public function test_password_can_be_reset_after_otp_is_verified(): void
    {
        $user = User::factory()->create();
        $otp = '123456';

        DB::table('password_reset_tokens')->insert([
            'email' => $user->email,
            'token' => Hash::make($otp),
            'created_at' => now(),
        ]);

        $this->post(route('password.otp.verify'), [
            'email' => $user->email,
            'otp' => $otp,
        ]);

        $response = $this->post('/reset-password', [
            'email' => $user->email,
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect(route('login'));

        $this->assertTrue(Hash::check('password', $user->refresh()->password));
        $this->assertDatabaseMissing('password_reset_tokens', [
            'email' => $user->email,
        ]);
        $this->assertNull(session('password_reset_verified_email'));
    }

    public function test_password_cannot_be_reset_before_otp_is_verified(): void
    {
        $user = User::factory()->create();

        $response = $this->post('/reset-password', [
            'email' => $user->email,
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertSessionHasErrors('otp');
    }
}
