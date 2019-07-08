<?php

namespace App\Http\Controllers\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\File;
use Laravel\Socialite\Facades\Socialite;
use App\User;

class SocialController extends Controller
{
    protected $redirectTo='/user';
    public function redirect($provider)
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback($provider)
    {
        $getInfo = Socialite::driver($provider)->user();
        $user = $this->createUser($getInfo,$provider);
        Auth::login($user, true);

        return redirect()->to($this->redirectTo);
    }

    function createUser($getInfo, $provider)
    {
        $user = User::where('provider_id', $getInfo->id)->first();
        if (!$user) {
            $user = User::create([
                'name'          => $getInfo->name,
                'email'         => $getInfo->email,
                'provider_name' => $provider,
                'provider_id'   => $getInfo->id
            ]);
        }
        return $user;
    }
}