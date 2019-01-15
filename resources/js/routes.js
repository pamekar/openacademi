import Courses from './views/Courses.vue';
import Index from './views/Index.vue';
import PurchasedCourses from './views/PurchasedCourses.vue';

const routes = [
    { path: '/', component: Index },
    { path: '/courses/all', component: Courses },
    { path: '/courses/purchased', component: PurchasedCourses },
    { path: '/dashboard', component: Index },
    { path: '*', redirect: '/dashboard' },
];

export default routes;