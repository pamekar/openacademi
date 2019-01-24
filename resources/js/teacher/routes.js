import NProgress from './uiux/js/nprogress.js'
import VueRouter from 'vue-router'
import Course from './views/Course.vue';
import Courses from './views/Courses.vue';
import Lesson from './views/Lesson.vue';
import CategoryCourses from './views/CategoryCourses.vue';
import Index from './views/Index.vue';
import PurchasedCourses from './views/PurchasedCourses.vue';
import TagCourses from './views/TagCourses.vue';

const Error404 = {
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
        path:      '/courses',
        name:      'show-courses',
        component: Course
    },
    {
        path:      '/lessons',
        name:      'show-lessons',
        component: Course
    },
    {
        path:      '/tests',
        name:      'show-tests',
        component: Courses
    },
    {
        path:      '/questions',
        name:      'show-questions',
        component: Courses
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
        redirect: '/404'
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