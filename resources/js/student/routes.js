import NProgress from './uiux/js/nprogress.js'
import VueRouter from 'vue-router'
import Course from './views/Course.vue';
import Courses from './views/Courses.vue';
import Lesson from './views/Lesson.vue';
import CategoryCourses from './views/CategoryCourses.vue';
import Index from './views/Index.vue';
import PurchasedCourses from './views/PurchasedCourses.vue';
import TagCourses from './views/TagCourses.vue';
import Quiz from './views/Quiz.vue';
import Quizes from './views/Quizes.vue';
import QuizInstructions from './views/QuizInstructions.vue';
import QuizResult from './views/QuizResult.vue';

const Error404 = {
    template: "",
    beforeRouteEnter(to, from, next) {
        window.location('/user/error/404');
    },
};
const routes = [
    {
        path:      '/home',
        name:      'home',
        component: {
            beforeRouteEnter(to, from, next) {
                window.location = '/home';
            }
        }
    },
    {
        path:      '/user/',
        name:      'dashboard',
        component: Index
    },
    {
        path:      '/user/course/:slug',
        name:      'course',
        component: Course
    },
    {
        path:      '/user/courses/all',
        name:      'all-courses',
        component: Courses
    },
    {
        path:      '/user/courses/categories/:slug',
        name:      'category-courses',
        component: CategoryCourses,
        props:     true
    },
    {
        path:      '/user/lesson/:id/:slug',
        name:      'lesson',
        component: Lesson
    },
    {
        path:      '/user/courses/purchased',
        name:      'purchased-courses',
        component: PurchasedCourses
    },
    {
        path:      '/user/courses/tags/:tag',
        name:      'tag-courses',
        component: TagCourses,
        props:     true
    },
    {
        path:      '/user/quiz/:id',
        name:      'quiz',
        component: Quiz,
    },
    {
        path:      '/user/quizes',
        name:      'quizes',
        component: Quizes,
    },
    {
        path:      '/user/quiz/result/:id',
        name:      'quiz-result',
        component: QuizResult,
    },
    {
        path:      '/user/quiz/:id/:slug',
        name:      'quiz-instructions',
        component: QuizInstructions,
    },
    {
        path:      '/user/dashboard',
        component: Index
    },
    {
        path:      '/user/404',
        name:      'error',
        component: Error404
    },
    {
        path:     '*',
        redirect: '/user/error404'
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

// drg >> start progress bar before route request
router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start()
    }
    next()
});

// drg >> end progress bar after route response
router.afterEach((to, from) => {
    NProgress.done()
});

export default router;