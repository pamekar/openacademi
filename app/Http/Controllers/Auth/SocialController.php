<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialController extends Controller
{
    protected $redirectTo = '/user';

    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        $getInfo = Socialite::driver($provider)->user();
        $user = $this->createUser($getInfo, $provider);

        // Login user to application
        Auth::login($user, true);

        // Login user to frontend
        $frontend = new APIController();
        $frontend->socialLogin($user);

        // Redirect user
        return redirect()->to($this->redirectTo);
    }

    function createUser($getInfo, $provider)
    {
        $user = User::where('provider_id', $getInfo->id)->first();
        if (!$user) {
            $user = User::create([
                'name'          => $getInfo->getName(),
                'email'         => $getInfo->getEmail(),
                'provider_name' => $provider,
                'provider_id'   => $getInfo->getId(),
                'avatar'        => $getInfo->getAvatar()
            ]);
        }
        return $user;
    }
}