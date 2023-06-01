/* eslint-disable no-debugger */
import * as Router from 'vue-router';
import { instance } from "../main";
//import Cookies from 'js-cookie';
import store from "@/store/store";
import { routes } from './routes';


const router : any = Router.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: Router.createWebHistory(),
    routes,
})


async function checkAdmnin(){
    let isValid
    try{ 
        isValid = await instance.get("/api/admin");
    }
    catch(e: any){
        console.error("ERR -> ", e)
        if(e.response?.status === 403) 
        isValid = false;
    }
    return !!isValid;
    
}

async function authMiddleware(to: any, from: any, next: any) {
    // Implement your authentication logic
    if (to.meta.requiresAuth ) {
        const isAuthenticated = await store.dispatch("auth/verifyToken");
        if (!isAuthenticated) return next({ name: 'login' });
    } 
    
    
    if(to.meta.isAdmin) {
        const isValid = await checkAdmnin();
        if (!isValid) return next({ name: 'login' })
    }
    
    return next();
}

router.beforeEach( authMiddleware );


export default router;
