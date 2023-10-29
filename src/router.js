import { createRouter, createWebHistory } from "vue-router";
import Login from './pages/Login.vue';
import Signup from './pages/Signup.vue';
import QuestionsPage from './pages/QuestionsPage.vue';
import OnboardingPage from './pages/OnboardingPage.vue';
import DoctorsPage from './pages/DoctorsPage.vue';
import QuestionsEditPage from './pages/QuestionsEditPage.vue';
import DatePage from './pages/DatePage.vue';
import DateAdminPage from './pages/DateAdminPage.vue';
import { verifyJWT } from "@/services/jwt";

const routes = [
    {path: '/login', component: Login, meta: { auth: false}},
    {path: '/signup', component: Signup, meta: { auth: false}},
    {path: '/questions', component: QuestionsPage, meta: { auth: true, admin: false}},
    {path: '/onboard', component: OnboardingPage, meta: { auth: true, admin: false}},
    {path: '/dates', component: DatePage, meta: { auth: true, admin: false}},
    {path: '/doctors', component: DoctorsPage, meta: { auth: true, admin: true}},
    {path: '/questionsEdit', component: QuestionsEditPage, meta: { auth: true, admin: true}},
    {path: '/datesEdit', component: DateAdminPage, meta: { auth: true, admin: true}},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    let user;
    if(token){
        user = verifyJWT(token);
    }

    if( to.meta.auth && !token){
        next('/login');
    } else if(!to.meta.auth && token || to.meta.admin && user?.role === 'patient'){
        next('/questions');
    } else if(!to.meta.auth && token || !to.meta.admin && user?.role === 'admin'){
        next('/doctors');
    }else {
        next();
    }
});

export default router