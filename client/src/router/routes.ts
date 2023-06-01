/* eslint-disable no-debugger */
import HomePageComponent from "@/components/views/HomePageComponent.vue";
import LoginPageComponent from "@/components/views/LoginPageComponent.vue";
import SignupPageComponent from "@/components/views/SignupPageComponent.vue";
import PermissionsPageComponent from "@/components/views/PermissionsPageComponent.vue";
import ProfilePageComponent from "@/components/views/ProfilePageComponent.vue";
import { RouteRecordRaw } from "vue-router";


export const routes : RouteRecordRaw[] = [    
    {
        path: '/',
        redirect: '/home',
        name: 'index',
        children: [
            {
                name: 'home',
                path: '/home',
                component: async () =>  HomePageComponent,
                meta: { transitionName: '', requiresAuth: true  },
            },
            {
                name: 'profile',
                path: '/profile',
                component: async () =>  ProfilePageComponent,
                meta: { transitionName: '', requiresAuth: true  },
            },
			{
				name: 'login',
				path: '/login',
				component: async () => LoginPageComponent,
				meta: { transitionName: '' }
			},
			{
				name: 'signup',
				path: '/signup',
				component: async () => SignupPageComponent,
				meta: { transitionName: '' }
			}
        ]
    }, 
	{
        path: '/admin',
        redirect: '/admin/permissions',
        name: 'admin',
        children: [
			{
				name: 'permissions',
				path: '/admin/permissions',
				component: async () => PermissionsPageComponent,
				meta: { transitionName: '', requiresAuth: true , isAdmin: true },
			}
        ]
    }
]
