import { createRouter, createWebHistory } from "vue-router";
import LoginPage from '../components/LoginPage.vue';
import SignPage from '../components/SignPage.vue';
import ConfirmPage from '../components/ConfirmPage.vue';
import HomePage from '../components/HomePage.vue';

const routes = [
    {
        path: '/LoginPage',
        name: 'LoginPage',
        component:LoginPage
    },
    {
        path: '/SignPage',
        name: 'SignPage',
        component: SignPage
    },
    {
        path: '/ConfirmPage',
        name: 'ConfirmPage',
        component: ConfirmPage,
        props:true
    } ,
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    }
]
const router = createRouter({
    history:createWebHistory(),
    routes
})
export default router