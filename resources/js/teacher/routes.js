import NProgress from './uiux/js/nprogress.js'
import VueRouter from 'vue-router'
import Index from './views/Index.vue';
import AddCourse from './views/AddCourse.vue';
import AddLesson from './views/AddLesson.vue';
import AddQuiz from './views/AddQuiz.vue';
import AddQuestion from './views/AddQuestion.vue';
import EditCourse from './views/EditCourse.vue';
import EditLesson from './views/EditLesson.vue';
import EditQuiz from './views/EditQuiz.vue';
import EditQuestion from './views/EditQuestion.vue';
import Course from './views/Course.vue';
import Courses from './views/Courses.vue';
import Lesson from './views/Lesson.vue';
import Lessons from './views/Lessons.vue';
import Options from './views/Options.vue';
import Question from './views/Question.vue';
import Questions from './views/Questions.vue';
import Quiz from './views/Quiz.vue';
import Quizes from './views/Quizes.vue';
import Account from './views/Account.vue';


const Error404 = {
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
        path:      '/user/course/add',
        name:      'add-course',
        component: AddCourse
    },
    {
        path:      '/user/course/:id',
        name:      'view-course',
        component: Course
    },
    {
        path:      '/user/courses',
        name:      'show-courses',
        component: Courses
    },
    {
        path:      '/user/course/:id/edit',
        name:      'edit-course',
        component: EditCourse
    },
    {
        path:      '/user/lesson/add/:id?',
        name:      'add-lesson',
        component: AddLesson
    },
    {
        path:      '/user/lesson/:id',
        name:      'view-lesson',
        component: Lesson
    },
    {
        path:      '/user/lessons',
        name:      'show-lessons',
        component: Lessons
    },
    {
        path:      '/user/lesson/:id/edit',
        name:      'edit-lesson',
        component: EditLesson
    },
    {
        path:      '/user/quiz/add',
        name:      'add-quiz',
        component: AddQuiz
    },
    {
        path:      '/user/quiz/:id',
        name:      'view-quiz',
        component: Quiz
    },
    {
        path:      '/user/quizes',
        name:      'show-quizes',
        component: Quizes
    },
    {
        path:      '/user/quiz/:id/edit',
        name:      'edit-quiz',
        component: EditQuiz
    },
    {
        path:      '/user/question/:id',
        name:      'view-question',
        component: Question
    },
    {
        path:      '/user/question/add',
        name:      'add-question',
        component: AddQuestion
    },
    {
        path:      '/user/questions',
        name:      'show-questions',
        component: Questions
    },
    {
        path:      'account/',
        name:      'account',
        component: Account
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
        path: '/user/logout',
        name: 'logout',
        component: {
            beforeRouteEnter(to, from, next) {
                document.getElementById('logout-form').submit();
            }
        }
    },
    {
        path:     '*',
        redirect: '/user/404'
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});

// drg >> start progress bar before route request
router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start();
    }
    next()
});

// drg >> end progress bar after route response
router.afterEach((to, from) => {
    NProgress.done();
});

export default router;