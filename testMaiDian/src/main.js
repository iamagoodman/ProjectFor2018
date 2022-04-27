import { createApp } from 'vue';
import '@vant/touch-emulator';
import 'amfe-flexible/index.js';
import { Toast } from 'vant';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/index.less';

const app = createApp(App);

app.use(Toast);

app.use(router).use(store).mount('#app');
