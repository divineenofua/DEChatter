import './style.css'

import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiLinkedin, BiPeopleFill,  CoChartLine, CoNewspaper, FcGoogle} from 'oh-vue-icons/icons'
import App from './App.vue'
import router from './router';
import {createPinia} from 'pinia'
 addIcons(BiLinkedin, FcGoogle, CoChartLine, BiPeopleFill, CoNewspaper);

 const pinia = createPinia();
 const app =createApp(App);
 app.use(router);
 app.use(pinia);
 app.use(Toast);
 app.component('v-icon', OhVueIcon);
 app.mount('#app') ;


