import { createRouter, createWebHistory } from "vue-router";
import LoginPage from '../components/view/LoginPage.vue';
import SignPage from '../components/view/SignPage.vue';
import ConfirmPage from '../components/view/ConfirmPage.vue';
import HomePage from '../components/view/HomePage.vue';
import SideNav from '../components/SideNav.vue';

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
    },
    {
        path: '/SideNav',
        name: 'SideNav',
        component: SideNav
    }
]
const router = createRouter({
    history:createWebHistory(),
    routes
})
export default router