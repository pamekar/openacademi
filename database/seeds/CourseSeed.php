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

        /*foreach (range(1, 2132) as $index) {
            \App\User::create([
                'name'           => $faker->userName,
                'email'          => $faker->unique()->safeEmail,
                'password'       => Hash::make('tarzan'),
                'type'           => 'student',
                'categories'     => md5($faker->randomElement($categories)[1])
                    . ";" . md5($faker->randomElement($categories)[1]),
                'remember_token' => str_random(10),
            ]);
        }
        foreach (range(1, 53) as $index) {
            \App\User::create([
                'name'           => $faker->userName,
                'email'          => $faker->unique()->safeEmail,
                'password'       => Hash::make('tarzan'),
                'type'           => 'teacher',
                'categories'     => md5($faker->randomElement($categories)[1])
                    . ";" . md5($faker->randomElement($categories)[1]),
                'remember_token' => str_random(10),
            ]);
        }*/
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

                $newCourse = DB::table('courses')->insertGetId([
                    'title'        => $course,
                    'slug'         => strtolower(preg_replace('/\s+/', '-',
                        $course)),
                    'category'     => $newCategory,
                    'tags'         => implode(';', $randomTags),
                    'summary'      => $faker->realText(60),
                    'description'  => $faker->paragraphs(5, true),
                    'price'        => (mt_rand(100, 1000) / 100) * 100000,
                    'course_image' => "public/uploads/"
                        . $faker->randomElement($courseImages),
                    'published'    => $faker->randomElement($truthify),
                    'start_date'   => $faker->dateTimeBetween('-3 years',
                        'now'),
                    'created_at'   => $faker->dateTimeBetween('-3 years', 'now')
                ]);
                $students = \App\User::where('categories', 'like',
                    '%' . md5($category[1]) . '%')->where('type', 'student')
                    ->inRandomOrder()
                    ->limit(mt_rand(20, 300))->pluck('id');
                $teacher = \App\User::where('categories', 'like',
                    '%' . md5($category[1]) . '%')->where('type', 'teacher')
                    ->inRandomOrder()->value('id');

                // drg >> attach teacher to course
                DB::table('course_user')->insert([
                    'course_id' => $newCourse,
                    'user_id'   => $teacher
                ]);

                // drg >> attach students to course 
                foreach ($students as $student) {
                    DB::table('course_student')->insert([
                        'course_id' => $newCourse,
                        'user_id'   => $student,
                        'rating'    => mt_rand(3, 5)
                    ]);
                }

                // drg >> attach lessons to course
                $lessonCount = mt_rand(10, 20);
                for ($i = 0; $i < $lessonCount; $i++) {
                    $title = $faker->words(3, true);
                    $freeLesson = $i <= 1 ? true
                        : $faker->randomElement($falsify);
                    $newLesson = DB::table('lessons')->insertGetId([
                        'course_id'    => $newCourse,
                        'title'        => $title,
                        'slug'         => strtolower(preg_replace('/\s+/', '-',
                            $title)),
                        'lesson_image' => "public/uploads/"
                            . $faker->randomElement($lessonImages),
                        'short_text'   => $faker->realText(60),
                        'full_text'    => $faker->paragraphs(7, true),
                        'position'     => $i,
                        'free_lesson'  => $freeLesson,
                        'published'    => $faker->randomElement($truthify),
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
                                'published'   => $faker->randomElement($truthify)
                            ]);
                        $questionCount = mt_rand(5, 15);
                        for ($j = 0; $j < $questionCount; $j++) {
                            $question = DB::table('questions')->insertGetId([
                                'question'       => $faker->realText(),
                                'question_image' => "public/uploads/"
                                    . $faker->randomElement($testImages),
                                'score'          => $faker->randomElement([
                                    1,
                                    2,
                                    5
                                ]),
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
                        }

                    }
                }

            }

        }
    }
}
