import { createRouter, createWebHistory } from "vue-router";
import LoginPage from '../components/view/LoginPage.vue';
import SignPage from '../components/view/SignPage.vue';
import ConfirmPage from '../components/view/ConfirmPage.vue';
import HomePage from '../components/view/HomePage.vue';
import SideNav from '../components/SideNav.vue';
import SearchBar from '../components/SearchBar.vue';
import BlogView from '../components/view/BlogView.vue';
import PostAnalyticsPage from '../components/view/PostAnalyticsPage.vue';
import TechPage from '../components/view/TechPage.vue';
import DataScience from '../components/view/DataScience.vue';
import MachinePage from '../components/view/MachinePage.vue';
import PoliticsView from '../components/view/PoliticsView.vue';
import ReligionView from '../components/view/ReligionView.vue';
import RecentView from '../components/view/RecentView.vue';
import MainFeed from '../components/view/MainFeed.vue';
import PostView from '../components/view/PostView.vue';


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
        path: '/MainFeed',
        name: 'MainFeed',
        component: MainFeed
    }, {
        path: '/SearchBar',
        name: 'SearchBar',
        component: SearchBar
    }, {
        path: '/postAnalytics',
        name: 'postAnalytics',
        component: PostAnalyticsPage
    }, {
        path: '/techPage',
        name: 'techPage',
        component: TechPage
    }, {
        path: '/DataScience',
        name: 'DataScience',
        component: DataScience
    }, {
        path: '/MachinePage',
        name: 'MachinePage',
        component: MachinePage
    }, {
        path: '/PoliticsView',
        name: 'PoliticsView',
        component: PoliticsView,
    }
    , {
        path: '/ReligionView',
        name: 'ReligionView',
        component: ReligionView,
    }
    , {
        path: '/RecentView',
        name: 'RecentView',
        component: RecentView,
    },
    {
        path: '/BlogView',
        name: 'BlogView',
        component: BlogView,
    },
    {
        path: '/',
        name: 'PostView',
        component: PostView,
    }
]
const router = createRouter({
    history:createWebHistory(),
    routes
})
export default router