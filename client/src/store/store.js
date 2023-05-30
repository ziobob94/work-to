/* eslint-disable no-debugger */
import { createStore } from 'vuex';
/* import { instance } from '@/main';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken'; */
import userModule from './user';
import authModule from './auth';


const store = createStore(
  {
    modules:{
      auth: authModule,
      user: userModule
    }
  }

);

export default store;