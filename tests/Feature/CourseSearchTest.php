<?php

namespace Tests\Feature;

use function JmesPath\search;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CourseSearchTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testCourseSearch()
    {
        $query="engineering";
        $response = $this->get("/api/home/courses/search?q=$query");

        $response->assertStatus(200);

    }


}
