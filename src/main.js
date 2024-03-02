import './style.css'

import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiBell, BiBook, BiBookmark,   BiCrop,   BiEnvelope,   BiFileBarGraph,   BiGraphUpArrow,   BiLinkedin, BiPencil, BiPeople, BiPeopleFill,  BiPerson,  CoChartLine, CoCommentBubble, CoNewspaper,  FaChartBar,   FaLongArrowAltRight, FaRegularHeart, FaSearch, FaTimes,  FcGoogle, FcLike, PxMenu} from 'oh-vue-icons/icons'
import App from './App.vue'
import router from './router';
import {createPinia} from 'pinia'
 addIcons(BiLinkedin,BiBell,FcLike,BiFileBarGraph, CoCommentBubble, BiBook, FaRegularHeart, BiPencil , FcGoogle,  BiPerson, CoChartLine, BiPeopleFill, CoNewspaper, FaTimes, PxMenu, BiBookmark, BiPeople, BiEnvelope , BiGraphUpArrow ,FaLongArrowAltRight, FaChartBar, BiCrop, FaSearch );

 const pinia = createPinia();
 const app =createApp(App);
 app.use(router);
 app.use(pinia);
 app.use(Toast);
 app.component('v-icon', OhVueIcon);
 app.mount('#app') ;


