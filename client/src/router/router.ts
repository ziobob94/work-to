/* eslint-disable no-debugger */
import * as Router from 'vue-router';
import { instance } from "../main";
//import Cookies from 'js-cookie';
import store from "@/store/store";
import { routes } from './routes';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { parseJwt } from '@/lib/utils';


const router : any = Router.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: Router.createWebHistory(),
    //ts-ignore
	routes,
})


async function checkAdmnin(){
    let isValid: any;
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

	//debugger;

	let isAuthenticated : boolean = false; 
    // Implement your authentication logic
    if (to.meta.requiresAuth ) {
        isAuthenticated = await store.dispatch("auth/verifyToken");
        if (!isAuthenticated) {
			Swal.fire({
				title: 'Ops..',
				text: 'Page reserved for logged user, please login',
				icon: 'warning',
				confirmButtonText: "Login"
			})
			return next({ name: 'login' });
		}
    } 
    
	const token = Cookies.get("auth");
	
	const parsed = await store.dispatch("main/extractJwtData", "roleID");

    if(to.meta.isAdmin ) {
		const isValid = (parsed === 'admin');
		// debugger;
        if (!isValid) {
			Swal.fire({
				title: 'Ops..',
				text: 'Reserved admin area',
				icon: 'warning',
				confirmButtonText: "Login"
			})
			return next({ name: 'login' })
		}
    }
    
    return next();
}

router.beforeEach( authMiddleware );

export default router;
