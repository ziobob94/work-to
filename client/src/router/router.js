/* eslint-disable no-debugger */
import HomePageComponent from "@/components/views/HomePageComponent.vue";
import LoginComponent from "@/components/views/LoginPageComponent.vue";
import SignupComponent from "@/components/views/SignupPageComponent.vue";
import PermissionsComponent from "@/components/views/PermissionsPageComponent.vue";
import * as Router from 'vue-router';
import { instance } from "../main";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
    
    const verifyToken = async () => {
        let isValid = false
        try {
            const cookieToken = Cookies.get("auth");
            instance.defaults.headers.common.Authorization = 'Bearer ' + cookieToken;
            isValid = await instance.get("/api/validate-token");
        }
        catch(err){
            isValid = false;
        }
        return isValid;
    }

    const checkAuthentHandler = async (to) => {
        const isAuthenticated = await verifyToken();
        if ( !isAuthenticated && to.name !== 'Login' ) {
                // redirect the user to the login page
                await Swal.fire({    
                    text: 'Do login or signup',
                    icon: 'warning',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'OK',
                    }
                );
    
                router.push({name: 'login'})
                return false
        }
        return true;
        
    }


    const adminRoutes = [
        {
            name: 'permissions',
            hash: '#permissions',
            path: '/admin/permissions',
            component: PermissionsComponent,
            meta: { transitionName: '' }
        }
    ];

    const openRoutes = [
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
                    meta: { transitionName: '' },
                },
                
            ]
        },
        {
            name: 'login',
            hash: '#login',
            path: '/login',
            component: LoginComponent,
            meta: { transitionName: '' }
        },
        {
            name: 'signup',
            hash: '#signup',
            path: '/signup',
            component: SignupComponent,
            meta: { transitionName: '' }
        }
    ];

    const protectedRoutes = [
        {
            name: 'profile',
            hash: '#profile',
            path: '/profile/:id',
            component: ProfileComponent,
            meta: { transitionName: '' }
        }
    ];


    
    protectedRoutes.forEach((element) => {
                    // eslint-disable-next-line no-unused-vars
        element.beforeEnter = async (to, from, next) => {

            // console.log("CHEKC AUTH to", to);

            // console.log("CHEKC AUTH from", from);

            //debugger;
            
            let isAuth = false;

            try{
                isAuth = await checkAuthentHandler(to, next);
            }
            catch(err){
                // console.log("CHEKC AUTH from", isAuth);
                isAuth = false;

            }


            //store.mutations

            // console.log("CHECK ROUTER", router.store);

            router.store.commit("setAuthenticated", isAuth);


            if(isAuth)  next();
            else {
               // window.alert("PLEASE LOG IN TO ACCESS")
                //debugger
                
                next({name: "login"});
            }


        }
    });
    
    
    export const router = Router.createRouter({
        // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
        history: Router.createWebHistory(),
        routes: [openRoutes, protectedRoutes, adminRoutes],
        mode: "hash"
    })
    
 
    
    export default router;
