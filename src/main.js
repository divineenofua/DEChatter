import './style.css'

import { createApp } from 'vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { BiLinkedin, FcGoogle} from 'oh-vue-icons/icons'
import App from './App.vue'
// import router from './router';
 addIcons(BiLinkedin, FcGoogle);
createApp(App).use( Toast).component('v-icon', OhVueIcon).mount('#app') ;


