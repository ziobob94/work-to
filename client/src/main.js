import { createApp } from 'vue';
import App from './App.vue';
import router  from './router/router';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import store from './store/store';


export const instance = axios.create({
  timeout: 50000, // Request timeout in milliseconds
});
// eslint-disable-next-line no-unused-vars
const app = createApp(App)

app.use(store);
router.store = store;
app.use(router);
app.use(VueSweetalert2);

app.config.globalProperties.$http = instance;



app.mount('#app');

export default app;