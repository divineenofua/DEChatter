import { createRouter, createWebHistory } from "vue-router";
import LoginPage from '../components/LoginPage.vue';
// import ChatPage from '../components/ChatPage.vue';

const routes = [
    {
        path: '/',
        name: 'LoginPage',
        component:LoginPage
    },
    // {
    //     path: '/chatpage',
    //     name: 'ChatPage',
    //     component: ChatPage
    // }
]
const router = createRouter({
    history:createWebHistory(),
    routes
})
export default router