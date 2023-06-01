/* eslint-disable no-debugger */
import HomePageComponent from "@/components/views/HomePageComponent.vue";
import LoginPageComponent from "@/components/views/LoginPageComponent.vue";
import SignupPageComponent from "@/components/views/SignupPageComponent.vue";
import PermissionsPageComponent from "@/components/views/PermissionsPageComponent.vue";
import ProfilePageComponent from "@/components/views/ProfilePageComponent.vue";



export const routes = [    
    {
        path: '/',
        redirect: '/home',
        name: 'index',
        children: [
            {
                name: 'home',
                hash: '#home',
                path: '/home',
                component: async () =>  HomePageComponent,
                meta: { transitionName: '', requiresAuth: true  },
            },
            {
                name: 'home',
                hash: '#home',
                path: '/home',
                component: async () =>  ProfilePageComponent,
                meta: { transitionName: '', requiresAuth: true  },
            },
        ]
    },
    {
        name: 'permissions',
        hash: '#permissions',
        path: '/admin/permissions',
        component: async () => PermissionsPageComponent,
        meta: { transitionName: '', requiresAuth: true , isAdmin: true },
    },
    {
        name: 'login',
        hash: '#login',
        path: '/login',
        component: async () => LoginPageComponent,
        meta: { transitionName: '' }
    },
    {
        name: 'signup',
        hash: '#signup',
        path: '/signup',
        component: async () => SignupPageComponent,
        meta: { transitionName: '' }
    }
]
