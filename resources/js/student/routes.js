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

const Error404 = {
    template: "",
    beforeRouteEnter(to, from, next) {
        window.location('/error/404');
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
        path:      '/',
        name:      'dashboard',
        component: Index
    },
    {
        path:      '/course/:slug',
        name:      'course',
        component: Course
    },
    {
        path:      '/courses/all',
        name:      'all-courses',
        component: Courses
    },
    {
        path:      '/courses/categories/:slug',
        name:      'category-courses',
        component: CategoryCourses,
        props:     true
    },
    {
        path:      '/lesson/:id/:slug',
        name:      'lesson',
        component: Lesson
    },
    {
        path:      '/courses/purchased',
        name:      'purchased-courses',
        component: PurchasedCourses
    },
    {
        path:      '/courses/tags/:tag',
        name:      'tag-courses',
        component: TagCourses,
        props:     true
    },
    {
        path:      '/quiz/:id/:slug',
        name:      'quiz',
        component: Quiz,
        props:     true
    },
    {
        path:      '/dashboard',
        component: Index
    },
    {
        path:      '/404',
        name:      'error',
        component: Error404
    },
    {
        path:     '*',
        redirect: '/error404'
    },
];

const router = new VueRouter({
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