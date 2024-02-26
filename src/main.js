import './style.css'

import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiBell, BiBookmark,   BiCrop,   BiEnvelope,   BiGraphUpArrow,   BiLinkedin, BiPeople, BiPeopleFill,  BiPerson,  CoChartLine, CoNewspaper, FaBars, FaChartBar,   FaLongArrowAltRight, FaTimes,  FcGoogle, PxMenu} from 'oh-vue-icons/icons'
import App from './App.vue'
import router from './router';
import {createPinia} from 'pinia'
 addIcons(BiLinkedin,BiBell, FcGoogle,  BiPerson, CoChartLine, BiPeopleFill, CoNewspaper, FaTimes, PxMenu, BiBookmark, BiPeople, BiEnvelope , BiGraphUpArrow ,FaLongArrowAltRight, FaChartBar, BiCrop );

 const pinia = createPinia();
 const app =createApp(App);
 app.use(router);
 app.use(pinia);
 app.use(Toast);
 app.component('v-icon', OhVueIcon);
 app.mount('#app') ;


