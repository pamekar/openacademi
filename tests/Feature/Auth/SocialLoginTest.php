<?php

namespace Tests\Feature\Auth;

use Laravel\Socialite\Contracts\Factory;
use Tests\TestCase;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class SocialLoginTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testOauthRedirect()
    {
        $providers
            = ['facebook' => 'https://www.facebook.com/v3.0/dialog/oauth'];

        foreach ($providers as $provider => $redirect) {
            $response = $this->call("GET", "/login/redirect/$provider");

            $response->assertStatus(302); // redirected
            $this->assertContains($redirect,
                $response->headers->get('location'));
        }
    }

    public function testCallback(){

    }

}
