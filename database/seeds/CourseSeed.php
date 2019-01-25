<?php

use Illuminate\Database\Seeder;
use App\Course;
use App\Lesson;
use App\Test;
use Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\Hash;

class CourseSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create();

        $userSelection = [
            ["female", "avatar1.jpg"],
            ["female", "avatar2.jpg"],
            ["female", "avatar3.jpg"],
            ["female", "avatar4.jpg"],
            ["female", "avatar5.jpg"],
            ["female", "avatar6.jpg"],
            ["female", "avatar7.jpg"],
            ["female", "avatar8.jpg"],
            ["male", "avatar9.jpg"],
            ["male", "avatar10.jpg"],
            ["male", "avatar11.jpg"],
            ["male", "avatar12.jpg"],
            ["male", "avatar13.jpg"],
            ["male", "avatar14.jpg"],
            ["male", "avatar15.jpg"],
            ["male", "avatar16.jpg"]
        ];

        $courseImages = [
            "course1.jpg",
            "course2.jpg",
            "course3.jpg",
            "course4.jpg",
            "course5.jpg",
            "course6.jpg",
            "course7.jpg",
            "course8.jpg",
            "course9.jpg",
            "course10.jpg",
            "course11.jpg",
            "course12.jpg",
            "course13.jpg",
            "course14.jpg",
            "course15.jpg"
        ];
        $lessonImages = [
            "single-course.jpg",
            "single-post.jpg"
        ];
        $lessonVideos = [
            "https://player.vimeo.com/video/312593611",
            "https://player.vimeo.com/video/312583178",
            "https://player.vimeo.com/video/78969465",
            "https://player.vimeo.com/video/78969465",
            "https://player.vimeo.com/video/78969465",
            "https://player.vimeo.com/video/18442704?color=ff0000&portrait=0",
            "https://player.vimeo.com/video/26079113",
            "https://player.vimeo.com/video/31476981",
            "https://player.vimeo.com/video/132703683",
            "https://player.vimeo.com/video/97745587",
            "https://player.vimeo.com/video/112587083?color=ccb668&title=0&byline=0&portrait=0"
        ];

        $testImages = [
            "post1.jpg",
            "post2.jpg",
            "post3.jpg",
            "post4.jpg",
            "post5.jpg",
            "post6.jpg",
            "simple-gallery1.jpg",
            "simple-gallery2.jpg",
            "simple-gallery3.jpg",
            "simple-gallery4.jpg",
            "simple-gallery5.jpg",
            "simple-gallery6.jpg",
            "simple-gallery7.jpg",
            "simple-gallery8.jpg"
        ];
        $categories = [
            [
                "Engineering",
                "engineering",
                "fa fa-desktop",
                "courses" => [
                    "Civil engineering",
                    "Biomedical engineering",
                    "Electronic engineering",
                    "Aeronautical engineering",
                    "Mechanical engineering",
                    "Mining engineering",
                    "Chemical engineering"
                ],
                'tags'    => [
                    "mechanical-engineering",
                    "electrical-engineering",
                    "structural-engineering",
                    "fluid-mechanics",
                    "materials",
                    "civil-engineering",
                    "thermodynamics",
                    "control-engineering",
                    "design",
                    "motors"
                ]
            ],
            [
                "Computer Science",
                'computer-science',
                "fa fa-desktop",
                "courses" => [
                    "Computer Engineering",
                    "Computer Forensics",
                    "Computer Networking",
                    "Computer Programming",
                    "Cyber Security",
                    "Database Administration",
                    "Information Security",
                    "Information Technology"
                ],
                "tags"    => [

                    "algorithms",
                    "complexity-theory",
                    "graphs",
                    "formal-languages",
                    "graph-theory",
                    "algorithm-analysis",
                    "turing-machines",
                    "computability",
                    "data-structures",
                    "time-complexity"
                ]
            ],
            [
                "Design",
                "design",
                "fa fa-paint-brush",
                "courses" => [
                    "Multimedia Design",
                    "Web Design",
                    "Logo Design",
                    "Brand Identity Design",
                    "Flash Design",
                    "Creative/Art Director",
                    "Photo Editing/Photoshop Design",
                    "Layout Design"
                ],
                "tags"    => [
                    "adobe-photoshop",
                    "adobe-illustrator",
                    "adobe-indesign",
                    "colorprint-design",
                    "website-design",
                    "fonts",
                    "vector",
                    "inkscape",
                    "gimp"
                ]
            ],
            [
                "Law",
                "law",
                'fa fa-gavel',
                "courses" => [
                    "Abuse and Family Violence",
                    "Consumer Law",
                    "Criminal Law",
                    "Education Law",
                    "Employment and Work",
                    "Environmental Law",
                    "Family Law",
                    "Health and Disability"
                ],
                "tags"    => [
                    "united-states",
                    "copyright",
                    "criminal-law",
                    "united-kingdom",
                    "contract-law",
                    "contract",
                    "intellectual-property",
                    "internet",
                    "software",
                    "employment"
                ]
            ],
            [
                "Business",
                "business",
                "fa fa-briefcase",
                "courses" => [
                    "Accounting Education",
                    "Accounting Ethics",
                    "Action Research",
                    "African American Entrepreneurship",
                    "Antitrust and the Economy",
                    "Auditing",
                    "Business Ethics",
                    "Business Interviewing",
                    "Business Monopolies",
                    "Business Oligopolies",
                    "Business Writing",
                    "Entrepreneurship",
                    "Family-Owned Businesses",
                    "Finance",
                    "History of Accounting",
                    "Innovation",
                    "Internet Commerce",
                    "Management Accounting",
                    "Professional Liability",
                    "Supply Chain Management"
                ],
                "tags"    => [
                    "professionalism",
                    "interviewing",
                    "software-industry",
                    "communication",
                    "management",
                    "resume",
                    "job-search",
                    "salary",
                    "work-environment",
                    "job-offer"
                ]
            ],
            [
                "Health",
                "hospitality-leisure",
                "fa fa-medkit",
                "courses" => [
                    "Nursing and Paramedicine",
                    "Nursing",
                    "Occupational Therapy, Social Work",
                    "Speech Pathology",
                    "Occupational Therapy",
                    "Pharmacy and Biomedical Sciences",
                    "Human Biology Preclinical",
                    "Physiotherapy and Exercise Science. Physiotherapy",
                    "Psychology",
                    "Public Health",
                    "Health Sciences"
                ],
                "tags"    => [
                    "nutrition",
                    "medications",
                    "diet",
                    "dermatology",
                    "sleep",
                    "dentistry",
                    "mental-health",
                    "side-effects",
                    "cancer",
                    "eye"
                ]
            ],
            [
                "History",
                "arts_humanities",
                "fa fa-meh",
                "courses" => [
                    "Sports Coaching ",
                    "Sociology",
                    "Social Work",
                    "Psychology",
                    "Political Science",
                    "Philosophy",
                    "History",
                    "Archaeology"
                ],
                "tags"    => [
                    "drawing",
                    "adhesives",
                    "material-selection",
                    "paper",
                    "sewing",
                    "painting",
                    "tool-selection",
                    "paint",
                    "wood",
                    "plastic",
                    "world-war-two",
                    "military",
                    "middle-ages",
                    "ancient-history",
                    "20th-century",
                    "europe",
                    "ancient-rome",
                    "nazi-germany",
                    "war"
                ]
            ]

        ];

        foreach (range(1, 2132) as $index) {
            $userType = $faker->randomElement($userSelection);
            $userName = $faker->userName;
            $student = DB::table('users')->insertGetId([
                'name'           => $userName,
                'role_id'        => 3,
                'email'          => $faker->unique()->safeEmail,
                'password'       => Hash::make('tarzan'),
                'type'           => 'student',
                'categories'     => md5($faker->randomElement($categories)[1])
                    . ";" . md5($faker->randomElement($categories)[1]),
                'remember_token' => str_random(10),
                'photo'          => $userType[1]
            ]);
            DB::table('students')->insert([
                'user_id'     => $student,
                'first_name'  => $faker->firstName($userType[0]),
                'last_name'   => $faker->lastName,
                'location'    => $faker->city,
                'description' => $faker->realText(160),
                'instagram'   => $userName,
                'twitter'     => $userName,
                'facebook'    => $userName,
                'linkedin'    => $userName,
            ]);
        }
        $catCount=count($categories);
        for ($i = 0; $i < $catCount*2; $i++) {
            $userType = $faker->randomElement($userSelection);
            $userName = $faker->userName;
            $instructor = DB::table('users')->insertGetId([
                'role_id'        => 2,
                'name'           => $userName,
                'email'          => $faker->unique()->safeEmail,
                'password'       => Hash::make('tarzan'),
                'type'           => 'teacher',
                'categories'     => md5($categories[$i%$catCount][1]),
                'remember_token' => str_random(10),
                'photo'          => $userType[1]
            ]);
            DB::table('instructors')->insert([
                'user_id'     => $instructor,
                'first_name'  => $faker->firstName($userType[0]),
                'last_name'   => $faker->lastName,
                'location'    => $faker->city,
                'description' => $faker->realText(160),
                'instagram'   => $userName,
                'twitter'     => $userName,
                'facebook'    => $userName,
                'linkedin'    => $userName,
            ]);

        }
        $truthify = [
            0,
            0,
            0,
            0,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            0,
            1,
            1,
            1,
            0,
            0,
            0,
            0,
            0,
            1,
            1,
            1,
            1,
            1,
            1
        ];
        $falsify = [
            1,
            1,
            1,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            1,
            1,
            1,
            1,
            1,
            0,
            0,
            0,
            0,
            0,
            0
        ];

        $paystack = new \App\Http\Controllers\PaystackController();
        foreach ($categories as $category) {
            $newCategory = DB::table('course_categories')->insertGetId([
                'title'       => $category[0],
                'category_id' => md5($category[1]),
                'slug'        => $category[1],
                'icon'        => $category[2]
            ]);

            foreach ($category['courses'] as $course) {
                $price = (mt_rand(100, 1000) / 100) * 100000;
                $tags = $category['tags'];
                $tagCount = (int)count($tags) / 3;
                $randomTags = $faker->randomElements($tags, $tagCount);
                $students = \App\User::where('categories', 'like',
                    '%' . md5($category[1]) . '%')->where('type', 'student')
                    ->inRandomOrder()
                    ->limit(mt_rand(20, 300))->pluck('id');
                $teacher = \App\User::where('categories', 'like',
                    '%' . md5($category[1]) . '%')->where('type', 'teacher')
                    ->inRandomOrder()->value('id');
                $price = (mt_rand(100, 1000) / 100) * 100000;
                $charge = $paystack->calcTransactionCharge($price / 100) * 100;
                $image = $faker->randomElement([0, 1]) ? [
                    'image',
                    "public/uploads/" . $faker->randomElement($lessonImages)
                ]
                    : ['video', $faker->randomElement($lessonVideos)];
                $newCourse = DB::table('courses')->insertGetId([
                    'title'             => $course,
                    'user_id'           => $teacher,
                    'slug'              => strtolower(preg_replace('/\s+/', '-',
                        $course)),
                    'category'          => $newCategory,
                    'tags'              => implode(';', $randomTags),
                    'summary'           => $faker->realText(60),
                    'description'       => $faker->paragraphs(5, true),
                    'price'             => $price,
                    'course_image'      => "public/uploads/"
                        . $faker->randomElement($courseImages),
                    'course_image_main' => $image[1],
                    'course_image_type' => $image[0],
                    'published'         => $faker->randomElement($truthify),
                    'start_date'        => $faker->dateTimeBetween('-1 years',
                        'now'),
                    'created_at'        => $faker->dateTimeBetween('-1 years',
                        'now')
                ]);

                // drg >> attach teacher to course
                DB::table('course_user')->insert([
                    'course_id' => $newCourse,
                    'user_id'   => $teacher
                ]);

                // drg >> attach students to course 
                foreach ($students as $student) {
                    $rating = mt_rand(3, 5);
                    switch ($newCourse % 7) {
                        case 1:
                            $rating = mt_rand(3, 5);
                            break;
                        case 2:
                            $rating = mt_rand(2, 3);
                            break;
                        case 3:
                            $rating = mt_rand(4, 5);
                            break;
                        case 4:
                            $rating = mt_rand(1, 3);
                            break;
                        case 5:
                            $rating = mt_rand(2, 5);
                            break;
                        case 6:
                            $rating = mt_rand(2, 4);
                            break;
                        default:
                            $rating = mt_rand(3, 4);
                            break;
                    }
                    DB::table('course_student')->insert([
                        'course_id' => $newCourse,
                        'user_id'   => $student,
                        'rating'    => $rating
                    ]);

                    // drg >> Add Payment for course
                    DB::table('payments')->insert([
                        'user_id'    => $student,
                        'course_id'  => $newCourse,
                        'amount'     => $price,
                        'charge'     => $charge,
                        'reference'  => md5("$student  _  $newCourse _ $price"),
                        'status'     => 'successful',
                        'created_at' => $faker->dateTimeBetween('-5 months',
                            '10 days')
                    ]);
                }

                // drg >> attach lessons to course
                $lessonCount = mt_rand(10, 20);
                for ($i = 0; $i < $lessonCount; $i++) {
                    $title = $faker->words(3, true);
                    $freeLesson = $i <= 1 ? true
                        : $faker->randomElement($falsify);
                    $publishedLesson = $i <= 1 ? true
                        : $faker->randomElement($truthify);
                    $image = $faker->randomElement([0, 1]) ? [
                        'image',
                        "public/uploads/" . $faker->randomElement($lessonImages)
                    ]
                        : ['video', $faker->randomElement($lessonVideos)];
                    $newLesson = DB::table('lessons')->insertGetId([
                        'user_id'           => $teacher,
                        'course_id'         => $newCourse,
                        'title'             => $title,
                        'slug'              => strtolower(preg_replace('/\s+/',
                            '-',
                            $title)),
                        'lesson_image'      => $image[1],
                        'lesson_image_type' => $image[0],
                        'short_text'        => $faker->realText(60),
                        'full_text'         => $faker->paragraphs(7, true),
                        'duration'          => mt_rand(2, 20) * 60 + mt_rand(0,
                                59),
                        'position'          => $i,
                        'free_lesson'       => $freeLesson,
                        'published'         => $publishedLesson,
                        'created_at'        => $faker->dateTimeBetween('-1 years',
                            'now')
                    ]);

                    // drg >> attach students to lesson
                    $studentCount = (int)count($students) / ($i + 1);
                    $lessonStudents = $faker->randomElements($students,
                        $studentCount);
                    foreach ($lessonStudents as $student) {
                        DB::table('lesson_student')->insert([
                            'lesson_id' => $newLesson,
                            'user_id'   => $student,
                        ]);
                    }

                    if ($i / 2 === 1) {
                        $test = DB::table('tests')
                            ->insertGetId([
                                'course_id'   => $newCourse,
                                'lesson_id'   => $newLesson,
                                'title'       => $faker->words(3,
                                    true),
                                'description' => $faker->realText(),
                                'published'   => 1
                            ]);
                        $questionCount = mt_rand(4, 15);
                        $totalScore = 0;
                        for ($j = 0; $j < $questionCount; $j++) {
                            $score = $faker->randomElement([
                                1,
                                2,
                                5
                            ]);
                            $question = DB::table('questions')->insertGetId([
                                'user_id'        => $teacher,
                                'question'       => $faker->realText(),
                                'question_image' => "public/uploads/"
                                    . $faker->randomElement($testImages),
                                'score'          => $score,
                            ]);
                            DB::table('question_test')->insert([
                                'question_id' => $question,
                                'test_id'     => $test
                            ]);
                            $correctOption = mt_rand(1, 5);
                            for ($k = 1; $k <= 5; $k++) {
                                DB::table('questions_options')->insert([
                                    'question_id' => $question,
                                    'option_text' => $faker->realText(50),
                                    'correct'     => $k === $correctOption
                                ]);

                            }
                            $totalScore += $score;
                        }

                        foreach ($lessonStudents as $student) {
                            $testScore = (mt_rand(40, 100) / 100)
                                * $totalScore;
                            $test_result = DB::table('tests_results')->insert([
                                'test_id'     => $test,
                                'user_id'     => $student,
                                'test_result' => $testScore,
                                'created_at'  => $faker->dateTimeBetween('-1 years',
                                    'now')
                            ]);

                        }

                    }
                }

            }

        }
    }
}
