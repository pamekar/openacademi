<?php

namespace Tests\Integration;

use Tests\TestCase;
use Bugsnag\BugsnagLaravel\Facades\Bugsnag;
use RuntimeException;

class BugsnagTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test()
    {
        $exception = new RuntimeException("TestError", 1);
        try{
            throw $exception;
        }
        catch (\Exception $e){
            $this->assertEquals('TestError',$e->getMessage());
            Bugsnag::notifyException($exception);
        }
    }
}
