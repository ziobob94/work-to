/* eslint-disable no-debugger */
import { Store, createStore } from 'vuex';
/* import { instance } from '@/main';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken'; */
import userModule from './user';
import authModule from './auth';
import permissionsModule from './permissions';
import { RootState } from '@/mylib';


const store : Store<RootState> = createStore(
	{
		modules:{
			auth: authModule,
			user: userModule,
			permissionsAd: permissionsModule
		}
	}
	
	);
	
	export default store;