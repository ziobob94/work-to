import { createApp } from 'vue';
import App from './App.vue';
import router  from './router';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// eslint-disable-next-line no-unused-vars
const app = createApp(App).use(router)

export const instance = axios.create({
    timeout: 50000, // Request timeout in milliseconds
  });


app.config.globalProperties.$http = instance;
app.use(VueSweetalert2);


app.mount('#app');