/* eslint-disable no-debugger */
import HomePageComponent from "@/components/views/HomePageComponent.vue";
import LoginComponent from "@/components/views/LoginPageComponent.vue";
import SignupComponent from "@/components/views/SignupPageComponent.vue";
import PermissionsComponent from "@/components/views/PermissionsPageComponent.vue";
import * as Router from 'vue-router';
import { instance } from "../main";
//import Cookies from 'js-cookie';
import store from "@/store/store";


const routes = [    
    {
        path: '/',
        redirect: '/home',
        name: 'index',
        children: [
            {
                name: 'home',
                hash: '#home',
                path: '/home',
                component: HomePageComponent,
                meta: { transitionName: '', requiresAuth: true  },
            },
        ]
    },
    {
        path: '/admin',
        redirect: '/admin',
        name: 'ad_index',
        meta: { requiresAuth: true, needAdmin: true },
        children: [
            {
                name: 'permissions',
                hash: '#permissions',
                path: '/admin/permissions',
                component: async () => PermissionsComponent,
                meta: { transitionName: '', requiresAuth: true  },
            },
        ]
    },
    {
        name: 'login',
        hash: '#login',
        path: '/login',
        component: async () => LoginComponent,
        meta: { transitionName: '' }
    },
    {
        name: 'signup',
        hash: '#signup',
        path: '/signup',
        component: async () => SignupComponent,
        meta: { transitionName: '' }
    }
]

const router = Router.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: Router.createWebHistory(),
    routes,
    mode: "hash"
})


async function checkAdmnin(){
        let isValid
        try{ 
            isValid = await instance.get("/api/admin/permissions");
            // debugger
        }
        catch(e){
            console.error("ERR -> ", e)
            if(e.response?.status === 403) 
            isValid = false;
        }
        return !!isValid;

}

async function authMiddleware(to, from, next) {
    // Implement your authentication logic
    if (to.meta.requiresAuth ) {
        const isAuthenticated = await store.dispatch("auth/verifyToken");
        if (!isAuthenticated) return next({ name: 'login' });
    } 

    
    if(to.meta.needAdmin) {
        const isValid = await checkAdmnin(to);
        if (!isValid) return next({ name: 'login' })
    }

    return next();
}

router.beforeEach( authMiddleware );


export default router;
