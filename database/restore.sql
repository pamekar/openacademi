--
-- Table structure for table `authorizations`
--

CREATE TABLE `authorizations` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `authorizations`
--

INSERT INTO `authorizations` (`id`, `title`, `created_at`, `updated_at`) VALUES
  (1, 'user_management_access', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (2, 'user_management_create', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (3, 'user_management_edit', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (4, 'user_management_view', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (5, 'user_management_delete', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (6, 'authorization_access', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (7, 'authorization_create', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (8, 'authorization_edit', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (9, 'authorization_view', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (10, 'authorization_delete', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (11, 'position_access', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (12, 'position_create', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (13, 'position_edit', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (14, 'position_view', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (15, 'position_delete', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (16, 'user_access', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (17, 'user_create', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (18, 'user_edit', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (19, 'user_view', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (20, 'user_delete', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (21, 'course_access', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (22, 'course_create', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (23, 'course_edit', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (24, 'course_view', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (25, 'course_delete', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (26, 'lesson_access', '2018-06-14 05:06:45', '2018-06-14 05:06:45'),
  (27, 'lesson_create', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (28, 'lesson_edit', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (29, 'lesson_view', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (30, 'lesson_delete', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (31, 'question_access', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (32, 'question_create', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (33, 'question_edit', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (34, 'question_view', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (35, 'question_delete', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (36, 'questions_option_access', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (37, 'questions_option_create', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (38, 'questions_option_edit', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (39, 'questions_option_view', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (40, 'questions_option_delete', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (41, 'test_access', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (42, 'test_create', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (43, 'test_edit', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (44, 'test_view', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (45, 'test_delete', '2018-06-14 05:06:46', '2018-06-14 05:06:46');

-- --------------------------------------------------------

--
-- Table structure for table `authorization_position`
--

CREATE TABLE `authorization_position` (
  `authorization_id` int(10) UNSIGNED DEFAULT NULL,
  `position_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `authorization_position`
--

INSERT INTO `authorization_position` (`authorization_id`, `position_id`) VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 1),
  (5, 1),
  (6, 1),
  (7, 1),
  (8, 1),
  (9, 1),
  (10, 1),
  (11, 1),
  (12, 1),
  (13, 1),
  (14, 1),
  (15, 1),
  (16, 1),
  (17, 1),
  (18, 1),
  (19, 1),
  (20, 1),
  (21, 1),
  (22, 1),
  (23, 1),
  (24, 1),
  (25, 1),
  (26, 1),
  (27, 1),
  (28, 1),
  (29, 1),
  (30, 1),
  (31, 1),
  (32, 1),
  (33, 1),
  (34, 1),
  (35, 1),
  (36, 1),
  (37, 1),
  (38, 1),
  (39, 1),
  (40, 1),
  (41, 1),
  (42, 1),
  (43, 1),
  (44, 1),
  (45, 1),
  (1, 2),
  (21, 2),
  (22, 2),
  (23, 2),
  (24, 2),
  (26, 2),
  (27, 2),
  (28, 2),
  (29, 2),
  (31, 2),
  (32, 2),
  (33, 2),
  (34, 2),
  (36, 2),
  (37, 2),
  (38, 2),
  (39, 2),
  (40, 2),
  (41, 2),
  (42, 2),
  (43, 2),
  (44, 2),
  (45, 2),
  (1, 3),
  (21, 3),
  (24, 3),
  (26, 3),
  (29, 3),
  (31, 3),
  (34, 3),
  (36, 3),
  (37, 3),
  (38, 3),
  (39, 3),
  (40, 3),
  (41, 3),
  (44, 3);

--
-- Table structure for table `positions`
--

CREATE TABLE `positions` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `positions`
--

INSERT INTO `positions` (`id`, `title`, `created_at`, `updated_at`) VALUES
  (1, 'Administrator (can create other users)', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (2, 'Teacher', '2018-06-14 05:06:46', '2018-06-14 05:06:46'),
  (3, 'Student', '2018-06-14 05:06:46', '2018-06-14 05:06:46');

-- --------------------------------------------------------

--
-- Table structure for table `position_user`
--

CREATE TABLE `position_user` (
  `position_id` int(10) UNSIGNED DEFAULT NULL,
  `user_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `position_user`
--

INSERT INTO `position_user` (`position_id`, `user_id`) VALUES
  (1, 1),
  (3, 2),
  (3, 3);

-- --------------------------------------------------------
