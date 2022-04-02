import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/main.css';
import { auth } from '@/base';
import { onAuthStateChanged } from 'firebase/auth';

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(store).use(router);
    app.mount('#app');
  }
});
