import { createRouter, createWebHistory } from "vue-router";
import LoginPage from '../components/view/LoginPage.vue';
import SignPage from '../components/view/SignPage.vue';
import ConfirmPage from '../components/view/ConfirmPage.vue';
import HomePage from '../components/view/HomePage.vue';
import SideNav from '../components/SideNav.vue';
import SearchBar from '../components/SearchBar.vue';
import FeedPage from '../components/view/FeedPage.vue';
import PostAnalyticsPage from '../components/view/PostAnalyticsPage.vue';


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
        path: '/HomePage',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/SideNav',
        name: 'SideNav',
        component: SideNav
    },
    {
        path: '/FeedPage',
        name: 'FeedPage',
        component: FeedPage
    }, {
        path: '/SearchBar',
        name: 'SearchBar',
        component: SearchBar
    }, {
        path: '/',
        name: 'postAnalytics',
        component: PostAnalyticsPage
    }
]
const router = createRouter({
    history:createWebHistory(),
    routes
})
export default router