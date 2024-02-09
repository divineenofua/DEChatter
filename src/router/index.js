import { createRouter, createWebHistory } from "vue-router";
import LoginPage from '../components/LoginPage.vue';
import SignPage from '../components/SignPage.vue';

const routes = [
    {
        path: '/',
        name: 'LoginPage',
        component:LoginPage
    },
    {
        path: '/SignPage',
        name: 'SignPage',
        component: SignPage
    }
]
const router = createRouter({
    history:createWebHistory(),
    routes
})
export default router