<?php

namespace Tests\Feature\Auth;

use Tests\TestCase;

class SocialLoginTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testOauthRedirect()
    {
        $providers = [
            'facebook' => 'facebook.com/',
            'google'   => 'google.com/',
            'linkedin' => 'linkedin.com'
        ];

        foreach ($providers as $provider => $redirect) {
            $response = $this->call("GET", "/login/redirect/$provider");

            $response->assertStatus(302); // redirected
            $this->assertContains($redirect,
                $response->headers->get('location'));
        }
    }

    public function testCallback()
    {

    }

}
