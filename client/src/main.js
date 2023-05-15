import { createApp } from 'vue';
import App from './App.vue';
import router  from './router/router';
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import store from './store/store';
/* import PrimeVue from 'primevue/config';
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/lara-light-indigo/theme.css";    
import 'primeicons/primeicons.css';
import Dock from 'p      mdi,
rimevue/dock'; */
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  }
})



export const instance = axios.create({
  timeout: 50000, // Request timeout in milliseconds
});


// eslint-disable-next-line no-unused-vars
const app = createApp(App)

app.use(store);
router.store = store;
app.use(router);
app.use(VueSweetalert2);
app.use(vuetify);
/* app.use(PrimeVue);
// eslint-disable-next-line vue/multi-word-component-names
app.component('Dock', Dock); */


app.config.globalProperties.$http = instance;



app.mount('#app');

export default app;